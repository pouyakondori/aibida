<template>
    <div
        class="aibidia-action-group is-grouped centered"
    >
        <primary-button
            class="is-danger"
            :title="'Continue'"
            :disabled="!canCancel || continueDisabled"
            @click="($event) => actionClicked('ok', $event)"
        >
            <slot>
                Continue
            </slot>
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
 * ActionGroup to be used in confirmation modals where wanted action is "Continue"
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
         * Set true if continue-button should be in disabled state.
         */
        continueDisabled: {
            type: Boolean,
            default: false,
        },
    },
}
</script>

<style lang="scss" scoped>
</style>
