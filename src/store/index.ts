import { modules } from './root-store/modules'
import { INITIALISE_STORE } from './root-store/mutations'

export const InitialiseStore = 'INITIALISE_STORE'

export default {
    modules,
    mutations: {
        // This only called from beforeCreate hook of the application
        [InitialiseStore]: INITIALISE_STORE,
    },
    strict: process.env.NODE_ENV !== 'production',
}
