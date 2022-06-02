import { getFormDataWithFiles } from '../getFormDataWithFiles'

describe('getFormDataWithFiles', () => {
    test('successfully adds two attachments', () => {
        const file = new File(Array.from('file contents'), 'filename.txt', {
            type: 'text/plain',
            lastModified: new Date(),
        })

        const fileList = {
            0: file,
            1: file,
        }

        const result = getFormDataWithFiles(fileList)

        expect(
            result.validAttachmentFormData[0].getAll('filename.txt')
        ).toHaveLength(2)
    })
})
