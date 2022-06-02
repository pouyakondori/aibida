<template>
    <div
        class="aibidia-action-group is-grouped centered"
    >
        <confirm-button
            icon-align="right"
            :disabled="!canCancel"
            title="Close modal"
            @click="($event) => actionClicked('done', $event)"
        >
            <slot>
                Done
            </slot>
        </confirm-button>
    </div>
</template>
<script>
/**
 * ActionGroup to be used in modals where user can not do much but to confirm receiving the information.
 *
 * @extends AibidiaActionGroup
 */
import AibidiaActionGroup from './AibidiaActionGroup.ts.vue'
import ConfirmButton from 'components/shared/button/ConfirmButton/ConfirmButton.vue'

export default {
    components: {
        'confirm-button': ConfirmButton,
    },

    extends: AibidiaActionGroup,
}
</script>
