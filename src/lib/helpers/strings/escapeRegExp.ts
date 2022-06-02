/**
 * Cleans the string from escape characters
 * @param string String to clean
 */
export function escapeRegExp(string: string): string {
    return string.replace(/([.*+?^${}()|[\]\\])/g, '\\$1')
}
