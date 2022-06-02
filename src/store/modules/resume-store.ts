import Vue from 'vue'
import { Module } from 'vuex'
import { RootState } from '../root-store/modules'

import { getErrorMsgAndType } from 'lib/helpers'
import { ErrorMessageActions } from 'misc/constants'
import { Resume, ResumeExtended } from 'types/Resume'
import {
    createActionAsync,
    deleteActionAsync,
    updateActionAsync,
} from 'store/helpers/action-creator'
import { createMutations } from 'store/helpers/createMutations'
import { updateData } from 'store/helpers/mutation-helper'
import { mutationTypeCreator } from 'store/helpers/mutation-type-creator'
import { AppActions } from 'store/modules/app-store'

export interface ResumeState {
    resumes: Record<number, Resume> | null,
    loading: boolean,
    updateStatus: string | null,
}

// MUTATIONS
const FetchResumes = mutationTypeCreator('FETCH_RESUMES')
const CreateResume = mutationTypeCreator('CREATE_RESUME')
const UpdateResume = mutationTypeCreator('UPDATE_RESUME')
const DeleteResume = mutationTypeCreator('DELETE_RESUME')
const SetResumeUpdateStatus = 'SET_RESUME_UPDATE_STATUS'
export const SaveResume = 'SAVE_RESUME'

// ACTIONS
export enum ResumeActions {
    Fetch = 'FetchResumesAsync',
    Create = 'CreateResumeAsync',
    Update = 'UpdateResumeAsync',
    Delete = 'DeleteResumeAsync',
}

const mapDTO = (dto: Resume): ResumeExtended => {
    if (dto) {
        return {
            ...dto,
            User: null,
        }
    }

    return dto
}

export const moduleName = 'resumes'
export const resumes: Module<ResumeState, RootState> = {
    state: {
        // Object to hold all products
        // {
        //     <id> : {<actual object>},
        //     ....
        // }
        resumes: null,
        loading: false,
        updateStatus: null,
    },

    mutations: {
        ...createMutations(
            [
                FetchResumes.Pending,
                CreateResume.Pending,
                UpdateResume.Pending,
                DeleteResume.Pending,
            ],
            (state: ResumeState) => {
                state.loading = true
            }
        ),

        [FetchResumes.Success](state, data) {
            state.resumes = updateData(state.resumes, data, 'ResumeId')

            state.loading = false
        },

        [UpdateResume.Success](state, data) {
            state.resumes = {
                ...state.resumes,
                [data.ResumeId]: data,
            }

            state.loading = false
        },

        [CreateResume.Success](state, data) {
            if (!state.resumes) {
                state.resumes = {}
            }

            state.resumes = {
                ...state.resumes,
                [data.ResumeId]: data,
            }

            state.loading = false
        },

        [DeleteResume.Success](state, dto) {
            if (!state.resumes) {
                state.loading = false
                return
            }
            delete state.resumes[dto.ResumeId]
            state.resumes = { ...state.resumes }
            state.loading = false
        },

        ...createMutations(
            [
                FetchResumes.Error,
                CreateResume.Error,
                UpdateResume.Error,
                DeleteResume.Error,
            ],
            (state, error) => {
                console.log('error', error)
                // Do what ever you like with the error
                state.loading = false
            }
        ),

        [SaveResume](state, data) {
            state.resumes = {
                ...state.resumes,
                [data.ResumeId]: data,
            }
        },

        [SetResumeUpdateStatus](state, status) {
            state.updateStatus = status
        },
    },

    getters: {
        getResumes: state => (sort = false) => {
            let resumesArray: Resume[] | null= []

            const resumes = state.resumes
            if (!resumes) {
                return []
            }

            resumesArray =
                Object.keys(resumes).map(key => {
                    const entity = resumes[parseInt(key)]

                    return {
                        ...entity,
                    }
                })

            if (sort) {
                resumesArray =
                    (resumesArray &&
                        resumesArray.sort((a, b) =>
                            a?.ResumeName?.localeCompare(b?.ResumeName)
                        )) ||
                    []
            }

            return resumesArray
        },

        getResumeById: state => (id: number) => {
            const entity = (state.resumes && state.resumes[id]) || null

            if (entity) {
                return {
                    ...entity,
                }
            }

            return entity
        },

        getResumeLoading: state => {
            return state.resumes == null && state.loading
        },

        getResumeUpdateStatus: state => {
            return state.updateStatus
        },
    },

    actions: {
        [ResumeActions.Fetch]: async function ({
            dispatch,
            commit,
            getters,
            rootGetters,
        }) {
            commit(FetchResumes.Pending)
            try {
                const data = await Vue.prototype.$hmApi.resume.get(null)
                commit(FetchResumes.Success, data)
            } catch (error) {
                dispatch(
                    AppActions.SetMsgAndShowSnackbar,
                    getErrorMsgAndType(
                        error,
                        'Resumes',
                        ErrorMessageActions.Fetch
                    )
                )

                commit(FetchResumes.Error, error)
            }
        },

        [ResumeActions.Create]: async function (context, payload) {
            return await createActionAsync(
                context,
                payload,
                (dto: Resume) =>
                    Vue.prototype.$hmApi.resume.post(dto),
                CreateResume,
                'Resume',
                SetResumeUpdateStatus,
                ResumeActions.Fetch
            )
        },

        [ResumeActions.Update]: async function (context, payload) {
            return await updateActionAsync(
                context,
                payload,
                (dto: Resume) =>
                    Vue.prototype.$hmApi.resume.put(dto.ResumeId, dto),
                UpdateResume,
                'Resume',
                SetResumeUpdateStatus,
                ResumeActions.Fetch,
                true
            )
        },

        [ResumeActions.Delete]: async function (
            context,
            { payload }
        ) {
            const mutation = DeleteResume

            let endpoint = (dto: Resume) =>
                Vue.prototype.$hmApi.resume.delete(
                    dto.ResumeId
                )

            return await deleteActionAsync(
                context,
                payload,
                endpoint,
                mutation,
                'Resume',
                SetResumeUpdateStatus,
                ResumeActions.Fetch,
                true
            )
        },
    },
}
