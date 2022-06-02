import { RequestMaker } from './RequestMaker'
import { createResumeEndpoint } from './endpoints/hm/createResumeEndpoint'
import type { HmApi } from 'types/Api'

/**
 * Creates API endpoints for Homework
 * @param apiBaseUri Uri for Aibidia API
 */
export default function createHmApi(apiBaseUri: string): HmApi {
    const requestMaker = new RequestMaker(apiBaseUri, '')

    return {
        resume: createResumeEndpoint(requestMaker),
    }
}
