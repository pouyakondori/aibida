<template>
    <a-button
        class="cancel-button"
        title="Cancel action"
        :icon="icon || 'fas fa-times'"
        :icon-align="iconAlign"
        :disabled="disabled"
        :class="buttonClass"
        @click="handleClick"
    >
        <slot>
            Cancel
        </slot>
    </a-button>
</template>

<script>
/**
 * Button that is colored with Cancel color and by default X icon.
 * This button looks like the proposed action is about to be cancelled, or cancels the active user flow.
 * Use this button to close modals, or cancel long running operations.
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

