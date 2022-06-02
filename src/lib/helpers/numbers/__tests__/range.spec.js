import { range } from '../range'

describe('range', () => {
    test('constructs an array successfully', () => {
        expect(range(5, 10)).toEqual([5, 6, 7, 8, 9, 10])
        expect(range(5, 10, false)).toEqual([5, 6, 7, 8, 9])
        expect(range(5, 5, false)).toEqual([])
        expect(range(5, 5)).toEqual([5])
    })

    test('empty array for incorrect input', () => {
        expect(range(10, 5)).toEqual([])
    })
})
