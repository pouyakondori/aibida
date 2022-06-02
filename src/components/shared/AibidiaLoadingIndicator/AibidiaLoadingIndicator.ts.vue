<template>
    <b-loading
        :active="internalActive"
        :can-cancel="false"
        :is-full-page="false"
    >
        <template v-if="fullForm">
            <div class="loading-icon" />
            <span
                v-if="text"
                class="text"
            >{{ text }}</span>
            <transition-group
                v-if="items.length"
                name="complete"
                tag="ul"
            >
                <li
                    v-for="item in items"
                    :key="item.key"
                    class="complete-item"
                    :class="{ok: item.ok, err: item.err}"
                >
                    {{ item.desc }}
                </li>
            </transition-group>
        </template>
    </b-loading>
</template>

<script lang="ts">
/**
 * Loading indicator, wrapper interface for Buefy Loading component
 */

import Vue from 'vue'

/**
 * Interface for tracking data loads, and displaying progress on UI.
 */
export interface DataLoadingObject {
    /** Unique ID for this DataFetch */
    key: string
    /** Optional description for debugging */
    desc: string
    /** Are we done? */
    ok?: boolean
    /** Did we encounter error? */
    err?: Error
}

interface Props {
    active: boolean
    fullForm: boolean
    text: string
    fetches: DataLoadingObject[]
}

interface Computed {
    /** Sorted data fetching objects */
    items: DataLoadingObject[]
}

interface Data {
    internalActive: boolean
    activeDebounce: NodeJS.Timeout | null
}

export default Vue.extend<Data, void, Computed, Props>({
    name: 'AibidiaLoadingIndicator',
    props: {
        /**
         * Is loader active and should be shown?
         */
        active: {
            type: Boolean,
        },

        /**
         * Should full form be used?
         */
        fullForm: {
            type: Boolean,
        },

        /**
         * Loading text that should be shown in full form
         */
        text: {
            type: String,
            default: '',
        },

        /**
         * Are we loading any data?
         */
        fetches: {
            type: Array,
            default: () => {
                return []
            },
        },
    },

    data() {
        return {
            internalActive: false,
            activeDebounce: null,
        }
    },

    computed: {
        items() {
            return this.fetches.filter(a => !a.ok)
        },
    },

    watch: {
        active(value) {
            if (this.activeDebounce) {
                clearTimeout(this.activeDebounce)
            }

            if (!value) {
                this.internalActive = value
                return
            }

            const t = this.fetches.length > 2 ? 100 : 0
            this.activeDebounce = setTimeout(() => {
                this.internalActive = value
            }, t)
        },
    },

    beforeDestroy() {
        if (this.activeDebounce) {
            clearTimeout(this.activeDebounce)
        }
    },
})
</script>

<style lang="scss">
@import '~@/assets/sass/color.scss';
.loading-overlay {
    > .loading-background {
        z-index: 103;
    }

    > .loading-icon {
        margin-left: 0px;
        font-size: 1rem;

        &:after {
            border-color: $purple;
            border-right-color: transparent;
            border-top-color: transparent;
        }
    }

    > .text {
        margin-left: 2em;
        font-size: 1rem;
    }

    > {
        ul {
            list-style: none;
            padding-left: 1em;
        }

        ul li:before {
            content: '⋯';
        }

        ul li.ok:before {
            content: '✓';
            color: $success;
        }

        ul li.err:before {
            content: '❌';
            color: $danger;
        }
    }

    .complete-item {
        transition: transform 0.3s ease-out, opacity 0.3s ease 0.5s;
    }

    .complete-enter,
    .complete-leave-to {
        opacity: 0;
    }

    .complete-enter-active {
        transition-delay: 0.5s;
    }

    .complete-leave-active {
        position: relative;
        &:before {
            content: '✓';
            color: $success;
        }
    }
}
</style>

