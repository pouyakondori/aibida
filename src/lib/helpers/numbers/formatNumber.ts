/**
 * Returns formatted number: fixed decimal part or rounded
 * @param value Value to be formatted
 * @param decimals Amount of decimal numbers
 */
export function formatNumber(
    value: number | null | undefined,
    decimals = 0
): number | null {
    if (typeof value !== 'number') {
        return null
    }

    if (decimals) {
        return parseFloat(value.toFixed(decimals))
    }

    return Math.round(value)
}
