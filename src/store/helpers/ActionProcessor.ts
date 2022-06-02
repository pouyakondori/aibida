import { asyncForEach } from 'lib/helpers/core/asyncForEach'
import { ActionNames, ErrorMessageActions } from 'misc/constants'
import { signalError } from 'store/helpers/signalError'
import { ActionContext } from 'vuex'

import type { MutationType } from 'types/MutationType'

interface ActionStatus {
    count: number
    show: boolean
}

export interface SharedActionConfig {
    /** Object type used in results reporting, like `Item` or `Attachment` */
    objectType: string
    /** Name of the Vuex Mutation to be called to report results */
    statusMutation: string
    /** Name of the Vuex Action to be called after main requests are completed. Fetches updated data. */
    fetchAction: string | null
    /** Year id to reload data for after all manipulations */
    yearId?: number
}

/** Action-level config, specific for each request */
export interface ActionConfig<T> extends SharedActionConfig {
    /** What action to perform, like fetch, update or delete. */
    actionType: ActionNames
    /** Backend endpoint to use for making requests. */
    endpoint: Endpoint<T>
    /** Names of Vuex mutations to run at different stages of Actions. Use for non-refactored modules with loading status logic */
    mutations?: MutationType
    /** Maximum length of the response */
    emptyResponseLength?: number
    /** Default timeout duration */
    defaultTimeoutDuration?: number
    /** Name of the Vuex mutation to run after backend request is successfully executed. Use for refactored modules without loading status logic */
    mutationOnSuccess?: string
}

type Endpoint<T> = (dto: T, emptyResponse?: boolean) => Promise<unknown>

/**
 * Constructs and executes Vuex actions for batch inputs.
 * Actions can be executed consequently or in parallel.
 * Reports are generated for each several requests.
 * Use class methods directly or through interface functions in `action-creator.ts`.
 */
export class ActionProcessor<T> {
    /** What action to perform, like fetch, update or delete. */
    private readonly actionType: ActionNames
    /** Vuex context with actions, mutations, getters etc. */
    private context: ActionContext<unknown, unknown>
    /** Delay in milliseconds until operation status info can be shown after operation has started. */
    private readonly defaultTimeoutDuration: number
    /** Payload input objects which server as inputs for backend requests. */
    private readonly dtos: T[]
    /** Do we expect data response from backend requests. */
    private readonly emptyResponse: boolean
    /** Number of DTOs or results serving as threshold after which reporting logic is changed. */
    private readonly emptyResponseLength: number
    /** Backend endpoint to use for making requests. */
    private readonly endpoint: Endpoint<T>
    /** Name of the Vuex Action to be called after main requests are completed. Fetches updated data. */
    private readonly fetchAction: string | null
    /** Vuex Mutations names associated with current Vuex Action */
    private readonly mutations?: MutationType
    /** Name of the Vuex mutation to run after backend request is successfully executed. Use for refactored modules without loading status logic */
    private readonly mutationOnSuccess?: string
    /** Object type used in results reporting, like `Item` or `Attachment` */
    private readonly objectType: string
    /** Name of the Vuex Mutation to be called to report results */
    private readonly statusMutation: string
    /** Successful results of backend requests to be used as final result */
    private readonly successfulResponses: unknown[]
    /** Reporting timeout handler */
    private readonly timeout: number
    /** Year id to reload data for after all manipulations */
    private readonly yearId: number

    /** Action description, like `Creating` or `Deleting` */
    private actionStatusText: string
    /** Action description for error message */
    private errorMsgAction: ErrorMessageActions
    /** Batch DTOs processing statistics */
    private status: ActionStatus

    constructor(
        context: ActionContext<unknown, unknown>,
        payload: unknown,
        config: ActionConfig<T>
    ) {
        this.context = context
        this.dtos = Array.isArray(payload) ? payload : [payload]

        this.actionType = config.actionType
        this.endpoint = config.endpoint
        this.mutations = config.mutations
        this.mutationOnSuccess = config.mutationOnSuccess
        this.objectType = config.objectType

        this.emptyResponseLength = config.emptyResponseLength || 20
        this.defaultTimeoutDuration = config.defaultTimeoutDuration || 1000
        this.yearId =
            config.yearId || this.context.getters.selectedYear?.Id || 0

        this.statusMutation = config.statusMutation
        this.fetchAction = config.fetchAction

        this.actionStatusText = ''
        this.errorMsgAction = ErrorMessageActions.Upsert
        this.status = {
            count: 0,
            show: false,
        }

        this.emptyResponse = this.dtos.length > this.emptyResponseLength
        this.timeout = window.setTimeout(() => {
            this.status.show = true
        }, this.defaultTimeoutDuration)

        this.successfulResponses = []

        this.setTexts()
    }

    /**
     * Sets texts for mutations when initializing the data for making requests
     */
    private setTexts(): void {
        switch (this.actionType) {
            case ActionNames.Create:
                this.actionStatusText = 'Creating'
                this.errorMsgAction = ErrorMessageActions.Upsert
                break
            case ActionNames.Update:
                this.actionStatusText = 'Updating'
                this.errorMsgAction = ErrorMessageActions.Upsert
                break
            case ActionNames.Delete:
                this.actionStatusText = 'Deleting'
                this.errorMsgAction = ErrorMessageActions.Delete
                break
        }
    }

