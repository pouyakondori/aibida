import { updateProperty } from '../updateProperty'

describe('updateProperty', () => {
    test('updates shallow property', () => {
        const input = {
            foo: {
                bar: 1,
            },
            aibidia: true,
        }

        updateProperty(input, 'aibidia', false)

        expect(input).toStrictEqual({
            foo: {
                bar: 1,
            },
            aibidia: false,
        })
    })

    test('updates deep property', () => {
        const input = {
            foo: {
                bar: 1,
            },
            aibidia: true,
        }

        updateProperty(input, ['foo', 'bar'], 100)

        expect(input).toStrictEqual({
            foo: {
                bar: 100,
            },
            aibidia: true,
        })
    })

    test('adds non existent property', () => {
        const input = {
            foo: {
                bar: 1,
            },
            aibidia: true,
        }

        updateProperty(input, 'bar', 100)

        expect(input).toStrictEqual({
            foo: {
                bar: 1,
            },
            bar: 100,
            aibidia: true,
        })
    })
})
