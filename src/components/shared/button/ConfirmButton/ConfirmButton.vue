<template>
    <a-button
        class="confirm-button is-success"
        title="Confirm action"
        :icon="icon || 'fa fa-check'"
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

<script lang="ts">
import Vue from 'vue'
import AibidiaButton from '../AibidiaButton.ts.vue'

/**
 * Button that is colored with Success color (greenish).
 * This button looks like the action is about to finalize or confirm user action.
 *
 * @extends AibidiaButton
 */
export default Vue.extend({
    name: 'ConfirmButton',

    components: {
        'a-button': AibidiaButton,
    },

    extends: AibidiaButton,
})
</script>

