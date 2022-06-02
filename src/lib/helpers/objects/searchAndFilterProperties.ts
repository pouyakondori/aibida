import { matchValue } from '../strings/matchValue'
import { searchAndFilterItems } from '../core/searchAndFilterItems'
import { filterValue } from '../core/filterValue'

/**
 * Search object properties, return true if match is found in any of the
 * defined properties.
 *
 * To search from arrays or nested properties defined property as {prop: String, get: Function}.
 *
 * Example, nested property: { prop: 'prop.nestedProp', get: (obj) => { return obj.prop.nestedProp } }
 *
 * Example, array: { prop: 'arrayProp', get: (obj) => { return obj.arrayProp && obj.arrayProp.map(item => item.prop) } }
 *
 * @param {{}} obj Object which properties to search
 * @param {String} query Search string
 * @param {{}} filters Defined filters are applied in addition of search. Names must match with the ones defined in properties.
 * @param properties=null If properties = null, then all properties are searched.
 *
 */
export function searchAndFilterProperties(
    obj: Record<string, any>,
    query: string,
    filters: Record<string, any>,
    properties: readonly any[] | null = null
): boolean {
    if (obj === undefined || obj === null) {
        return false
    }

    const searchableProps = properties || Object.keys(obj)
    let result = false

    // Object to pass search it needs to contain a single property that matches the query.
    // Object to pass filtering it needs to match every filter property.
    for (let index = 0; index < searchableProps.length; index++) {
        const prop = searchableProps[index]

        if (typeof prop !== 'string') {
            const propValue = prop.get(obj)
            const filter = filters && filters[prop.prop]

            // propValue is an array
            if (propValue && Array.isArray(propValue)) {
                // Search and filter items
                const { itemsMatch, filterResult } = searchAndFilterItems(
                    propValue,
                    query,
                    filter
                )

                // If filters is not defined
                if (itemsMatch) {
                    result = true
                }

                // If a single filtering returns false, no need to iterate further
                if (!filterResult) {
                    return false
                }
            } else {
                // propValue: nested property, primitive type
                // Match propValue to filter
                if (filter) {
                    const filterResult = filterValue(propValue, filter)

                    // If a single filtering returns false, no need to iterate further
                    if (!filterResult) {
                        return false
                    }
                }

                // Match propValue to query
                if (matchValue(propValue, query)) {
                    result = true
                }
            }
        } else {
            const propValue = obj[prop]
            const filter = filters && filters[prop]

            // Match propValue to filter
            if (filter) {
                const filterResult = filterValue(propValue, filter)

                // If a single filtering returns false, no need to iterate further
                if (!filterResult) {
                    return false
                }
            }

            // Match propValue to query
            if (matchValue(propValue, query)) {
                result = true
            }
        }
    }

    return result
}
