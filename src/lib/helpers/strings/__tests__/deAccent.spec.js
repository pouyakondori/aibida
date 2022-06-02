import { deAccent } from '../deAccent'

describe('deAccent', () => {
    test('normalizes two variants of the word with diacritical marks into the same string', () => {
        const amelieInSixSymbols = '\u0041\u006d\u0065\u0301\u006c\u0069\u0065'
        const amelieInSevenSymbols = '\u0041\u006d\u00e9\u006c\u0069\u0065'
        const resultFromSix = deAccent(amelieInSixSymbols)
        const resultFromSeven = deAccent(amelieInSevenSymbols)
        expect(resultFromSix === resultFromSeven).toBeTruthy()
    })
})
