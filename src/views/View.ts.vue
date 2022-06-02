<template>
    <router-view>
        <template #pagetabs>
            <slot name="pagetabs" />
        </template>
    </router-view>
</template>

<script lang="ts">
import Vue from 'vue'

/**
 * This view acts only as router-view.
 */
export default Vue.extend<void, void, void, void>({})
</script>

