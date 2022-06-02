/**
 * Saves a file to the user's device
 * @param file File to be saved
 * @param name Name of the file to be saved
 */
export function saveFile(file: Blob | File, name: string): void {
    // For MS support
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(file, name)
        return
    }

    const fileUrl = URL.createObjectURL(file)

    const link = document.createElement('a')
    link.download = name
    link.href = fileUrl
    document.body.appendChild(link)

    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(fileUrl)
}
