import { matchValue } from '../strings/matchValue'
import { filterValue } from './filterValue'

import type { NumericFilterRange } from 'types/NumericFilterRange'

type SearchAndFilterResult = {
    itemsMatch: boolean
    filterResult: boolean
}

/**
 * Returns result of searching and filtering of strings or numbers
 * For numbers it's about intersection, for strings it's about substrings
 * @param {Array} items Array of primitive type values
 * @param query Search string
 * @param {String | {}} filter Filter value.
 */
export function searchAndFilterItems(
    items: readonly (string | number)[],
    query: string,
    filter: string | NumericFilterRange
): SearchAndFilterResult {
    let itemsMatch = false
    let filterResult = false

    // If there are no items, then return filter result
    // for empty. If filter is empty then result is true.
    if (!items || !items.length) {
        filterResult = filterValue(null, filter)
    }

    // Iterate array items
    for (const item of items) {
        // Apply filter (item includes filter)
        if (filterValue(item, filter)) {
            filterResult = true
        }

        // Match item to query
        if (matchValue(item, query)) {
            itemsMatch = true
        }

        // If both true, no need to iterate further.
        if (filterResult && itemsMatch) {
            break
        }
    }

    return { itemsMatch, filterResult }
}
