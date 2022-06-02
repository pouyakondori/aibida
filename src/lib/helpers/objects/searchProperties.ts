import { isEmpty } from '../core/isEmpty'
import { matchValue } from '../strings/matchValue'

/**
 * Search object properties, return true if match is found in any of the
 * defined properties.
 * *
 * To search from arrays or nested properties defined property as {prop: String, get: Function}.
 *
 * Example, nested property: { prop: 'prop.nestedProp', get: (obj) => { return obj.prop.nestedProp } }
 *
 * Example, array: { prop: 'arrayProp', get: (obj) => { return obj.arrayProp && obj.arrayProp.map(item => item.prop) } }
 *
 * @param obj Object which properties to search
 * @param query Search string
 * @param {Array} properties=null If properties = null, then all properties are searched.
 */
export function searchProperties(
    obj: Record<string, any>,
    query: string,
    properties: readonly any[] | null = null
): boolean {
    if (isEmpty(query)) {
        return true
    }

    if (obj === undefined || obj === null) {
        return false
    }

    const searchableProps = properties || Object.keys(obj)

    for (let index = 0; index < searchableProps.length; index++) {
        const prop = searchableProps[index]

        if (typeof prop !== 'string') {
            const propValue = prop.get(obj)

            // propValue is an array
            if (propValue && Array.isArray(propValue)) {
                const items = propValue

                // Search items
                for (let itemIdx = 0; itemIdx < items.length; itemIdx++) {
                    const item = items[itemIdx]

                    if (matchValue(item, query)) {
                        return true
                    }
                }
            } else {
                // propValue: nested property, primitive type
                // Match propValue to query
                if (matchValue(propValue, query)) {
                    return true
                }
            }
        } else if (matchValue(obj[prop], query)) {
            return true
        }
    }

    return false
}
