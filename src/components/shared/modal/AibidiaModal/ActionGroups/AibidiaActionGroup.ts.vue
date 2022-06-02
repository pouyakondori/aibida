<template>
    <div
        class="aibidia-action-group is-grouped centered"
    >
        Extend this component
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

interface Data {
    /** Can user cancel (automatically populated by parent property if exists) */
    canCancel: boolean
}
interface Methods {
    /** Pick the parent state of cancellation policy */
    updateCanCancel: () => void
    /**
     * Generic event handler for actions. Forwards action to modal user.
     * If '$parent' exists, emits the parent action also. This prevents the need to catch the events in custom modals, and
     * it is necessary only to assign the slot.
     *
     * @param action Action string which is sent from AibidiaButton(s).
     * @param event Native Click Event that is passed along from the AibidiaButton component.
     */
    actionClicked: (action: string, event: Event) => void
    /**
     * Generic event handler for "confirm"-action. Forwards action to modal user.
     *
     * @param event Native Click Event that is passed along from the AibidiaButton component.
     */
    confirmClicked: (event: Event) => void
    /**
     * Generic event handler for "cancel"-action. Forwards action to modal user.
     *
     * @param event Native Click Event that is passed along from the AibidiaButton component or other ways to cancel.
     */
    cancelClicked: (event: Event) => void
}

/**
 * Base component for all ActionGroups (in modals and elsewhere). Developer should inherit this component, and not use this component directly.
 * This component is used to provide consistent functionality to all button groups.
 */
export default Vue.extend<Data, Methods, void, void>({
    name: 'AibidiaActionGroup',

    data() {
        return {
            canCancel: true,
        }
    },

    watch: {
        /** Keep track of parents canCancel policy */
        '$parent.canCancel': function (): void {
            this.updateCanCancel()
        },
    },

    mounted() {
        this.updateCanCancel()
    },

    methods: {
        updateCanCancel(): void {
            if (this.$parent) {
                this.canCancel = !((this.$parent as unknown as Data).canCancel === false)
            }
        },

        actionClicked(action, event): void {
            // We also push this event to parent, so parent can handle this
            if (this.$parent) {
                this.$parent.$emit('action', action, event)
            }

            this.$emit('action', action, event)
        },

        confirmClicked(event): void {
            this.actionClicked('confirm', event)
        },

        cancelClicked(event): void {
            this.actionClicked('cancel', event)
        },
    },
})
</script>
