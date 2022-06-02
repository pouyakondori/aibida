import { matchValue } from '../strings/matchValue'
import { isEmpty } from './isEmpty'

import type { NumericFilterRange } from 'types/NumericFilterRange'

/**
 * Returns true if value (accented or un-accented) includes check-string.
 * If text filter, value is a string.
 * If numeric filter, value is an object {min: Number, max: Number}.
 * @param value Value to compare
 * @param filter Filter value.
 */
export function filterValue(
    value: string | number | null,
    filter: string | NumericFilterRange
): boolean {
    // Filter is empty if it's an empty string or if it has empty min and max value in object form
    const emptyFilter =
        isEmpty(filter) ||
        (typeof filter !== 'string' &&
            isEmpty(filter.min) &&
            isEmpty(filter.max))

    if (emptyFilter) {
        return true
    }

    if (!emptyFilter && isEmpty(value)) {
        return false
    }

    // Make the substring check for string filter
    if (typeof filter === 'string') {
        return matchValue(value, filter)
    }

    // Make filter check for numbers
    if (typeof value === 'number') {
        return (
            (filter.min === null || value >= filter.min) &&
            (filter.max === null || value <= filter.max)
        )
    }

    return false
}
