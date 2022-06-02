/**
 * Indicates whether a specified string is null, empty,
 * or consists only of white-space characters.
 * @param text The string to test
 */
export function isNullOrWhitespace(text: string | undefined | null): boolean {
    return (
        text === undefined || text === null || text == '' || /^\s+$/.test(text)
    )
}
