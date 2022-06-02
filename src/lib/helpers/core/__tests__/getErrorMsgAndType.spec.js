import { getErrorMsgAndType } from '../getErrorMsgAndType'

describe('getErrorMsgAndType', () => {
    test('returns 404 error', () => {
        const inputError = {
            status: 404,
            data: {
                Message: 'bad error',
            },
        }

        expect(getErrorMsgAndType(inputError, 'foo', 'bar')).toStrictEqual({
            snackbarMsg: 'foo not found.',
            snackbarType: 'Error',
        })
    })

    test('returns 415 error', () => {
        const inputError = {
            status: 415,
            statusText: 'Unsupported Media Type',
            data: 'Supported types: pdf, docx, jpg.',
        }

        expect(getErrorMsgAndType(inputError, 'att', 'upsert')).toStrictEqual({
            snackbarMsg: 'Unsupported Media Type. Supported types: pdf, docx, jpg.',
            snackbarType: 'Error',
        })
    })

    test('just throws by proxying the error', () => {
        expect(() => {
            getErrorMsgAndType(new Error('bad error'), 'foo', 'bar')
        }).toThrow('bad error')
    })

    test('returns unrecognized error as stringified', () => {
        const inputError = {
            foo: 'bar',
        }

        expect(getErrorMsgAndType(inputError, 'foo', 'bar')).toStrictEqual({
            snackbarMsg: '{"foo":"bar"}',
            snackbarType: 'Error',
        })
    })

    test('constructs error based on model state', () => {
        const inputError = {
            data: {
                ModelState: {
                    foo: 'bar',
                    sun: 'star',
                },
            },
        }

        expect(
            getErrorMsgAndType(inputError, 'simpleType', 'simpleAction')
        ).toStrictEqual({
            snackbarMsg: 'simpleType: bar; star',
            snackbarType: 'Error',
        })
    })

    test('constructs error based on simple message', () => {
        const inputError = {
            data: {
                Message: 'foo',
            },
        }

        expect(
            getErrorMsgAndType(inputError, 'simpleType', 'simpleAction')
        ).toStrictEqual({
            snackbarMsg: 'foo',
            snackbarType: 'Error',
        })
    })

    test('constructs unrecognized error (but does not throw because data key was still provided', () => {
        const inputError = {
            data: {
                message: 'foo',
            },
        }

        expect(
            getErrorMsgAndType(inputError, 'simpleType', 'simpleAction')
        ).toStrictEqual({
            snackbarMsg: 'Unexpected error in simpleAction simpletype.',
            snackbarType: 'Error',
        })
    })
})
