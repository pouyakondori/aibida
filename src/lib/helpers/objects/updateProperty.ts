/**
 * Updates object property, even nested ones
 * @param object Object from where to get the property value
 * @param path Path to the property. String, if shallow search. Array, if deep search.
 * @param value New value
 */
export function updateProperty(
    object: Record<string, any>,
    path: string | readonly string[],
    value: unknown
): void {
    if (object) {
        let obj = object
        if (Array.isArray(path) && path.length > 1) {
            for (let i = 0; i < path.length; i++) {
                // Create possible nested objects
                if (!obj[path[i]] && i + 1 < path.length) {
                    obj[path[i]] = {}
                }

                // Directly assign value, if end of path
                if (i + 1 == path.length) {
                    obj[path[i]] = value
                }

                obj = obj[path[i]]
            }
        } else if (Array.isArray(path) && path.length == 1) {
            obj[path[0]] = value
        } else if (typeof path === 'string') {
            obj[path] = value
        }
    }

    return void 0
}
