import { createTmpId } from '../createTmpId'

describe('createTempId', () => {
    test('gives two different non empty strings with two calls', () => {
        const id1 = createTmpId()
        const id2 = createTmpId()
        expect(id1).toBeTruthy()
        expect(id2).toBeTruthy()
        expect(id1 === id2).toBeFalsy()
    })
})
