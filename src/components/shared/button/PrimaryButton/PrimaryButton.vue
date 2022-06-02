<template>
    <a-button
        class="primary-button is-primary"
        :icon="icon || 'fas fa-check'"
        :icon-align="iconAlign"
        :disabled="disabled"
        :class="buttonClass"
        @click="handleClick"
    >
        <slot>
            OK
        </slot>
    </a-button>
</template>

<script>
/**
 * Button that is colored with Primary color.
 * This button is intended to be used whenever a regular button is needed in UI. Use this instead of AibidiaButton, or extend AibidiaButton to new component.
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
