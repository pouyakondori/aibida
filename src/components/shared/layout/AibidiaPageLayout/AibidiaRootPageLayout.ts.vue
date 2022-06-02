<template>
    <a-pane
        rows
        :scrollable="false"
        content-grow
        :content-padding="true"
    >
        <slot name="page">
            <router-view>
                <template #pagetabs>
                    <slot name="pagetabs" />
                </template>
            </router-view>
        </slot>
    </a-pane>
</template>

<script lang="ts">
import Vue from 'vue'

interface Props {
    /** If the default page layout should be rows */
    rows: boolean
    /** If the default page layout should be columns */
    columns: boolean
}

/**
 * Root page layout which are used in category pages.
 */
export default Vue.extend<void, void, void, Props>({
    name: 'RootPageLayout',

    props: {
        rows: {
            type: Boolean,
            default: false,
        },
        columns: {
            type: Boolean,
            default: false,
        },
    },
})
</script>
