/**
 * Executes async function syncronously for several sets of parameters
 * @param array Sets of parameters
 * @param callback Asyncronous function to execute for each set of parameters
 */
export async function asyncForEach(
    array: readonly any[],
    callback: (...args: any[]) => Promise<any>
): Promise<void> {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}
