<template>
    <a-pane
        grid
        content-grow
        class="one-thirds-layout"
        :class="{hasthird: $slots.third}"
    >
        <template #content>
            <slot name="first" />
            <slot name="second" />
            <slot name="third" />
            <slot />
            <slot name="overlay" />
        </template>
    </a-pane>
</template>

<script lang="ts">
import Vue from 'vue'

/**
 * This layout is used where the view should be divided to two, with first slot going to left side of the screen,
 * as some sort of side-panel, and second, third and default slots optionally splitting the next column evenly.
 *
 * Additional slot to use overlay within the whole layout.
 */
export default Vue.extend<void, void, void, void>({
    name: 'AibidiaOneThirdsLayout',
})
</script>

<style lang="scss">
.pane-grid {
    display: grid;
    &.one-thirds-layout {
        // There are two columns. One that can grow up to 415px and second who will fill the rest, but must be at least 66% wide.
        grid-template-columns: minmax(min-content, 415px) minmax(66%, auto);
        grid-template-rows: 1fr min-content;

        &.hasthird {
            grid-template-rows: auto auto min-content;
        }

        > :first-child {
            grid-row: 1 / span 3;
        }

        > section.overlay {
            margin: 0.6em;
        }
    }
}
</style>
