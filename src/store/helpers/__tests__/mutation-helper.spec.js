import {
    updateData,
    updateYearData,
    updateYearItemData,
    updateYearItemItemData,
    deleteYearItemData,
    getYearItem,
} from '../mutation-helper'

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

const yearGroupedTwoLevelState = {
    '100': {
        '50': {
            '1': { Id: 1, EntityId: 50, TransactionYearId: 100, Foo: 'bar' },
            '2': { Id: 2, EntityId: 50, TransactionYearId: 100, Foo: 'bar' },
        },
        '51': {
            '3': { Id: 3, EntityId: 51, TransactionYearId: 100, Foo: 'bar' },
            '4': { Id: 4, EntityId: 51, TransactionYearId: 100, Foo: 'bar' },
        },
    },
    '200': {
        '60': {
            '5': { Id: 5, EntityId: 60, TransactionYearId: 200, Foo: 'bar' },
            '6': { Id: 6, EntityId: 60, TransactionYearId: 200, Foo: 'bar' },
        },
        '61': {
            '7': { Id: 7, EntityId: 61, TransactionYearId: 200, Foo: 'bar' },
            '8': { Id: 8, EntityId: 61, TransactionYearId: 200, Foo: 'bar' },
        },
    },
}

const compositeKeyConfig = {
    itemKey: 'Id',
    createIdFn: val => {
        return `${val.Id1}-${val.Id2}-${val.Id3}`
    },
}

describe('updateData', () => {
    test('updates object', () => {
        expect(
            updateData(idGroupedState, [
                {
                    Id: 2,
                    TransactionYearId: 100,
                    Foo: 'new',
                },
                {
                    Id: 10,
                    TransactionYearId: 100,
                    Foo: 'bar',
                },
            ])
        ).toStrictEqual({
            '1': { Id: 1, TransactionYearId: 100, Foo: 'bar' },
            '2': { Id: 2, TransactionYearId: 100, Foo: 'new' },
            '10': { Id: 10, TransactionYearId: 100, Foo: 'bar' },
        })
    })

    test('state did not change', () => {
        expect(updateData(idGroupedState, [])).toStrictEqual(idGroupedState)
    })

    // TODO Add more real usage cases
})

describe('updateYearData', () => {
    test('updates object', () => {
        expect(
            updateYearData(yearGroupedState, {
                TransactionYearId: 100,
                items: [
                    {
                        Id: 2,
                        TransactionYearId: 100,
                        Foo: 'new',
                    },
                    {
                        Id: 10,
                        TransactionYearId: 100,
                        Foo: 'bar',
                    },
                ],
            })
        ).toStrictEqual({
            '100': {
                '2': { Id: 2, TransactionYearId: 100, Foo: 'new' },
                '10': { Id: 10, TransactionYearId: 100, Foo: 'bar' },
            },
            '200': {
                '3': { Id: 3, TransactionYearId: 200, Foo: 'bar' },
                '4': { Id: 4, TransactionYearId: 200, Foo: 'bar' },
            },
        })
    })

    test('creates composite id and updates object', () => {
        expect(
            updateYearData(
                {},
                {
                    TransactionYearId: 100,
                    items: [
                        {
                            Id1: 1,
                            Id2: 2,
                            Id3: 3,
                            TransactionYearId: 100,
                            Foo: 'new',
                        },
                        {
                            Id1: 4,
                            Id2: 5,
                            Id3: 6,
                            TransactionYearId: 100,
                            Foo: 'bar',
                        },
                    ],
                },
                compositeKeyConfig
            )
        ).toStrictEqual({
            '100': {
                '1-2-3': {
                    Id1: 1,
                    Id2: 2,
                    Id3: 3,
                    Id: '1-2-3',
                    TransactionYearId: 100,
                    Foo: 'new',
                },
                '4-5-6': {
                    Id1: 4,
                    Id2: 5,
                    Id3: 6,
                    Id: '4-5-6',
                    TransactionYearId: 100,
                    Foo: 'bar',
                },
            },
        })
    })

    test('returns empty state for null input state', () => {
        expect(updateYearData(null, {})).toStrictEqual({})
    })

    // TODO Add more real usage cases with different configs
})

