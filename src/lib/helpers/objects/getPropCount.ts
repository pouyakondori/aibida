/**
 * Returns number of properties for a given object
 *
 * @param obj object to count properties for
 */
export function getPropCount(obj: Record<string, unknown> | undefined): number {
    return (obj && Object.keys(obj).length) || 0
}
