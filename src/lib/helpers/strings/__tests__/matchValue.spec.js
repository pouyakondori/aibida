import { matchValue } from '../matchValue'

describe('matchValue', () => {
    test('finds substring', () => {
        expect(matchValue('aibidia', 'bid')).toBeTruthy()
        expect(matchValue(2128506, '50')).toBeTruthy()
        // Empty substring is considered a success
        expect(matchValue('foo', '')).toBeTruthy()
    })

    test('does not find substring', () => {
        expect(matchValue(undefined, 'foo')).toBeFalsy()
        expect(matchValue(null, 'foo')).toBeFalsy()
        expect(matchValue('', 'foo')).toBeFalsy()
    })
})
