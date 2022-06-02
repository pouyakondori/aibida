import { createGetByOptionalYear } from 'lib/api/helpers/createGetByOptionalYear'
import { RequestMaker } from 'lib/api/RequestMaker'

import type { DeleteById, GetByOptionalYear, Post, PutById } from 'types/crud'
import type { Resume } from 'types/Resume'

export interface ResumeEndpoint {
    get: GetByOptionalYear<Resume>
    post: Post<Resume>
    put: PutById<Resume>
    delete: DeleteById
}

let createResumeEndpoint = (requestMaker: RequestMaker): ResumeEndpoint => {
    return {
        get: async () => {
            const resumes = [
                {
                    ResumeId: 1,
                    ResumeCode: 'A1',
                    ResumeName: 'Applicant 1',
                    SortOrder: 0,
                },
            ]
            return resumes
        },
        post: async () => {
            throw new Error('Resume POST not implemented.')
        },
        put: async () => {
            throw new Error('Resume PUT not implemented.')
        },
        delete: async () => {
            throw new Error('Resume DELETE not implemented.')
        },
    }
}

// @ts-ignore
if (AIBIDIA_API_BASE_URL?.length) {
    createResumeEndpoint = function (
        requestMaker: RequestMaker
    ): ResumeEndpoint {
        const entity = 'resumes'

        return {
            get: createGetByOptionalYear(requestMaker, entity),
            post: dto => requestMaker.post(entity, dto),
            put: (id, dto) => requestMaker.put(`${entity}/${id}`, dto),
            delete: id => requestMaker.delete(`${entity}/${id}`),
        }
    }
}

export {
    createResumeEndpoint
}
