/**
 * Returns Unicode Normalization Form of given string and strips Combining Diacritical Marks
 * @param string String to de-accent
 */
export function deAccent(string: string): string {
    return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}
