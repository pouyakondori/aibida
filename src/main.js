import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/css/fontawesome.css'
import Buefy from 'buefy'
import 'components/shared/AibidiaVueLibrary.ts'
import Breadcrumb from 'components/shared/Breadcrumb/Breadcrumb.vue'
import createHmApi from 'lib/api/createHmApi'
import { routes } from 'misc/routes'
import store, { InitialiseStore } from 'store/index'
import { AppMutations } from 'store/modules/app-store'
import Vue from 'vue'
import VueBreadcrumbs from 'vue-breadcrumbs'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import '../node_modules/vue-multiselect/dist/vue-multiselect.min.css'
import App from './App.ts.vue'

require('./assets/sass/aibidia.scss')
require('./assets/Favicon2.png')

if (process.env.NODE_ENV === 'production') {
    console.log = function () {}
}
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueBreadcrumbs, { template: Breadcrumb })

const router = new VueRouter({
    routes: routes,
    linkActiveClass: 'router-link-active is-active',
    linkExactActiveClass: 'router-link-exact-active is-active',
})

Vue.use(Buefy, {
    defaultIconPack: 'fas',
})

Vue.prototype.$hmApi = createHmApi(AIBIDIA_API_BASE_URL)

export const eventBus = new Vue()

const storeInstance = new Vuex.Store(store)

// Subscribe to mutations and persist the states of
// user selected year and placeholder columns to Local Storage
storeInstance.subscribe((mutation, state) => {
    switch (mutation.type) {
        case AppMutations.SET_MENU_STICKY_STATE:
            localStorage.setItem(
                'AIBIDIA_TM_MENU_STICKY',
                JSON.stringify(state.app.menuIsSticky)
            )

            break
        default:
            break
    }
})

new Vue({
    el: '#hm',
    router,
    store: storeInstance,
    beforeCreate() {
        this.$store.commit(InitialiseStore)
    },
    render: h => h(App),
})
