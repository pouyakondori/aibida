import { setTmpIdToObjects } from '../setTmpIdToObjects'

describe('setTmpIdToObjects', () => {
    test('gives new property with non empty id', () => {
        const input = [
            {
                foo: 'foo',
            },
            {
                bar: 'bar',
            },
        ]

        const result = setTmpIdToObjects(input)

        expect(result).toHaveLength(2)
        expect(result[0]).toHaveProperty('TmpId')
        expect(result[1]).toHaveProperty('TmpId')
        expect(result[0].TmpId).toBeDefined()
        expect(result[1].TmpId).toBeDefined()
    })
})
