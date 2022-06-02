import { formatPlural } from '../formatPlural'

describe('formatPlural', () => {
    test('replaces y symbol at the end of input string', () => {
        expect(formatPlural('toy')).toBe('toie')
    })

    test('does not change y symbols in other places', () => {
        const inputString = 'Yo-yo'
        const outputString = formatPlural(inputString)
        expect(outputString).toBe(inputString)
    })
})
