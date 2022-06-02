<template>
    <a-pane
        class="a-card"
        :depth="depth || 8"
        has-loader
        card
        :grow="grow"
        :shrink="shrink"
        :scrollable="scrollable"
        :rows="rows"
        :columns="columns"
        :wrap-items="wrapItems"
        :align-items="alignItems"
        :justify-content="justifyContent"
        :content-padding="contentPadding"
        :content-grow="contentGrow"
        :content-separation="contentSeparation"
        :background="background || 'white'"
        :loading="loading"
    >
        <template #tabs>
            <slot name="tabs" />
        </template>
        <template #header>
            <slot name="header" />
        </template>
        <template #default>
            <slot name="default" />
        </template>
        <template #content>
            <slot name="content" />
        </template>
        <template #footer>
            <slot name="footer" />
        </template>
        <template #loader>
            <slot name="loader" />
        </template>
    </a-pane>
</template>

<script lang="ts">
import AibidiaPane from '../AibidiaPane/AibidiaPane.ts.vue'

/**
 * Component to display visually Card-looking AibidiaPane.
 * This component is more like a preset in a sense that it won't provide additional functionality but rather a visual feeling to the AibidiaPane.
 *
 * @extends AibidiaPane
 */
export default AibidiaPane.extend<void, void, void, void>({
    name: 'AibidiaCard',

    extends: AibidiaPane,
})
</script>

<style lang="scss">
@import '~@/assets/sass/color.scss';

.pane-card {
    margin: 0.6em;
    min-width: 0;

    &-rounded {
        border-radius: 4px;
    }
}
</style>
