<template>
    <div
        class="aibidia-action-group is-grouped centered"
    >
        <primary-button
            icon-align="right"
            :disabled="!canCancel || saveDisabled"
            :loading="saveLoading"
            :title="saveTooltip"
            @click="($event) => actionClicked('save', $event)"
        >
            Save
        </primary-button>
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
 * ActionGroup to be used in confirmation modals where user can choose to confirm the saving action, or cancel it.
 *
 * @extends AibidiaActionGroup
 */

import AibidiaActionGroup from './AibidiaActionGroup.ts.vue'
import PrimaryButton from 'components/shared/button/PrimaryButton/PrimaryButton.vue'
import CancelButton from 'components/shared/button/CancelButton/CancelButton.vue'

export default {
    components: {
        'primary-button': PrimaryButton,
        'cancel-button': CancelButton,
    },
    extends: AibidiaActionGroup,
    props: {
        /**
         * Set true if save-button should be in disabled state.
         */
        saveDisabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Set true if save-button should be in loading state.
         */
        saveLoading: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        /**
         * Tool tip that is shown with save-button.
         *
         * @returns {{ string }}
         */
        saveTooltip() {
            if (this.saveLoading) {
                return 'Please wait for a while...'
            }

            if (this.saveDisabled) {
                return 'Cannot save at the moment!'
            }

            return 'Save'
        },
    },
}
</script>

<style lang="scss" scoped>
</style>
