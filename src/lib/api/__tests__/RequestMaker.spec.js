import Axios from 'axios'

import { RequestMaker } from '../RequestMaker'

jest.mock('axios')

describe('RequestMaker', () => {

    test('does GET', async () => {
        const rawData = [{ foo: 1 }, { foo: 2 }]
        const inputData = { data: rawData }
        Axios.get.mockImplementation(() => Promise.resolve(inputData))

        const requestMaker = new RequestMaker('foo', 'bar')
        const result = requestMaker.get('foo')
        await expect(result).resolves.toEqual(rawData)
    })

    test('does POST', async () => {
        Axios.post.mockImplementation(() => Promise.resolve({ data: null }))
        const requestMaker = new RequestMaker('foo', 'bar')
        const result = requestMaker.post('foo')
        await expect(result).resolves.toBe(null)
    })

    test('does PUT', async () => {
        Axios.put.mockImplementation(() => Promise.resolve({ data: null }))
        const requestMaker = new RequestMaker('foo', 'bar')
        const result = requestMaker.put('foo')
        await expect(result).resolves.toBe(null)
    })

    test('does DELETE', async () => {
        Axios.delete.mockImplementation(() => Promise.resolve({ data: null }))
        const requestMaker = new RequestMaker('foo', 'bar')
        const result = requestMaker.delete('foo')
        await expect(result).resolves.toBe(null)
    })

    test('throws an error', async () => {
        Axios.delete.mockImplementationOnce(() =>
            Promise.reject({ response: 'error' })
        )

        const requestMaker = new RequestMaker('foo', 'bar')
        const result = requestMaker.delete('foo')
        await expect(result).rejects.toEqual('error')
    })
})
