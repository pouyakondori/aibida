<template>
    <div
        class="aibidia-action-group is-grouped centered"
    >
        <delete-button
            icon-align="right"
            :disabled="!canCancel || deleteDisabled"
            data-cy="modal-delete-button"
            @click="($event) => actionClicked('delete', $event)"
        >
            Delete
        </delete-button>
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
 * ActionGroup to be used in confirmation modals where wanted action is "Delete"
 *
 * @extends AibidiaActionGroup
 */

import AibidiaActionGroup from './AibidiaActionGroup.ts.vue'
import DeleteButton from 'components/shared/button/DeleteButton/DeleteButton.vue'
import CancelButton from 'components/shared/button/CancelButton/CancelButton.vue'

export default {
    components: {
        'delete-button': DeleteButton,
        'cancel-button': CancelButton,
    },
    extends: AibidiaActionGroup,
    props: {
        /**
         * Set true if delete-button should be in disabled state.
         */
        deleteDisabled: {
            type: Boolean,
            default: false,
        },
    },
}
</script>

<style lang="scss" scoped>
</style>
