import { Route } from 'vue-router'

import type { HmApi } from 'types/Api'

declare module 'vue/types/vue' {
    interface Vue {
        $route: Route
        $hmApi: HmApi
        $modals: {
            confirm: {
                delete: (options: unknown) => Promise<boolean>
                okcancel: (options: unknown) => Promise<boolean>
                warning: (options: unknown) => Promise<boolean>
            }
            info: {
                show: (options: unknown) => Promise<boolean>
            }
            edit: {
                crud: (
                    options: unknown
                ) => Promise<boolean> | Promise<Record<string, any>>
            }
        }
    }
}
