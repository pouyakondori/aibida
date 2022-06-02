import { formatDate } from '../formatDate'
import { DateConversions } from '../../../../misc/constants'

describe('formatDate', () => {
    test('formats date from Date instance', () => {
        const dateRaw = new Date(2020, 2, 3, 5, 18, 3)
        const dateFormattedYearFirst = formatDate(
            dateRaw,
            DateConversions.ToYearFirst
        )

        const dateFormattedYearLast = formatDate(
            dateRaw,
            DateConversions.ToYearLast
        )

        expect(dateFormattedYearFirst).toBe('2020-03-03')
        expect(dateFormattedYearLast).toBe('03 March 2020')
    })

    test('formats date from string', () => {
        const dateFormattedYearFirst = formatDate(
            '8 March 2014',
            DateConversions.ToYearFirst
        )

        const dateFormattedYearLast = formatDate(
            '2020-11-05',
            DateConversions.ToYearLast
        )

        const dateFromIncorrectString = formatDate(
            'foo',
            DateConversions.ToYearLast
        )

        expect(dateFormattedYearFirst).toBe('2014-03-08')
        expect(dateFormattedYearLast).toBe('05 November 2020')
        expect(dateFromIncorrectString).toBe(null)
    })

    test('gives null for empty data', () => {
        expect(formatDate('', DateConversions.ToYearFirst)).toBe(null)
        expect(formatDate(null, DateConversions.ToYearFirst)).toBe(null)
        expect(formatDate(undefined, DateConversions.ToYearFirst)).toBe(null)
    })
})
