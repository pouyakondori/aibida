import { arrToObjByProp } from '../arrToObjByProp'

describe('arrToObjByProp', () => {
    const input = [
        { Id: 1, Val: 'foo' },
        { Id: 2, Val: 'bar' },
    ]

    test('transforms succesfully', () => {
        expect(arrToObjByProp(input, 'Id')).toStrictEqual({
            '1': { Id: 1, Val: 'foo' },
            '2': { Id: 2, Val: 'bar' },
        })
    })

    test('empty output for wrong param', () => {
        expect(arrToObjByProp(input, 'Foo')).toEqual({})
    })
})
