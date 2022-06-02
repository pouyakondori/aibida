import { mutationTypeCreator } from '../mutation-type-creator'

describe('mutationTypeCreator', () => {
    test('constructs object of accepted structure', () => {
        expect(mutationTypeCreator('foo')).toStrictEqual({
            Pending: 'foo',
            Success: 'foo_SUCCESS',
            Error: 'foo_ERROR',
        })
    })
})
