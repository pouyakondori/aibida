type Undefinable = Record<string, unknown | undefined>

import { replacePropertyValues } from 'src/lib/helpers/objects/replacePropertyValues'

/**
 * Clears specified child property values from a parent object e.g. when
 * child object has been deleted.
 * @example Transaction has a property ProductGroup, denoted by
 * ProductGroupId. When a specific product group (e.g. with Id 8)
 * is deleted from the database, this function clears (or optionally replaces)
 * the ProductGroupId for every Transaction in the list where ProductGroupId = 8.
 * @param parentList List of parent objects being operated on
 * @param property The property being modified in the parent object
 * @param childObjects The child objects, linked to the parent through 'property'
 * @param childKey The property in the child object linked to the parent. Defaults to 'Id'
 * @param replacementValue Optional value to replace the existing value in parent.
 * @returns Returns a copy of 'parentList' with the specified values replaced
 * Defaults to 'null'
 */
export function clearChildValues<T>(
    parentList: Undefinable[],
    property: string,
    childObjects: Undefinable | Undefinable[],
    childKey = 'Id'
): Undefinable[] {
    // Extract values to be replaced from list of objects
    const childValues = Array.isArray(childObjects)
        ? childObjects.map(item => item[childKey])
        : [childObjects[childKey]]

    return replacePropertyValues(parentList, property, childValues, null)
}
