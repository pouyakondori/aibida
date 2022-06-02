<template>
    <header class="aibidia-modal-header modal-card-head">
        <p class="modal-card-title padding-r-1">
            <slot>
                This is header title
            </slot>
        </p>
        <slot name="counter" />
        <slot name="icon">
            <i
                class="fas fa-times is-size-5 close-tick"
                :class="{'close-tick--disabled': canCancel === false}"
                title="Close modal"
                @click="handleCloseClick"
            />
        </slot>
    </header>
</template>

<script lang="ts">
import Vue from 'vue'

interface Methods {
    /** Event handler for close tick click */
    handleCloseClick: () => void
}
interface Props {
    /** Ways user can cancel the dialog. Default is by ESC key. Setting to "false" will disable cancellation. */
    canCancel: boolean | string[]
}

/**
 * Modal header component
 * Default slot: title
 */
export default Vue.extend<void, Methods, void, Props>({
    name: 'AibidiaModalHeader',

    props: {
        canCancel: {
            type: [Array, Boolean],
            default: () => {
                return ['escape']
            },
        },
    },

    methods: {
        handleCloseClick(): void {
            this.$emit('close')
        },
    },
})
</script>

<style lang="scss">
.aibidia-modal-header {
    padding-top: 18px;
    padding-bottom: 18px;

    .modal-card-title {
        flex-shrink: 1;
        line-height: 1.5em;
        word-wrap: break-word;
        white-space: normal;
    }
}
</style>
