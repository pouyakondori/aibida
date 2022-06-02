import { coalesce } from '../coalesce'

describe('coalesce', () => {
    test('returns first argument', () => {
        expect(coalesce({}, 'foo')).toStrictEqual({})
        expect(coalesce(0, 'foo')).toBe(0)
        expect(coalesce('', 'foo')).toBe('')
        expect(coalesce(false, 'foo')).toBe(false)
        expect(coalesce('aibidia', 'foo')).toBe('aibidia')
    })

    test('returns last argument', () => {
        expect(coalesce(null, 'foo')).toBe('foo')
        expect(coalesce(undefined, 'foo')).toBe('foo')
    })
})
