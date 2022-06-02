<template>
    <a-root-page-layout>
        <template #pagetabs>
            <a-tab
                route="/hm/dev/page/default"
            >
                Default Generic Page
            </a-tab>
            <a-tab
                route="/hm/dev/page/scrollable"
            >
                Scrollable Panes
            </a-tab>
            <a-tab
                route="/hm/dev/page/grid"
            >
                Grid Page
            </a-tab>
        </template>
    </a-root-page-layout>
</template>

<script lang="ts">
import BaseView from 'views/BaseView.ts.vue'

/**
 * This page is a category page.
 */
export default BaseView.extend<void, void, void, void>({
    name: 'DevelopmentPage',
})
</script>

