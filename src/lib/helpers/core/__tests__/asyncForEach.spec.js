import { asyncForEach } from '../asyncForEach'

describe('asyncForEach', () => {
    test('asynchronously does callbacks and populates test array', async () => {
        const result = []
        const inputData = ['foo', 'bar']
        const inputTransformer = (val, ind, arr) => {
            return new Promise(resolve =>
                setTimeout(() => {
                    result[ind] = val
                    resolve()
                }, 1)
            )
        }

        await asyncForEach(inputData, inputTransformer)
        expect(result).toEqual(['foo', 'bar'])
    })
})
