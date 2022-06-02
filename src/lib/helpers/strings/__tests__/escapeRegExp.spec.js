import { escapeRegExp } from '../escapeRegExp'

describe('escapeRegExp', () => {
    test('adds escape symbols', () => {
        const unescaped = String.raw`foo([.*+?^$}{()|[\]\\])bar`
        const escaped = escapeRegExp(unescaped)
        expect(escaped).toBe(
            String.raw`foo\(\[\.\*\+\?\^\$\}\{\(\)\|\[\\\]\\\\\]\)bar`
        )
    })

    test('does not change string without symbols to escape', () => {
        const unescaped = 'foobar'
        const escaped = escapeRegExp(unescaped)
        expect(escaped === unescaped).toBeTruthy()
    })
})
