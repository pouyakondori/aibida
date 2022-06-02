import { getProperty } from '../getProperty'

describe('getProperty', () => {
    const inputObject = {
        foo: 'bar',
        aibidia: {
            isNice: true,
            does: {
                nice: 'work',
            },
        },
    }

    test('finds shallow property', () => {
        expect(getProperty(inputObject, 'foo')).toBe('bar')
    })

    test('finds deep property', () => {
        expect(getProperty(inputObject, ['aibidia', 'isNice'])).toBe(true)
        expect(getProperty(inputObject, ['aibidia', 'does'])).toStrictEqual({
            nice: 'work',
        })
    })

    test('does not find anything', () => {
        expect(getProperty(inputObject, ['foo', 'bar'])).toBe(undefined)
        expect(getProperty({}, ['foo', 'bar'])).toBe(undefined)
    })
})
