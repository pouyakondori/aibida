import { format, parse } from 'date-fns'
import { DateConversions } from 'misc/constants'

enum DateFormats {
    YearFirstDashed = 'yyyy-MM-dd',
    YearLastSpaced = 'dd MMMM yyyy',
}

/**
 * Returns a date represented as formatted string
 * @param date Date we want to format into a string
 * @param toFormat Target format for stringified date
 */
export function formatDate(
    date: Date | string | null | undefined,
    toFormat: DateConversions
): string | null {
    const outputFormat =
        toFormat === DateConversions.ToYearFirst
            ? DateFormats.YearFirstDashed
            : DateFormats.YearLastSpaced

    const inputFormat =
        toFormat === DateConversions.ToYearFirst
            ? DateFormats.YearLastSpaced
            : DateFormats.YearFirstDashed

    try {
        // Parse first if date is a non empty string
        if (typeof date === 'string' && date) {
            const parsedDate = parse(date, inputFormat, new Date())
            return format(parsedDate, outputFormat)
        }

        // Just format if date is already a Date instance
        if (date instanceof Date) {
            return format(date, outputFormat)
        }
    } catch (err: unknown) {
        return null
    }

    return null
}
