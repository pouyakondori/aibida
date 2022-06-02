import { saveFile } from '../saveFile'

describe('saveFile', () => {
    window.URL.createObjectURL = jest.fn()
    window.URL.revokeObjectURL = jest.fn()

    afterEach(() => {
        window.URL.createObjectURL.mockReset()
    })

    test('runs', () => {
        expect(() => {
            saveFile(new Blob(['foo', 'bar']), 'testFile')
        }).not.toThrow()
    })
})
