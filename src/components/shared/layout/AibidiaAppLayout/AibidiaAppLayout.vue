<template>
    <main class="main is-size-7">
        <slot name="app-loader" />
        <slot name="menu" />
        <a-pane
            class="main-layout"
            :class="{'menu--collapsed' : menuCollapsed}"
        >
            <template #header>
                <breadcrumb
                    :placeholders="[]"
                    :initial-breadcrumbs="initialBreadcrumbs"
                >
                </breadcrumb>
                <slot name="header-slot" />
            </template>
            <template #content>
                <router-view></router-view>
                <a-snackbar></a-snackbar>
            </template>
        </a-pane>
        <slot
            v-if="$slots.modals"
            name="modals"
        />
    </main>
</template>

<script>
import Breadcrumb from 'components/shared/Breadcrumb/Breadcrumb.vue'
import AibidiaSnackbar from 'components/shared/snackbar/AibidiaSnackbar.vue'

/**
 * This is main application layout component. Splitting the app to menu and main content, displaying breadcrumb and snackbar.
 * It also allows to collect all permanently created modals to cleanly after div to prevent z-indexing issues.
 */
export default {
    components: {
        'a-snackbar': AibidiaSnackbar,
        breadcrumb: Breadcrumb,
    },

    props: {
        /**
         * Initial list of breadcrumbs. Passed to breadcrumb component.
         */
        initialBreadcrumbs: {
            type: Array,
            default: () => {
                return []
            },
        },
        /**
         * If menu is in collapsed state or not.
         * If menu is collapsed,
         *      option positions the menu over the content,
         * else
         *      move the content right, so that it is not under the menu.
         */
        menuCollapsed: {
            type: Boolean,
            default: false,
        },
    },
}
</script>

<style lang="scss">
// Import Bulma's core
@import '~@/assets/sass/color.scss';
@import '~bulma/sass/utilities/_all';

html {
    height: 100vh;
}

main {
    display: flex;
    flex-direction: column;
    height: 100vh;

    > .main-layout {
        flex-grow: 1;
        padding: 0;

        > .a-header {
            display: flex;
            flex-direction: row;
            padding-left: 0em;
            padding-right: 1em;
            background: $white;

            > div {
                margin-left: 0.6em;
                margin-right: 0.6em;
            }
        }
    }

    @include tablet {
        > .main-layout {
            margin-left: 220px;
            padding: 0;
        }
    }

    @media only screen and (min-width: 769px) {
        > .menu--collapsed {
            &.menu {
                width: 60px !important;
                transition: width 0.3s ease-out;
            }
            &.main-layout {
                margin-left: 60px !important;
            }
        }
    }

    @media only screen and (max-width: 768px) {
        > .main-layout {
            padding: 78px 0 0 0;
        }
    }
}
</style>
