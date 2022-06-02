import { updateData } from 'store/helpers/mutation-helper'
import {
    getYearObject,
    getObjectAsArray,
    getYearObjectAsArray,
    getById,
} from '../getter-helper'

const idGroupedState = {
    '1': { Id: 1, TransactionYearId: 100, Foo: 'bar' },
    '2': { Id: 2, TransactionYearId: 100, Foo: 'bar' },
}

const yearGroupedState = {
    '100': {
        '1': { Id: 1, TransactionYearId: 100, Foo: 'bar' },
        '2': { Id: 2, TransactionYearId: 100, Foo: 'bar' },
    },
    '200': {
        '3': { Id: 3, TransactionYearId: 200, Foo: 'bar' },
        '4': { Id: 4, TransactionYearId: 200, Foo: 'bar' },
    },
}

describe('getYearObject', () => {
    test('retrieves year content', () => {
        expect(
            getYearObject(yearGroupedState, {
                selectedYearId: 100,
            })
        ).toStrictEqual({
            '1': { Id: 1, TransactionYearId: 100, Foo: 'bar' },
            '2': { Id: 2, TransactionYearId: 100, Foo: 'bar' },
        })
    })

    test('did not find data', () => {
        expect(
            getYearObject(yearGroupedState, {
                selectedYearId: 300,
            })
        ).toBe(null)
    })
})

describe('getObjectAsArray', () => {
    test('transforms from object to array', () => {
        expect(
            getObjectAsArray(idGroupedState, {
                selectedYearId: 100,
            })
        ).toStrictEqual([
            { Id: 1, TransactionYearId: 100, Foo: 'bar' },
            { Id: 2, TransactionYearId: 100, Foo: 'bar' },
        ])
    })

    test('returns empty array for null input', () => {
        expect(
            getObjectAsArray(null, {
                selectedYearId: 400,
            })
        ).toStrictEqual([])
    })

    // TODO Add more real usage cases with transformation functions
})

describe('getYearObjectAsArray', () => {
    test('transforms from object to array', () => {
        expect(
            getYearObjectAsArray(yearGroupedState, {
                selectedYearId: 100,
            })
        ).toStrictEqual([
            { Id: 1, TransactionYearId: 100, Foo: 'bar' },
            { Id: 2, TransactionYearId: 100, Foo: 'bar' },
        ])

        expect(
            getYearObjectAsArray(yearGroupedState, {
                selectedYearId: 200,
            })
        ).toStrictEqual([
            { Id: 3, TransactionYearId: 200, Foo: 'bar' },
            { Id: 4, TransactionYearId: 200, Foo: 'bar' },
        ])
    })

    test('returns empty array for null input', () => {
        expect(
            getYearObjectAsArray(null, {
                selectedYearId: 400,
            })
        ).toStrictEqual([])
    })

    // TODO Add more real usage cases with transformation functions
})

describe('getById', () => {
    test('retrieves the object', () => {
        expect(
            getById(
                yearGroupedState,
                {
                    selectedYearId: 100,
                },
                2
            )
        ).toStrictEqual({ Id: 2, TransactionYearId: 100, Foo: 'bar' })
    })

    test('returns null result for null input', () => {
        expect(
            getById(
                null,
                {
                    selectedYearId: 400,
                },
                ''
            )
        ).toBe(null)
    })

    // TODO Add more real usage cases with transformation functions
})
