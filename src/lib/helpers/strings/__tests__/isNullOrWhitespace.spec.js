import { isNullOrWhitespace } from '../isNullOrWhitespace'

describe('isNullOrWhitespace', () => {
    test('returns positive', () => {
        expect(isNullOrWhitespace('')).toBeTruthy()
        expect(isNullOrWhitespace(' ')).toBeTruthy()
        expect(isNullOrWhitespace(null)).toBeTruthy()
        expect(isNullOrWhitespace(undefined)).toBeTruthy()
    })

    test('returns negative', () => {
        expect(isNullOrWhitespace('foo')).toBeFalsy()
    })
})
