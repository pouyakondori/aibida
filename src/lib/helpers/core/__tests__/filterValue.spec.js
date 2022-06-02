import { filterValue } from '../filterValue'

describe('filterValue', () => {
    test('finds substring with text filter', () => {
        expect(filterValue('foobar', 'ooba')).toBe(true)
        expect(filterValue('foóbar', 'ooba')).toBe(true)
    })

    test('does not find substring with text filter', () => {
        expect(filterValue('foobar', 'aibidia')).toBe(false)
    })

    test('value is within numeric filter range', () => {
        expect(filterValue(50, { min: 10, max: 100 })).toBe(true)
        expect(filterValue(10, { min: 10, max: 100 })).toBe(true)
        expect(filterValue(100, { min: 10, max: 100 })).toBe(true)
        expect(filterValue(0, { min: 0, max: 1 })).toBe(true)
        expect(filterValue(0, { min: 0, max: 0 })).toBe(true)
        expect(filterValue(0, { min: null, max: 10 })).toBe(true)
        expect(filterValue(1, { min: 1, max: null })).toBe(true)
    })

    test('value is not within numeric filter range', () => {
        expect(filterValue(200, { min: 10, max: 100 })).toBe(false)
        expect(filterValue(-2, { min: 10, max: 100 })).toBe(false)
        expect(filterValue(0, { min: 1, max: 10 })).toBe(false)
        expect(filterValue(0, { min: 1, max: null })).toBe(false)
    })

    test('returns true for empty filter', () => {
        expect(filterValue('foobar', null)).toBe(true)
        expect(filterValue('foobar', undefined)).toBe(true)
        expect(filterValue('foobar', '')).toBe(true)
    })

    test('returns false for empty value', () => {
        expect(filterValue(null, 'foo')).toBe(false)
    })

    test('returns true for empty value and empty filter', () => {
        expect(filterValue(null, '')).toBe(true)
    })
})
