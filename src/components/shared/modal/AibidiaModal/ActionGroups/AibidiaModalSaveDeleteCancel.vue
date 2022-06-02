<template>
    <div
        class="aibidia-action-group is-grouped centered"
    >
        <primary-button
            icon-align="right"
            :disabled="!canCancel || saveDisabled"
            @click="($event) => actionClicked('save', $event)"
        >
            Save
        </primary-button>
        <delete-button
            icon-align="right"
            :disabled="!canCancel || deleteDisabled"
            @click="($event) => actionClicked('delete', $event)"
        >
            Delete
        </delete-button>
        <cancel-button
            icon-align="right"
            :disabled="!canCancel"
            @click="cancelClicked()"
        >
            Cancel
        </cancel-button>
    </div>
</template>
<script>
/**
 * ActionGroup to be used in confirmation modals where user can choose to either save data, delete the data or cancel action.
 *
 * @extends AibidiaActionGroup
 */

import AibidiaActionGroup from './AibidiaActionGroup.ts.vue'
import PrimaryButton from 'components/shared/button/PrimaryButton/PrimaryButton.vue'
import CancelButton from 'components/shared/button/CancelButton/CancelButton.vue'
import DeleteButton from 'components/shared/button/DeleteButton/DeleteButton.vue'

export default {
    components: {
        'primary-button': PrimaryButton,
        'cancel-button': CancelButton,
        'delete-button': DeleteButton,
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
        /**
         * Set true if save-button should be in disabled state.
         */
        saveDisabled: {
            type: Boolean,
            default: false,
        },
    },
}
</script>

<style lang="scss" scoped>
</style>
