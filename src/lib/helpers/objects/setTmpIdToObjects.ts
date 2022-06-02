import { createTmpId } from '../strings/createTmpId'

/**
 * Returns a new array of objects with added temporary id
 * @param arrayOfObjects Objects for injecting temporary id
 */
export function setTmpIdToObjects(
    arrayOfObjects: readonly Record<string, unknown>[]
): Record<string, unknown>[] {
    return arrayOfObjects.map(obj => {
        return {
            TmpId: createTmpId(),
            ...obj,
        }
    })
}
