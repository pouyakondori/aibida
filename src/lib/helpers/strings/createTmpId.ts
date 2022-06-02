/**
 * Returns a randomized string for using as a temporary id
 */
export function createTmpId(): string {
    return `TMP_${Math.random().toString().substring(2)}`
}
