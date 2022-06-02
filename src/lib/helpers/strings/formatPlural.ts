/**
 * Returns pluralized version of input string
 * @param string Input string we want to pluralize
 */
export function formatPlural(string: string): string {
    return string.replace(/y$/, 'ie')
}
