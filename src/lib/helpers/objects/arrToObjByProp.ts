/**
 * Transforms array into record by given prop value
 *
 * @example
 * arrToObjByProp([{Id: 1, Val: 'foo'}, {Id: 2, Val: 'bar'}], 'Id')
 * // returns {'1': {Id: 1, Val: 'foo'}, '2': {Id: 2, Val: 'bar'}}
 *
 * @param array Collection to transform
 * @param prop Prop to gather keys values from
 */
export function arrToObjByProp<T>(
    array: T[],
    prop: keyof T
): Record<string, T> {
    return array.reduce((acc: Record<string, T>, val: T) => {
        const propVal = val[prop]
        if (
            propVal &&
            (typeof propVal === 'string' || typeof propVal === 'number')
        ) {
            acc[propVal as string] = val
        }

        return acc
    }, {})
}
