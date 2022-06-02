<template>
    <a-card
        class="top-paper"
        :content-padding="false"
    >
        <template #tabs>
            <slot name="pagetabs" />
        </template>
        <template #default>
            <a-content
                v-if="$slots.info && isInfoShown"
                pad
            >
                <slot name="info" />
                <p data-cy="page-tips">
                    <a
                        href="#"
                        class="has-text-primary"
                        title="Hides page usage tips"
                        data-cy="toggle-page-tips"
                        @click.stop.prevent="hidePageInfo"
                    >
                        <i class="fa fa-angle-up" /> Hide instructions
                    </a>
                </p>
            </a-content>
            <a-content
                v-else-if="$slots.info"
                pad
            >
                <p data-cy="page-tips">
                    <a
                        href="#"
                        class="has-text-primary"
                        title="Shows page usage tips"
                        data-cy="toggle-page-tips"
                        @click.stop.prevent="showPageInfo"
                    >
                        <i class="fa fa-angle-down" /> Show instructions
                    </a>
                </p>
            </a-content>
            <a-pane
                v-if="$slots.items"
                columns
                wrap-items
                content-separation
                align-items="flex-end"
            >
                <slot name="items" />
            </a-pane>
        </template>
    </a-card>
</template>

<script lang="ts">
import Vue from 'vue'

interface Props {
    /** Optional item counter text on the right side of the layout */
    counterText: string
    /** Key what to use to store settings in localStorage */
    localStorageSettingsKey: string
}

interface Data {
    /** If page tips are shown */
    isInfoShown: boolean
}

interface Methods {
    /**
     * Sets isInfoShown and stores the value to LocalStorage
     * @param value If info is shown.
     */
    setShowInfoState: (value: boolean) => void
    /** Hides page info tips */
    hidePageInfo: () => void
    /** Shows page info tips. */
    showPageInfo: () => void
}

/**
 * Component to display page instructions and optional counter on paper header.
 */
export default Vue.extend<Data, Methods, void, Props>({
    props: {
        counterText: {
            type: String,
            default: '',
        },
        localStorageSettingsKey: {
            type: String,
            default: 'AIBIDIA_TM_TOPPAPER_SHOW_PAGEINFO',
        },
    },

    data() {
        return {
            isInfoShown: false,
        }
    },

    mounted() {
        if (this.localStorageSettingsKey) {
            const data = localStorage.getItem(this.localStorageSettingsKey)
            this.isInfoShown = data === null ? true : data === 'true'
        }
    },

    methods: {
        setShowInfoState(value): void {
            this.isInfoShown = value
            if (this.localStorageSettingsKey) {
                localStorage.setItem(
                    this.localStorageSettingsKey,
                    value.toString()
                )
            }
        },
        hidePageInfo(): void {
            this.setShowInfoState(false)
        },
        showPageInfo(): void {
            this.setShowInfoState(true)
        },
    },
})
</script>

<style lang="scss">
.top-paper {
    &.pane-card {
        margin-top: 0;

        > .a-content > .a-content.pad {
            padding-bottom: 0;
        }
    }
}
</style>
