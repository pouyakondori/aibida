/**
 * Returns a boolean representation of whether value is within given range
 * @param value Number being validated
 * @param min Number to define the lower limit
 * @param max Number to define the upper limit
 */
export function between(
    value: number | null | undefined,
    min: number | null | undefined,
    max: number | null | undefined
): boolean {
    if (typeof value !== 'number') {
        return false
    }

    return (!min || value >= min) && (!max || value <= max)
}
