<template>
    <a-layout
        :initial-breadcrumbs="initialBreadcrumbs"
        :menu-collapsed="!menuSticky"
    >
        <!-- Menu -->
        <a-side-menu
            slot="menu"
            :sticky="menuSticky"
            @sticky:change="handleMenuStickyChange"
        >
        </a-side-menu>

        <!-- Generic popup modals -->
        <template slot="modals">
            <a-confirm
                ref="confirm"
            >
            </a-confirm>
            <a-info ref="info"></a-info>
        </template>
    </a-layout>
</template>

<script lang="ts">
import AibidiaAppLayout from 'components/shared/layout/AibidiaAppLayout/AibidiaAppLayout.vue'
import Confirm from 'components/shared/modal/Confirm.vue'
import Info from 'components/shared/modal/Info.vue'
import SideMenu from 'components/SideMenu/SideMenu.vue'
import { RootState } from 'store/root-store/modules'
import Vue from 'vue'
import { mapState } from 'vuex'

import type { Group } from 'types/Group'

interface Data {
    /** How main menu should be displayed. Should it be fixed full width or minimized and expand on hover */
    menuSticky: boolean
}

interface Methods {
    /** Change menu display mode */
    handleMenuStickyChange: (value: boolean) => void
}

interface Computed {
    /** First part of breadcrumbs consisting of group name */
    initialBreadcrumbs: string[]
}

/** Top-level page layout for all regular pages */
export default Vue.extend<Data, Methods, Computed, void>({
    name: 'AppContainer',

    components: {
        'a-layout': AibidiaAppLayout,
        'a-side-menu': SideMenu,
        'a-confirm': Confirm,
        'a-info': Info,
    },

    data() {
        return {
            menuSticky: false,
        }
    },

    computed: {
        initialBreadcrumbs(): string[] {
            return ['Aibidia']
        },
    },

    mounted() {
        // Map generic modals from this component to global Vue object
        Vue.prototype.$modals = {}
        Vue.prototype.$modals.confirm = this.$refs.confirm
        Vue.prototype.$modals.info = this.$refs.info
    },

    methods: {
        handleMenuStickyChange(value): void {
            this.menuSticky = value
        },
    },
})
</script>


<style lang="scss" scoped>
.header-items {
    margin-right: 0;
    position: relative;
}

@media only screen and (min-width: 769px) {
    .header-items {
        margin-right: calc(0.75rem + 4.5px);
    }
}
</style>
