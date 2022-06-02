import { isEmpty } from '../isEmpty'

describe('isEmpty', () => {
    test('checks empty correctly', () => {
        expect(isEmpty('')).toBe(true)
        expect(isEmpty(null)).toBe(true)
        expect(isEmpty(undefined)).toBe(true)
        expect(isEmpty(0)).toBe(false)
        expect(isEmpty(false)).toBe(false)
        expect(isEmpty(true)).toBe(false)
        expect(isEmpty('foo')).toBe(false)
        expect(isEmpty([])).toBe(false)
        expect(isEmpty({})).toBe(false)
    })
})