    /**
     * Signals results after all requests have been executed, cleans things up
     */
    private async processResult(): Promise<void> {
        const successMutation =
            this.mutationOnSuccess || this.mutations?.Success || null

        if (successMutation && (!this.emptyResponse || !this.fetchAction)) {
            this.successfulResponses.forEach(success => {
                this.context.commit(successMutation, success)
            })
        }

        clearTimeout(this.timeout)

        if (this.statusMutation) {
            this.context.commit(this.statusMutation, null)
        }

        if (this.emptyResponse && this.fetchAction) {
            await this.context.dispatch(this.fetchAction, this.yearId)
        }
    }

    /**
     * Constructs a request for the parallel mode of processing multiple DTOs
     * Does not execute the request, delegates it to the caller
     *
     * @param dto
     */
    private async constructConcurrentRequest(dto: T): Promise<unknown> {
        return this.endpoint(dto, this.emptyResponse)
            .then(resp => {
                this.successfulResponses.push(resp || dto)
                ++this.status.count

                if (
                    this.statusMutation &&
                    this.status.count < this.emptyResponseLength &&
                    this.status.show
                ) {
                    this.context.commit(
                        this.statusMutation,
                        this.getCommitText()
                    )
                }
            })
            .catch(error => {
                signalError(
                    this.context.dispatch,
                    error,
                    this.objectType,
                    this.errorMsgAction
                )

                if (this.mutations?.Error) {
                    this.context.commit(this.mutations.Error, error)
                }
            })
    }

    /**
     * Constructs and executes request for the sequential mode of processing multiple DTOs
     *
     * @param dto DTO to process
     */
    private async makeSequentialRequest(dto: T): Promise<void> {
        try {
            // Wait for each result
            const data = await this.endpoint(dto, this.emptyResponse)
            this.successfulResponses.push(data || dto)
            ++this.status.count

            // Report result when a fixed number of results is acquired
            const updateStatus =
                this.status.count < this.emptyResponseLength ||
                this.status.count % this.emptyResponseLength == 0 ||
                this.status.count == this.dtos.length

            if (this.statusMutation && updateStatus && this.status.show) {
                this.context.commit(this.statusMutation, this.getCommitText())
            }
        } catch (error: unknown) {
            await signalError(
                this.context.dispatch,
                error,
                this.objectType,
                this.errorMsgAction
            )

            if (this.mutations?.Error) {
                this.context.commit(this.mutations.Error, error)
            }
        }
    }

    /**
     * Returns text for batch progressing report
     */
    private getCommitText(): string {
        return `${this.actionStatusText} ${this.status.count}/${this.dtos.length}`
    }

    /**
     * Cooks the end result: returns either a single element or an array of elements
     */
    private getSingleOrManyResponses(): unknown {
        return this.successfulResponses.length === 1
            ? this.successfulResponses[0]
            : this.successfulResponses
    }

    /**
     * Creates and executes Vuex Actions for a number of input DTOs.
     * Actions are asynchronous and are executed in parallel.
     * Contains batch grouping logic for signalling results of multiple requests
     * Used for updating or deleting when execution order does not matter
     */
    async parallel(): Promise<unknown> {
        const promises = []
        if (this.mutations?.Pending) {
            this.context.commit(this.mutations.Pending)
        }

        // Update or delete entries in no particular order, and
        // update progress status for batches of 20 unless the current
        // batch has fewer entries than 20
        for (let index = 0; index < this.dtos.length; index++) {
            // Gather no more than fixed maximum number of promises
            promises.push(this.constructConcurrentRequest(this.dtos[index]))

            // If a batch of promises is gathered, run it and wait for result
            // before gathering more promises
            if (
                promises.length == this.emptyResponseLength ||
                index + 1 == this.dtos.length
            ) {
                await Promise.all(promises)
                if (this.statusMutation && this.status.show) {
                    this.context.commit(
                        this.statusMutation,
                        this.getCommitText()
                    )
                }

                // Clear up completed promises to start gathering new ones
                promises.length = 0
            }
        }

        await this.processResult()
        return this.getSingleOrManyResponses()
    }

    /**
     * Creates and executes Vuex Actions for a number of input DTOs.
     * Actions are asynchronous and are executed in a synchronous manner one after another.
     * Contains batch grouping logic for signalling results of multiple requests.
     * Used for creating rows in order, updating and deleting rows one at a time.
     */
    async sequential(): Promise<unknown> {
        if (this.mutations?.Pending) {
            this.context.commit(this.mutations.Pending)
        }

        // Process entries in order, waiting for each one, and show update status in batches of 20
        // unless the current batch has fewer than 20 entries
        await asyncForEach(this.dtos, async dto => {
            if (this.mutations?.Pending) {
                this.context.commit(this.mutations.Pending)
            }

            await this.makeSequentialRequest(dto)
        })

        await this.processResult()
        return this.getSingleOrManyResponses()
    }
}
