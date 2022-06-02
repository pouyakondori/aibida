import { isTrue } from '../isTrue'

describe('isTrue', () => {
    test('checks true/false correctly', () => {
        expect(isTrue(true)).toBe(true)
        expect(isTrue('true')).toBe(true)
        expect(isTrue('false')).toBe(false)
        expect(isTrue('')).toBe(false)
        expect(isTrue('0')).toBe(false)
        expect(isTrue({})).toBe(false)
        expect(isTrue([])).toBe(false)
        expect(isTrue('foo')).toBe(false)
        expect(isTrue('55')).toBe(false)
    })
})
