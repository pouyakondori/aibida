import { formatNumber } from '../formatNumber'

describe('formatNumber', () => {
    test('formats successfully', () => {
        expect(formatNumber(500.3412, 2)).toBe(500.34)
        expect(formatNumber(500.3499, 2)).toBe(500.35)
        expect(formatNumber(500.3499)).toBe(500)
        expect(formatNumber(500.999)).toBe(501)
        expect(formatNumber(0)).toBe(0)
    })

    test('returns null on empty input', () => {
        expect(formatNumber(null)).toBe(null)
        expect(formatNumber(undefined)).toBe(null)
    })
})
