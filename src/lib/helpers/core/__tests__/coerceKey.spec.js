import { coerceKey } from '../coerceKey'

describe('coerceKey', () => {
    test('coerces number', () => {
        expect(coerceKey(12)).toBe('12')
    })

    test('proxies string', () => {
        expect(coerceKey('foo')).toBe('foo')
    })

    test('gives null to not string or number', () => {
        expect(coerceKey(true)).toBe(null)
        expect(coerceKey(undefined)).toBe(null)
        expect(coerceKey({ foo: 'bar' })).toBe(null)
        expect(coerceKey([1, 2, 3])).toBe(null)
        expect(coerceKey([])).toBe(null)
        expect(coerceKey({})).toBe(null)
    })
})
