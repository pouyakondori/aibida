import { getCounterText } from '../getCounterText'

describe('getCounterText', () => {
    test('shows long form counter string', () => {
        expect(getCounterText(5, 3)).toBe('3 / 5 Rows')
    })

    test('shows short form counter string', () => {
        expect(getCounterText(5, 5, 'Elephants')).toBe('5 Elephants')
    })
})
