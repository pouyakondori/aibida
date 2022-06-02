/**
 * Returns a new array of numbers
 * @param start Number to start from
 * @param end Number to end to
 * @param inclusive Include end-number to array. Default = true.
 */
export function range(start: number, end: number, inclusive = true): number[] {
    if (end < start) {
        return []
    }

    const endNumber = inclusive ? end + 1 : end

    return new Array(endNumber - start).fill(0).map((_, i) => start + i)
}