describe('updateYearItemData', () => {
    test('updates object', () => {
        expect(
            updateYearItemData(yearGroupedState, {
                Id: 2,
                TransactionYearId: 100,
                Foo: 'new',
            })
        ).toStrictEqual({
            '100': {
                '1': { Id: 1, TransactionYearId: 100, Foo: 'bar' },
                '2': { Id: 2, TransactionYearId: 100, Foo: 'new' },
            },
            '200': {
                '3': { Id: 3, TransactionYearId: 200, Foo: 'bar' },
                '4': { Id: 4, TransactionYearId: 200, Foo: 'bar' },
            },
        })
    })

    test('returns empty state for null input state', () => {
        expect(updateYearItemData(null, {})).toStrictEqual({})
    })

    // TODO Add more real usage cases with different configs
})

describe('updateYearItemItemData', () => {
    test('updates object', () => {
        expect(
            updateYearItemItemData(yearGroupedTwoLevelState, {
                Id: 5,
                EntityId: 60,
                TransactionYearId: 200,
                Foo: 'new',
            })
        ).toStrictEqual({
            '100': {
                '50': {
                    '1': {
                        Id: 1,
                        EntityId: 50,
                        TransactionYearId: 100,
                        Foo: 'bar',
                    },
                    '2': {
                        Id: 2,
                        EntityId: 50,
                        TransactionYearId: 100,
                        Foo: 'bar',
                    },
                },
                '51': {
                    '3': {
                        Id: 3,
                        EntityId: 51,
                        TransactionYearId: 100,
                        Foo: 'bar',
                    },
                    '4': {
                        Id: 4,
                        EntityId: 51,
                        TransactionYearId: 100,
                        Foo: 'bar',
                    },
                },
            },
            '200': {
                '60': {
                    '5': {
                        Id: 5,
                        EntityId: 60,
                        TransactionYearId: 200,
                        Foo: 'new',
                    },
                    '6': {
                        Id: 6,
                        EntityId: 60,
                        TransactionYearId: 200,
                        Foo: 'bar',
                    },
                },
                '61': {
                    '7': {
                        Id: 7,
                        EntityId: 61,
                        TransactionYearId: 200,
                        Foo: 'bar',
                    },
                    '8': {
                        Id: 8,
                        EntityId: 61,
                        TransactionYearId: 200,
                        Foo: 'bar',
                    },
                },
            },
        })
    })

    // TODO Add more real usage cases
})

describe('deleteYearItemData', () => {
    test('deletes object', () => {
        expect(deleteYearItemData(yearGroupedState, 200, 3)).toStrictEqual({
            '100': {
                '1': { Id: 1, TransactionYearId: 100, Foo: 'bar' },
                '2': { Id: 2, TransactionYearId: 100, Foo: 'bar' },
            },
            '200': {
                '4': { Id: 4, TransactionYearId: 200, Foo: 'bar' },
            },
        })

        expect(deleteYearItemData(yearGroupedState, '100', '2')).toStrictEqual({
            '100': {
                '1': { Id: 1, TransactionYearId: 100, Foo: 'bar' },
            },
            '200': {
                '3': { Id: 3, TransactionYearId: 200, Foo: 'bar' },
                '4': { Id: 4, TransactionYearId: 200, Foo: 'bar' },
            },
        })
    })

    test('returns empty state for null input state', () => {
        expect(deleteYearItemData(null, 200, 3)).toStrictEqual({})
    })

    test('returns same state for incorrect keys', () => {
        expect(deleteYearItemData(yearGroupedState, 300, 3)).toStrictEqual(
            yearGroupedState
        )
    })
})

describe('getYearItem', () => {
    test('finds object by string or numeric key', () => {
        expect(getYearItem(yearGroupedState, 200, 3)).toStrictEqual({
            Id: 3,
            TransactionYearId: 200,
            Foo: 'bar',
        })

        expect(getYearItem(yearGroupedState, '100', '2')).toStrictEqual({
            Id: 2,
            TransactionYearId: 100,
            Foo: 'bar',
        })
    })

    test('does not find the object', () => {
        expect(getYearItem(yearGroupedState, 300, 3)).toBe(undefined)
    })
})
