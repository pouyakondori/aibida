<template>
    <a-pane
        :columns="columns"
        :rows="rows || !columns"
        content-grow
    >
        <template #header>
            <a-top-paper>
                <template
                    v-if="$slots.pagetabs"
                    #pagetabs
                >
                    <a-tabs>
                        <slot name="pagetabs" />
                    </a-tabs>
                </template>
                <template
                    v-if="$slots.tips"
                    #info
                >
                    <slot
                        v-if="$slots.tips"
                        name="tips"
                    />
                </template>
                <template
                    v-if="$slots.filters || $slots.counter"
                    #items
                >
                    <a-content
                        v-if="$slots.filters"
                        grow
                    >
                        <slot name="filters" />
                    </a-content>
                    <a-content
                        v-if="$slots.counter"
                        align-vertically="bottom"
                        align-horizontally="right"
                    >
                        <slot name="counter" />
                    </a-content>
                </template>
            </a-top-paper>
        </template>

        <template #content>
            <slot />

            <slot
                v-if="$slots.modals"
                name="modals"
            />

            <slot name="loader">
                <a-loader
                    :active="loading"
                    :text="updateStatus"
                ></a-loader>
            </slot>
        </template>
    </a-pane>
</template>

<script lang="ts">
import AibidiaTopPaper from 'components/shared/layout/AibidiaTopPaper/AibidiaTopPaper.ts.vue'
import Vue from 'vue'

interface Props {
    /** If the default page layout should be rows */
    rows: boolean
    /** If the default page layout should be columns */
    columns: boolean
    /** If we are loading this layout */
    loading: boolean
    /** If we are should display update status in loading */
    updateStatus: string
}

/**
 * Default Page layout to display any page content.
 */
export default Vue.extend<void, void, void, Props>({
    name: 'DefaultPageLayout',

    components: {
        'a-top-paper': AibidiaTopPaper,
    },

    props: {
        rows: {
            type: Boolean,
            default: false,
        },
        columns: {
            type: Boolean,
            default: true,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        updateStatus: {
            type: String,
            default: null,
        },
    },
})
</script>
