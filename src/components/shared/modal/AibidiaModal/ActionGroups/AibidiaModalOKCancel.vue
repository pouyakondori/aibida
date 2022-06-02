<template>
    <div
        class="aibidia-action-group is-grouped centered"
    >
        <confirm-button
            icon-align="right"
            :disabled="!canCancel || okDisabled"
            data-cy="modal-ok-button"
            @click="($event) => actionClicked('ok', $event)"
        >
            <slot>
                OK
            </slot>
        </confirm-button>
        <cancel-button
            icon-align="right"
            :disabled="!canCancel"
            data-cy="modal-cancel-button"
            @click="cancelClicked()"
        >
            Cancel
        </cancel-button>
    </div>
</template>
<script>
/**
 * ActionGroup to be used in confirmation modals where user can choose to confirm the action, or cancel it.
 *
 * @extends AibidiaActionGroup
 */

import AibidiaActionGroup from './AibidiaActionGroup.ts.vue'
import ConfirmButton from 'components/shared/button/ConfirmButton/ConfirmButton.vue'
import CancelButton from 'components/shared/button/CancelButton/CancelButton.vue'

export default {
    components: {
        'confirm-button': ConfirmButton,
        'cancel-button': CancelButton,
    },
    extends: AibidiaActionGroup,
    props: {
        /**
         * Set true if ok-button should be in disabled state.
         */
        okDisabled: {
            type: Boolean,
            default: false,
        },
    },
}
</script>

<style lang="scss" scoped>
</style>
