<template>
    <router-link
        class="aibidia-tab"
        :to="route"
        tag="li"
        active-class="is-active"
    >
        <a href="#">
            <slot />
        </a>
    </router-link>
</template>

<script lang="ts">
/**
 * Component to show tab as UL-list LI item.
 */
import Vue from 'vue'
import { RouteConfig } from 'vue-router'

interface Props {
    route: string | RouteConfig
}

export default Vue.extend<void, void, void, Props>({
    props: {
        route: {
            type: [String, Object],
            required: true,
        },
    },
})
</script>

<style lang="scss">
.main__content {
    > .aibidia-layout-pane {
        > .pane-header {
            margin-left: 0.6em;
            margin-right: 0.6em;
        }
    }
}
</style>
