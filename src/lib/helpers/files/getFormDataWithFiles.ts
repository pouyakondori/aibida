import { MaximumFileSize } from 'misc/constants'

interface ValidatedForm {
    validAttachmentFormData: FormData[]
    invalidAttachmentErrors: AttachmentError[]
}

interface AttachmentError {
    attachment: Blob | File
    error: string
}

/**
 * Makes sure attachment form data size does not exceed maximum
 * file size, which at the moment is 20MB.
 * @param attachments Files for checking
 */
export function getFormDataWithFiles(attachments: FileList): ValidatedForm {
    // Iterate files
    const validAttachmentFormData: FormData[] = []
    const invalidAttachmentErrors: AttachmentError[] = []

    let formData = new FormData()
    let attachmentSize = 0

    Object.keys(attachments).forEach((key: any) => {
        const att = attachments[key]

        if (att.size > MaximumFileSize.byte) {
            const byteToMB = 1024 * 1024
            const fileSizeInMB = (att.size / byteToMB).toFixed(2)
            const attachmentError = {
                attachment: att,
                error: `${att.name} ${fileSizeInMB}MB`,
            }

            invalidAttachmentErrors.push(attachmentError)
        } else if (att.size + attachmentSize < MaximumFileSize.byte) {
            // Check size of existing files and either add to existing formData or add new
            formData.append(att.name, att, att.name)
            attachmentSize += att.size
        } else {
            validAttachmentFormData.push(formData)
            formData = new FormData()
            formData.append(att.name, att, att.name)
            attachmentSize = att.size
        }
    })

    !!attachmentSize && validAttachmentFormData.push(formData)

    return {
        validAttachmentFormData,
        invalidAttachmentErrors,
    }
}
