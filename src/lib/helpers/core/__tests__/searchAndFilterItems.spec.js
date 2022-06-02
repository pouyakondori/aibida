import { searchAndFilterItems } from '../searchAndFilterItems'

describe('searchAndFilterItems', () => {
    test('numeric filter is true when filter and items intersect, query is not found', () => {
        const items = [2, 3, 10, 20, 30]
        const query = 'foo'
        const filter = {
            max: 120,
            min: 25,
        }

        expect(searchAndFilterItems(items, query, filter)).toStrictEqual({
            itemsMatch: false,
            filterResult: true,
        })
    })

    test('numeric filter is false when filter and items do not intersect, query is found', () => {
        const items = [2, 3, 10, 20, 30]
        const query = '10'
        const filter = {
            max: 120,
            min: 50,
        }

        expect(searchAndFilterItems(items, query, filter)).toStrictEqual({
            itemsMatch: true,
            filterResult: false,
        })
    })

    test('finds substrings', () => {
        const items = ['Aibidia', 'Greatest', 'Company']
        const query = 'eate'
        const filter = 'mpan'
        expect(searchAndFilterItems(items, query, filter)).toStrictEqual({
            itemsMatch: true,
            filterResult: true,
        })
    })

    test('returns all false for empty items and non empty filter', () => {
        const items = []
        const query = 'foo'
        const filter = 'bar'
        expect(searchAndFilterItems(items, query, filter)).toStrictEqual({
            itemsMatch: false,
            filterResult: false,
        })
    })

    test('returns positive filter result for empty items and empty filter', () => {
        const items = []
        const query = 'foo'
        const filter = ''
        expect(searchAndFilterItems(items, query, filter)).toStrictEqual({
            itemsMatch: false,
            filterResult: true,
        })
    })
})
