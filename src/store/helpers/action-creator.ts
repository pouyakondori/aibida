import { asyncForEach, getErrorMsgAndType } from 'lib/helpers'
import { ActionNames, ErrorMessageActions } from 'misc/constants'
import { signalError } from 'store/helpers/signalError'
import { AppActions } from 'store/modules/app-store'
import { ActionContext } from 'vuex'
import { ActionProcessor } from './ActionProcessor'

import type { UpsertAttachmentPayload } from 'types/Attachment'
import type { MutationType } from 'types/MutationType'

type Endpoint<T> = (dto: T, emptyResponse?: boolean) => Promise<unknown>

/**
 * Constructs and executes fetch requests Vuex Actions for multiple DTOs in sequential manner
 *
 * @param context Vuex context
 * @param payload Payload for the request
 * @param endpoint Request's endpoint callback function, (dto, emptyResponse) => {}
 * @param mutations Mutation object which contains Pending/Success/Error mutations
 * @param objectType Object type to be shown in error message
 * @param statusMutation Mutation name of the possible status mutation
 * @param fetchAction Action name of the possible fetch action
 */
export async function createActionAsync<T>(
    context: ActionContext<unknown, unknown>,
    payload: unknown,
    endpoint: Endpoint<T>,
    mutations: MutationType,
    objectType = 'Item',
    statusMutation = '',
    fetchAction: string | null = null
): Promise<unknown> {
    const actionProcessor = new ActionProcessor(context, payload, {
        actionType: ActionNames.Create,
        endpoint,
        mutations,
        objectType,
        statusMutation,
        fetchAction,
    })

    return await actionProcessor.sequential()
}

/**
 * Constructs and executes update requests Vuex Actions for multiple DTOs in sequential or parallel manner
 *
 * @param context Vuex context
 * @param payload Payload for the request
 * @param endpoint Request's endpoint callback function, (dto, emptyResponse) => {}
 * @param mutations Mutation object which contains Pending/Success/Error mutations
 * @param objectType = 'Items'. Object type to be shown in error message
 * @param statusMutation = null. Mutation name of the possible status mutation
 * @param fetchAction = null. Action name of the possible fetch action
 * @param isAwaited = false. Parameter to define whether rows need to be processed one at a time
 */
export async function updateActionAsync<T>(
    context: ActionContext<unknown, unknown>,
    payload: unknown,
    endpoint: Endpoint<T>,
    mutations: MutationType,
    objectType = 'Item',
    statusMutation = '',
    fetchAction: string | null = null,
    isAwaited = false
): Promise<unknown> {
    const actionProcessor = new ActionProcessor(context, payload, {
        actionType: ActionNames.Update,
        endpoint,
        mutations,
        objectType,
        statusMutation,
        fetchAction,
    })

    if (isAwaited) {
        return await actionProcessor.sequential()
    } else {
        return await actionProcessor.parallel()
    }
}

/**
 * Constructs and executes delete requests Vuex Actions for multiple DTOs in sequential or parallel manner
 *
 * @param context Vuex context
 * @param payload Payload for the request
 * @param endpoint Request's endpoint callback function, (dto, emptyResponse) => {}
 * @param mutations Mutation object which contains Pending/Success/Error mutations
 * @param objectType = 'Items'. Object type to be shown in error message
 * @param statusMutation = null. Mutation name of the possible status mutation
 * @param fetchAction = null. Action name of the possible fetch action
 * @param isAwaited = false. Parameter to define whether rows need to be processed one at a time
 */
export async function deleteActionAsync<T>(
    context: ActionContext<unknown, unknown>,
    payload: unknown,
    endpoint: Endpoint<T>,
    mutations: MutationType,
    objectType = 'Item',
    statusMutation = '',
    fetchAction: string | null = null,
    isAwaited = false
): Promise<unknown> {
    const actionProcessor = new ActionProcessor<T>(context, payload, {
        actionType: ActionNames.Delete,
        endpoint,
        mutations,
        objectType,
        statusMutation,
        fetchAction,
    })

    if (isAwaited) {
        return await actionProcessor.sequential()
    } else {
        return await actionProcessor.parallel()
    }
}

/**
 * Constructs and executes upsert attachment requests for multiple DTOs in sequential manner
 *
 * @param context Vuex context
 * @param payload Attachment form data for the request
 * @param endpoint Request's endpoint callback function, (dto) => {}
 * @param mutations Mutation object which contains Pending/Success/Error mutations
 * @param objectType = 'Attachments'. Object type hosting the attachments to be shown in the error message
 */
export async function upsertAttachmentActionAsync(
    { commit, dispatch }: ActionContext<unknown, unknown>,
    payload: UpsertAttachmentPayload,
    endpoint: Endpoint<unknown>,
    mutations: MutationType,
    objectType = 'Attachment'
): Promise<void> {
    const attachments = Array.isArray(payload.AttachmentFormData)
        ? payload.AttachmentFormData
        : [payload.AttachmentFormData]

    const LinkId = payload.LinkId

    console.log(payload)

    const objectData = {
        id: LinkId,
        transactionYearId: payload.TransactionYearId,
    }

    const successfulResponses: unknown[] = []

    await asyncForEach(attachments, async AttachmentFormData => {
        if (mutations.Pending) {
            commit(mutations.Pending, objectData)
        }

        try {
            const resp = await endpoint({ LinkId, AttachmentFormData })
            successfulResponses.push(resp)
        } catch (error: unknown) {
            await dispatch(
                AppActions.SetMsgAndShowSnackbar,
                getErrorMsgAndType(
                    error,
                    objectType,
                    ErrorMessageActions.Upsert
                )
            )

            if (mutations.Error) {
                commit(mutations.Error, { error, objectData })
            }
        }
    })

    successfulResponses.forEach(success => {
        commit(mutations.Success, success)
    })
}

/**
 * Retrieves entity data for a given year
 * T is a type of data we're retrieving
 *
 * @param context Vuex action context
 * @param yearId Id of the year we want to retrieve data for
 * @param endpoint Endpoint for making the request
 * @param saveResultMutation Name of Vuex mutation for saving data to the store after its retrieval from backend
 * @param entityName Name of the entity we want to retrieve
 */
export async function fetchAndSaveForYear<T>(
    context: ActionContext<unknown, unknown>,
    yearId: number,
    endpoint: (yearId: number) => Promise<T>,
    saveResultMutation: string,
    entityName: string
): Promise<void> {
    if (!yearId) {
        throw `yearId is not defined in ${entityName} store module`
    }

    try {
        const resp = (await endpoint(yearId)) as T
        context.commit(saveResultMutation, {
            TransactionYearId: yearId,
            items: resp,
        })
    } catch (error: unknown) {
        await signalError(
            context.dispatch,
            error,
            entityName,
            ErrorMessageActions.Fetch
        )
    }
}
