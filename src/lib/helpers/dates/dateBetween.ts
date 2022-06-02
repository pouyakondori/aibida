/**
 * Returns true if check date is between begin and end dates.
 *
 * @param begin Begin date
 * @param end End date
 * @param check Date to be checked
 */
export function dateBetween(
    begin: string | Date,
    end: string | Date,
    check: string | Date = new Date()
): boolean {
    const checkDate = new Date(check)
    const beginDate = new Date(begin)
    const endDate = (end && new Date(end)) || null

    return (
        (!beginDate ||
            (checkDate && checkDate.getTime() >= beginDate.getTime())) &&
        (!endDate || checkDate.getTime() < endDate.getTime())
    )
}
