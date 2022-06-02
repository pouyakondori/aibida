<template>
    <a-page-layout>
        <template #pagetabs>
            <slot name="pagetabs" />
        </template>

        <template #tips>
            <p>
                This is tip area for page tips.
            </p>
            <p>
                This area will not be visible in production build.
            </p>
        </template>

        <template #filters>
            <span/>
        </template>

        <template #default>
            <a-content
                margin
                grow
            >
                <p>
                    This is empty generic page.
                </p>
            </a-content>
        </template>
    </a-page-layout>
</template>

<script lang="ts">
import BaseView from 'views/BaseView.ts.vue'

/**
 * Sample page to display what generic page layout should look like
 */
export default BaseView.extend<void, void, void, void>({
    name: 'GenericPage',
})
</script>

