<template>
    <div
        class="aibidia-tabs tabs is-small is-boxed is-fullwidth is-bordered"
    >
        <ul>
            <slot />
        </ul>
    </div>
</template>

<script lang="ts">
/**
 * Component to show tabs as UL-list from links array. On analytics tabs, there is additional refresh icon to reloads the page data.
 */
import { eventBus } from 'src/main'
import { TabEvents } from 'misc/constants'
import Vue from 'vue'

import type { Link } from 'types/Link'

interface Methods {
    reloadPage: () => void
    checkPage: (link: Link) => void
}

interface Props {
    links: Link[]
    isAnalytics: boolean
}

export default Vue.extend<void, Methods, void, Props>({
    props: {
        links: {
            type: Array,
            default: null,
        },
        isAnalytics: {
            type: Boolean,
        },
    },

    methods: {
        reloadPage(): void {
            eventBus.$emit(TabEvents.Refresh)
        },

        checkPage(link: Link): boolean {
            return link.route === this.$route.fullPath
        },
    },
})
</script>

<style lang="scss">
.page-tabs {
    &.depth-8 > ul {
        border-bottom: 0;

        > li {
            &:first-child {
                margin-left: 0.6em;
            }
            &:last-child {
                margin-right: 0.6em;
            }
            > a {
                box-shadow: 0 3.2px 7.2px 0 rgba(0, 0, 0, 0.132),
                    0 0.6px 1.8px 0 rgba(0, 0, 0, 0.108);
            }
        }
    }
}
</style>
