/**
 * Operation is a function that returns the retryable promise, which needs resolving
 */
type Operation = () => Promise<unknown>

/**
 * Methods for trying to resolve one or more promises a fixed number of times before stopping with error
 * In following examples, the methodX returns a Promise
 * @example // With multiple queries
 * await new PromiseRepeater().queryAll([
 *      () => method1(...args),
 *      () => method2(...args),
 *      () => method3(...args),
 * ])
 * @example // With one query
 * await new PromiseRepeater().query(() => method4(...args))
 * @example // With one query where no parameters (little shorter)
 * await new PromiseRepeater().query(method5)
 */
export class PromiseRepeater {
    /** How many times we want to try to successfully resolve promises */
    private readonly numberOfTries: number
    /** How long to wait between tries, in milliseconds */
    private readonly intervalInMs: number
    /** How many tries already happened */
    private counter: number

    constructor(numberOfTries = 5, intervalInMs = 5000) {
        this.numberOfTries = numberOfTries
        this.intervalInMs = intervalInMs
        this.counter = 0
    }

    /**
     * Tries to do one more attempt to resolve promises
     * @param err Error from previous attempt
     * @param operations Array of functions returning promises to try to resolve, or retry in case of error
     */
    private tryAgain(err: unknown, operations: Operation[]): Promise<unknown> {
        if (this.counter++ < this.numberOfTries) {
            return new Promise((res, rej) => {
                setTimeout(async () => {
                    try {
                        await this.queryAll(operations)
                        res()
                    } catch (err: unknown) {
                        rej(err)
                    }
                }, this.intervalInMs)
            })
        } else {
            throw err
        }
    }

    /**
     * Tries to resolve multiple parallel promises from function calls
     * @param operations Array of functions returning promises to try to resolve, or retry in case of error
     */
    async queryAll(operations: Operation[]): Promise<unknown> {
        const promises = operations.reduce((acc: Promise<unknown>[], cur) => {
            acc.push(cur())
            return acc
        }, [])

        try {
            return await Promise.all(promises)
        } catch (err: unknown) {
            return this.tryAgain(err, operations)
        }
    }

    /**
     * Tries to resolve one promise, and tries again in case of error
     * @param promise Function which returns a promise, which is resolved and returned, or retried in case of error
     * @param param Parameter to pass to promise
     */
    async query(promise: Operation): Promise<unknown> {
        try {
            return await promise()
        } catch (err: unknown) {
            return this.tryAgain(err, [promise])
        }
    }
}
