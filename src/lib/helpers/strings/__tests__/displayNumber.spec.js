import { displayNumber } from '../displayNumber'

describe('displayNumber', () => {
    test('formats input number to shorter form', () => {
        expect(displayNumber(99_120_000_000, 2, 'b')).toBe('99.12')
        expect(displayNumber(99_120_000, 2, 'm')).toBe('99.12')
        expect(displayNumber(99_120, 2, 'k')).toBe('99.12')
        expect(displayNumber(99)).toBe('99')
    })
    // As toLocaleString behaves differently in browser and server environments (Node.js does not have internationalization by default,
    // it's recommended to replace it with some universal number formatting library in the future
})
