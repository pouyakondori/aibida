import { createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import { resumes } from '../resume-store'
import { clone } from 'ramda'

const prepareStore = () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    return new Vuex.Store(clone(resumes))
}

const mockApi = () => {
    Vue.prototype.$hmApi = {
        resume: {
            get: jest.fn(() => [
                { ResumeId: 1, ResumeCode: 'a1', ResumeName: 'Applicant 1' },
                { ResumeId: 2, ResumeCode: 'a2', ResumeName: 'French applicant' },
            ]),
        },
    }
}

test('SET_RESUMES mutation', () => {
    const store = prepareStore()
    expect(store.state.resumes).toEqual([])
    store.commit('SET_RESUMES', [
        { ResumeId: 1, ResumeCode: 'a1', ResumeName: 'Applicant 1' },
        { ResumeId: 2, ResumeCode: 'a2', ResumeName: 'French applicant' },
    ])

    expect(store.state.resumes).toStrictEqual([
        { ResumeId: 1, ResumeCode: 'a1', ResumeName: 'Applicant 1' },
        { ResumeId: 2, ResumeCode: 'a2', ResumeName: 'French applicant' },
    ])
})

test('getResumeById getter', () => {
    const mockState = {
        resumes: [
            { ResumeId: 1, ResumeCode: 'a1', ResumeName: 'Applicant 1' },
            { ResumeId: 2, ResumeCode: 'a2', ResumeName: 'French applicant' },
        ],
    }

    expect(resumes.getters.getResumeById(mockState)(2)).toStrictEqual({
        ResumeId: 2,
        ResumeCode: 'a2',
        ResumeName: 'French applicant',
    })

    expect(resumes.getters.getResumeById(mockState)(3)).toBe(null)
})

test('FetchResumesAsync action', async () => {
    const store = prepareStore()
    mockApi()

    expect(store.state.resumes).toEqual([])

    await store.dispatch('FetchResumesAsync')

    expect(store.state.resumes).toEqual([
        { ResumeId: 1, ResumeCode: 'a1', ResumeName: 'Applicant 1' },
        { ResumeId: 2, ResumeCode: 'a2', ResumeName: 'French applicant' },
    ])
})
