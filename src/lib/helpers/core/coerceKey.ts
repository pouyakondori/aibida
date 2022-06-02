/**
 * Checks and prepares a value to be used as object key
 *
 * @param value Value to be checked and coerced
 */
export function coerceKey(value: unknown): string | null {
    // No transformation needed
    if (typeof value === 'string') {
        return value
    }

    // Transform explicitly for easier TypeScript support
    if (typeof value === 'number') {
        return value.toString()
    }

    // Key could not be coerced
    return null
}
