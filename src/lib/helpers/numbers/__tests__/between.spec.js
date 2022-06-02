import { between } from '../between'

describe('between', () => {
    test('value is within range', () => {
        expect(between(3, 1, 5)).toBe(true)
        expect(between(2.3499, 1.897, 2.352)).toBe(true)
        expect(between(50.89, 50.89, 58.82)).toBe(true)
        expect(between(50.89, 49.87, 50.89)).toBe(true)
        expect(between(0, 0, 1)).toBe(true)
        expect(between(0, 0, 0)).toBe(true)
    })

    test('value is out of range', () => {
        expect(between(100, 100.01, 200)).toBe(false)
        expect(between(100.01, 99, 100)).toBe(false)
        expect(between(3, 4, 5)).toBe(false)
        expect(between(5, 3, 4)).toBe(false)
    })

    test('value is less or equal to maximum', () => {
        expect(between(100, null, 200)).toBe(true)
        expect(between(100.01, null, 100)).toBe(false)
        expect(between(3, null, 5)).toBe(true)
        expect(between(5, null, 4)).toBe(false)

        expect(between(100, undefined, 200)).toBe(true)
        expect(between(100.01, undefined, 100)).toBe(false)
        expect(between(3, undefined, 5)).toBe(true)
        expect(between(5, undefined, 4)).toBe(false)
    })

    test('value is more or equal to minimum', () => {
        expect(between(100, 100, null)).toBe(true)
        expect(between(100.01, 99, null)).toBe(true)
        expect(between(3, 4, null)).toBe(false)
        expect(between(5, 5, null)).toBe(true)

        expect(between(100, 100, undefined)).toBe(true)
        expect(between(100.01, 99, undefined)).toBe(true)
        expect(between(3, 4, undefined)).toBe(false)
        expect(between(5, 5, undefined)).toBe(true)
    })

    test('returns null, if value is null or undefined', () => {
        expect(between(null, 1, 5)).toBe(false)
        expect(between(undefined, 1, 5)).toBe(false)
    })
})
