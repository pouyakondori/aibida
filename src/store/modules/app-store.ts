import { Module } from 'vuex'
import { RootState } from '../root-store/modules'

export interface AppState {
    snackbarVisible: boolean
    snackbarMsg: string | null
    snackbarType: string | null
    menuIsSticky: boolean
}

export enum AppMutations {
    SET_SNACKBAR_MESSAGE = 'SET_SNACKBAR_MESSAGE',
    SHOW_SNACKBAR = 'SHOW_SNACKBAR',
    SET_SNACKBAR_TYPE = 'SET_SNACKBAR_TYPE',
    SET_MENU_STICKY_STATE = 'SET_MENU_STICKY_STATE',
}

export enum AppActions {
    SetMsgAndShowSnackbar = 'SetMsgAndShowSnackbar',
}

/** Vuex module for sharing global application-level things used by numerous components */
export const app: Module<AppState, RootState> = {
    state: {
        /** Should popup be shown at the moment */
        snackbarVisible: false,
        /** Popup text message */
        snackbarMsg: null,
        /** Popup type */
        snackbarType: null,

        /** Should menu be sticky */
        menuIsSticky: true,
    },

    mutations: {
        [AppMutations.SET_SNACKBAR_MESSAGE](state, snackbarMsg: string): void {
            state.snackbarMsg = snackbarMsg
        },

        [AppMutations.SHOW_SNACKBAR](state, show: boolean): void {
            state.snackbarVisible = show
        },

        [AppMutations.SET_SNACKBAR_TYPE](state, snackbarType: string): void {
            state.snackbarType = snackbarType
        },

        [AppMutations.SET_MENU_STICKY_STATE](state, value: boolean): void {
            state.menuIsSticky = value
        },
    },

    actions: {
        /** Initializes popup input and shows it with later automatic hiding */
        [AppActions.SetMsgAndShowSnackbar](
            { commit },
            { snackbarMsg, snackbarType }
        ): void {
            commit(AppMutations.SET_SNACKBAR_MESSAGE, snackbarMsg)
            commit(AppMutations.SET_SNACKBAR_TYPE, snackbarType)
            commit(AppMutations.SHOW_SNACKBAR, true)

            // Automatically hide popup after some time
            setTimeout(() => {
                commit(AppMutations.SHOW_SNACKBAR, false)
            }, 8000)
        },
    },
}
