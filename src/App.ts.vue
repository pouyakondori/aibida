<template>
    <div id="hm">
        <app-loader
            v-if="isLoading"
            :message="appLoadingMessage"
        ></app-loader>
        <router-view
            v-if="loggedIn"
            v-show="!isLoading"
        ></router-view>
    </div>
</template>

<script lang="ts">
import AppLoader from 'components/AppLoader/AppLoader.ts.vue'
import { PromiseRepeater } from 'lib/helpers/core/PromiseRepeater'
import { AppLoadingMessages } from 'misc/constants'
import { RootState } from 'store/root-store/modules'
import Vue from 'vue'
import { mapState } from 'vuex'
import { ResumeActions } from 'store/modules/resume-store'
import type { RouterOptions, VueRouter } from 'vue-router/types/router'

interface Data {
    /** Message shown on global loader screen */
    appLoadingMessage: AppLoadingMessages
    /** Should global loader be shown */
    isLoading: boolean
    /** Is user logged in? */
    loggedIn: boolean
}

interface Methods {
    /** Simulates login and returns true when done */
    simulateLogin: () => Promise<boolean>
}

interface Computed {
    /** Is user authenticated using ADAL */
    isAuthenticated: boolean
}

interface RouterExtended extends VueRouter {
    options: RouterOptions
}

export default Vue.extend<Data, Methods, Computed, void>({
    name: 'App',

    components: {
        'app-loader': AppLoader,
    },

    data() {
        return {
            appLoadingMessage: AppLoadingMessages.Loading,
            isLoading: true,
            loggedIn: false
        }
    },

    computed: {
        isAuthenticated() {
            return false
        },
    },

    async mounted() {
        this.isLoading = true

        // Requesting all global data in parallel with retry logic
        try {
            if (!this.loggedIn) {
                await this.simulateLogin()
            }

            await new PromiseRepeater().queryAll([
                () => this.$store.dispatch(ResumeActions.Fetch),
            ])

            this.isLoading = false
        } catch (err) {
            this.appLoadingMessage = AppLoadingMessages.Error
        }
    },

    methods: {
        async simulateLogin() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.loggedIn = true
                    resolve(true)
                }, 2500)
            })
        }
    },
})
</script>
