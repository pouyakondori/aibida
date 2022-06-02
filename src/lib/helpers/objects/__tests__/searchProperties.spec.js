import { searchProperties } from '../searchProperties'

describe('searchProperties', () => {
    test('returns true for empty query', () => {
        expect(searchProperties({}, undefined)).toBe(true)
        expect(searchProperties({}, '')).toBe(true)
        expect(searchProperties({}, null)).toBe(true)
    })

    test('returns false for faulty object', () => {
        expect(searchProperties(null, 'foo')).toBe(false)
        expect(searchProperties(undefined, 'foo')).toBe(false)
    })

    test('finds string property', () => {
        const input = {
            aibidia: 'great',
            foo: 'bar',
            vappa: {
                best: 'holiday',
            },
        }

        expect(searchProperties(input, 'great', ['aibidia'])).toBe(true)
        expect(searchProperties(input, 'great')).toBe(true)
        expect(searchProperties(input, 'bar')).toBe(true)
    })

    test('does not find string property', () => {
        const input = {
            foo: 'bar',
            vappa: {
                best: 'holiday',
            },
        }

        expect(searchProperties(input, 'foo')).toBe(false)
        // only searches for value of given properties
        expect(searchProperties(input, 'bar', ['aibidia'])).toBe(false)
        // only shallow search
        expect(searchProperties(input, 'holiday')).toBe(false)
    })

    test('finds function property', () => {
        const props = [
            {
                get: obj => obj.nestedProp1,
            },
            {
                get: obj => obj.nestedProp2,
            },
        ]

        const obj = {
            nestedProp1: ['foo', 'bar'],
            nestedProp2: 'aibidia',
        }

        expect(searchProperties(obj, 'bar', props)).toBe(true)
        expect(searchProperties(obj, 'aibidia', props)).toBe(true)
    })
})
