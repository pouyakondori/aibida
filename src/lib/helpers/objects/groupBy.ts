/**
 * Returns a new object of arrays, grouped by the property given
 * @param items Array of objects or Array of arrays
 * @param property Property name or index. Only shallow search
 */
export function groupBy(
    items: readonly Record<string, any>[],
    property: string | number | Function
): Record<string, unknown> {
    if (items.length) {
        return items.reduce((acc, item) => {
            if (typeof property == 'function') {
                ;(acc[property(item)] = acc[property(item)] || []).push(item)
            } else {
                ;(acc[item[property]] = acc[item[property]] || []).push(item)
            }

            return acc
        }, {})
    }

    return {}
}
