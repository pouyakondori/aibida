import { createMutations } from '../createMutations'

describe('createMutations', () => {
    test('constructs mutation functions', async () => {
        const mutationFunc = () => void 0
        const res = await createMutations(['foo', 'bar'], mutationFunc)
        expect(res).toStrictEqual({
            foo: mutationFunc,
            bar: mutationFunc,
        })
    })
})
