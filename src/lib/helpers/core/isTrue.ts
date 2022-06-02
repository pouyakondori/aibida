/**
 * Returns a boolean representation of a value and converts strings
 * 'true' and 'false' into the corresponding boolean values
 * @param value Value to check for true
 */
export function isTrue(value: unknown): boolean {
    if (value && typeof value !== 'boolean') {
        return String(value).toLowerCase() === 'true'
    }

    return !!value
}
