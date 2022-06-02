/**
 * Checks that a thing is empty
 * @param value Thing we're changing
 */
export function isEmpty(value: unknown): boolean {
    return value === '' || value === null || value === undefined
}
