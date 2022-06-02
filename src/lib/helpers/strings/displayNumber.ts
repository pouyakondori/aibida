/**
 * Formats a number to a string with a given magnitude
 * @param value Numeric value to be formatted
 * @param decimals Amount of decimal numbers
 * @param magnitude Optional parameter to display the number at a specific order of magnitude. 'k' = thousands, 'm' = millions, 'b' = billions
 */
export function displayNumber(
    value: number | null | undefined,
    decimals = 0,
    magnitude?: string
): string | null {
    if (typeof value !== 'number') {
        return null
    }

    if (magnitude) {
        switch (magnitude) {
            case 'k':
                value = value / 1_000
                break
            case 'm':
                value = value / 1_000_000
                break
            case 'b':
                value = value / 1_000_000_000
                break
            default:
                break
        }
    }

    const options = {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }

    return value.toLocaleString('fi-FI', options).replace(',', '.')
}
