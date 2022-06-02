import { searchAndFilterProperties } from '../searchAndFilterProperties'

describe('searchAndFilterProperties', () => {
    test('returns false for null of undefined object', () => {
        expect(searchAndFilterProperties(undefined, 'foo', {})).toBe(false)
        expect(searchAndFilterProperties(null, 'foo', {})).toBe(false)
    })

    // TODO Make sense of this function and test it properly
})
