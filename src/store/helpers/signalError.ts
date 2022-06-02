import { getErrorMsgAndType } from 'lib/helpers/core/getErrorMsgAndType'
import { ErrorMessageActions } from 'misc/constants'
import { AppActions } from 'store/modules/app-store'
import { Dispatch } from 'vuex'

/**
 * Reports API operations errors to the UI and console
 *
 * @param dispatch Dispatches vuex action for showing error in the UI
 * @param error API operation error
 * @param subject Entity name, like year or currency, to include in the report
 * @param errMsgAction Error context, like retrieving on inserting data, to include in the report
 */
export async function signalError(
    dispatch: Dispatch,
    error: unknown,
    subject: string,
    errMsgAction: ErrorMessageActions
): Promise<void> {
    await dispatch(
        AppActions.SetMsgAndShowSnackbar,
        getErrorMsgAndType(error, subject, errMsgAction)
    )

    console.log(`Error while ${errMsgAction} ${subject}: `, error)

    return void 0
}
