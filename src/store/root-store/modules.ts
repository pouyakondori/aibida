import { app, AppState } from '../modules/app-store'
import { resumes, ResumeState } from '../modules/resume-store'

export const modules = {
    app,
    resumes,
}

export interface RootState {
    app: AppState
    resumes: ResumeState
}
