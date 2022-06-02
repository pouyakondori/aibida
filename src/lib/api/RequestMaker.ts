import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { setPartnerHeader } from 'lib/api/helpers/setPartnerHeader'
import { logActionDuration } from 'lib/helpers/core/logActionDuration'
import { AuthenticationContext } from 'vue-adal'

/**
 * Axios headers
 */
type Headers = Record<string, string>

/**
 * Communicates with backend API tm, both for Microsoft authentication and Aibidia own API
 */
export class RequestMaker {
    /** Uri for Aibidia API */
    readonly #apiBaseUri: string
    /** Uri for acquiring token from Microsoft */
    readonly #apiResourceUri: string

    /**
     * @param apiBaseUri Uri for Aibidia API
     * @param apiResourceUri Uri for acquiring token from Microsoft
     */
    constructor(apiBaseUri: string, apiResourceUri: string) {
        this.#apiBaseUri = apiBaseUri
        this.#apiResourceUri = apiResourceUri
    }

    /**
     * Make asynchronous GET request to Aibidia API using Axios
     * @param endpoint Endpoint to call with GET request
     * @param options Additional options to pass to Axios
     */
    async get<T>(endpoint: string, options?: AxiosRequestConfig): Promise<T> {
        const trackerStart = performance.now()
        const headers = await this.prepareHeaders()
        const optionsWithAuthHeader = options
            ? Object.assign(options, { headers })
            : { headers }

        const resp = Axios.get<T>(
            `${this.#apiBaseUri}/${endpoint}`,
            optionsWithAuthHeader
        )

        return this.attachRespHandlers(resp, [trackerStart, `GET ${endpoint}`])
    }

    /**
     * Make asynchronous POST request using Axios
     * @param endpoint Endpoint to call with POST request
     * @param obj The object to POST
     * @param additionalHeaders Additional headers to pass to Axios
     */
    async post<K, T>(
        endpoint: string,
        obj?: T,
        additionalHeaders?: Headers
    ): Promise<K> {
        const trackerStart = performance.now()
        const headers = await this.prepareHeaders()

        if (additionalHeaders) {
            Object.entries(additionalHeaders).forEach(
                ([key, value]) => (headers[key] = value)
            )
        }

        const resp = Axios.post<K>(`${this.#apiBaseUri}/${endpoint}`, obj, {
            headers,
        })

        return this.attachRespHandlers(resp, [trackerStart, `POST ${endpoint}`])
    }

    /**
     * Make asynchronous DELETE request using Axios
     * @param endpoint Endpoint to call with DELETE request
     */
    async delete<T>(endpoint: string): Promise<T> {
        const trackerStart = performance.now()
        const headers = await this.prepareHeaders()
        const resp = Axios.delete<T>(`${this.#apiBaseUri}/${endpoint}`, {
            headers,
        })

        return this.attachRespHandlers(resp, [
            trackerStart,
            `DELETE ${endpoint}`,
        ])
    }

    /**
     * Make asynchronous PUT request using Axios
     * @param endpoint Endpoint to call with PUT request
     * @param obj The object to PUT
     */
    async put<K, T>(endpoint: string, obj?: T): Promise<K> {
        const trackerStart = performance.now()
        const headers = await this.prepareHeaders()
        const resp = Axios.put<K>(`${this.#apiBaseUri}/${endpoint}`, obj, {
            headers,
        })

        return this.attachRespHandlers(resp, [trackerStart, `PUT ${endpoint}`])
    }

    /**
     * Composes HTTP headers from auth token and partner id
     */
    private async prepareHeaders(): Promise<Headers> {
        return setPartnerHeader({ Authorization: `Bearer NULL` })
    }

    /**
     * Attaches result processing handlers to Axios response
     *
     * @param resp Axios response
     * @param tracker Tracker tuple with request start timestamp and logger message
     */
    private attachRespHandlers<T>(
        resp: Promise<AxiosResponse<T>>,
        tracker?: [startTimestamp: number, event: string]
    ): Promise<T> {
        return resp
            .then(resp => {
                if (tracker) {
                    const trackerEnd = performance.now()
                    logActionDuration([tracker[0], trackerEnd], tracker[1])
                }

                return resp.data
            })
            .catch(resp => {
                throw resp.response
            })
    }
}
