type Undefinable = Record<string, unknown | undefined>

/**
 * Replaces specified property values in an object list with 'undefined'.
 * @param objects List of objects being handled
 * @param property The relevant attribute name in the object
 * @param valuesToReplace An array of values to be replaced
 * @param replacementValue Value to replace the existing value of 'property'.
 * @returns Returns a copy of the 'objects' list with the specified properties replaced
 */

export function replacePropertyValues(
    objects: Undefinable[],
    property: string,
    valuesToReplace: (unknown | undefined)[],
    replacementValue: unknown | undefined
): Undefinable[] {
    // If target list or valuesToReplace is empty, return without actions. 
    if (!objects || !valuesToReplace) {
        return []
    }

    return objects.map((obj: Undefinable) => {
        let idx = -1

        // Only check objects where the value is not already the correct one i.e. cannot
        // be among the values to replace
        if (obj[property] != replacementValue) {
            idx = valuesToReplace.indexOf(obj[property])
        }

        if (idx > -1) {
            const newParent = {
                ...obj,
                [property]: replacementValue,
            }

            return newParent
        } else {
            return obj
        }
    })
}
