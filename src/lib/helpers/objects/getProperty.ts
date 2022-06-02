/**
 * Returns property value from object
 * @param object Object from where to get the property value
 * @param path Path to the property. String, if shallow search. Array, if deep search.
 */
export function getProperty(
    object: Record<string, any>,
    path: string | readonly string[]
): unknown {
    if (object) {
        let obj = { ...object }

        if (Array.isArray(path) && path.length) {
            for (let i = 0; i < path.length; i++) {
                obj = obj[path[i]]

                if (obj === undefined || obj === null) {
                    return undefined
                }
            }

            return obj
        }

        if (typeof path === 'string') {
            return obj[path]
        }
    }

    return undefined
}
