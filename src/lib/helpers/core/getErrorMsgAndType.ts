import { SnackbarTypes } from 'misc/constants'

type ErrorMsgAndType = {
    snackbarMsg: string
    snackbarType: string
}

/**
 * Extracts and reorganizes error data
 * @param error Original error
 * @param type Error type
 * @param action Error message action
 */
export function getErrorMsgAndType(
    error: any,
    type: string,
    action: string
): ErrorMsgAndType {
    let msg = 'Unexpected error'

    const handleErrorData = (errorData: any): string => {
        if (errorData.ModelState) {
            const rows = Object.keys(errorData.ModelState).map(
                key => errorData.ModelState[key]
            )

            return `${type}: ${rows.join('; ')}`
        }

        if (errorData.Message) {
            return errorData.Message
        }

        return `Unexpected error in ${action} ${type.toLowerCase()}.`
    }

    if (error instanceof Error) {
        throw error
    }

    if (error) {
        switch (error.status) {
            case 404:
                msg = `${type} not found.`
                break
            case 415:
                msg = `${error.statusText}. ${error.data}`
                break
            default:
                if (error.data) {
                    msg = handleErrorData(error.data)
                } else if (error.statusText) {
                    msg = error.statusText
                } else if (error.message) {
                    msg = error.message
                } else {
                    msg = JSON.stringify(error)
                }

                break
        }
    }

    return {
        snackbarMsg: msg,
        snackbarType: SnackbarTypes.Error,
    }
}
