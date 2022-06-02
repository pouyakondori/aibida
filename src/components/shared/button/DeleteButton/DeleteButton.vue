<template>
    <a-button
        class="delete-button is-danger"
        :icon="icon || 'fa fa-trash'"
        :icon-align="iconAlign"
        :disabled="disabled"
        :class="buttonClass"
        @click="handleClick"
    >
        <span v-if="$slots.default">
            <slot>
                Delete
            </slot>
        </span>
    </a-button>
</template>

<script>
/**
 * Button that is colored with Danger color.
 * This button looks like the action is about to delete something.
 * Use 'data-content' attribute, if you want a fancy hover text animation.
 *
 * @extends AibidiaButton
 */
import AibidiaButton from '../AibidiaButton.ts.vue'

export default {
    components: {
        'a-button': AibidiaButton,
    },

    extends: AibidiaButton,
}
</script>

<style lang="scss" scoped>
.delete-button {
    &.button.is-danger.is-outlined {
        border-radius: 3px;
    }

    &:hover[data-content]:not(.right):after,
    &.left:hover[data-content]::after {
        max-width: 200px;
        transition: max-width 0.2s;
        padding-left: 8px;
        visibility: visible;
    }

    &.right:hover[data-content]::before {
        max-width: 200px;
        transition: max-width 0.2s;
        padding-right: 8px;
        visibility: visible;
    }

    &.left[data-content]::after {
        content: attr(data-content);
        padding-left: 0;
        max-width: 0;
        transition: max-width 0.2s;
        overflow: hidden;
        visibility: hidden;
    }

    &.right[data-content]::before {
        content: attr(data-content);
        padding-right: 0;
        max-width: 0;
        transition: max-width 0.2s;
        overflow: hidden;
        visibility: hidden;
    }
}
</style>
