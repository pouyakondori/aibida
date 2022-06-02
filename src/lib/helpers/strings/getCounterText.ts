/**
 * Returns string with formatter row counter
 * @param rowCount Total row count in the view
 * @param visibleRowCount Visible row count as filtered by search and column filters
 * @param objectType Plural expression of the type of object represented in the table
 */
export function getCounterText(
    rowCount: number,
    visibleRowCount: number,
    objectType = 'Rows'
): string {
    if (rowCount == visibleRowCount) {
        return `${rowCount} ${objectType}`
    } else {
        return `${visibleRowCount} / ${rowCount} ${objectType}`
    }
}
