import { signalError } from '../signalError'
import { ErrorMessageActions } from 'misc/constants'

describe('signalError', () => {
    test('calls action and waits for it to return nothing', async () => {
        const dispatch = jest.fn(
            (snackbar, errObj) => new Promise(res => res(errObj))
        )

        global.console = {
            log: jest.fn(), // console.log are ignored in tests
        }

        const res = await signalError(
            dispatch,
            'error',
            'subject',
            ErrorMessageActions.Fetch
        )

        expect(dispatch).toHaveBeenCalled()
        expect(res).toBe(undefined)
    })
})
