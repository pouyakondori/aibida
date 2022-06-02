import AibidiaModalContinueCancel from 'components/shared/modal/AibidiaModal/ActionGroups/AibidiaModalContinueCancel'

export const WarnUnsavedChanges = {
    name: 'WarnUnsavedChanges',

    computed: {
        anyTableHasInvalidCells() {
            return this.$store.getters.anyTableHasInvalidCells
        },

        unsavedChanges() {
            return this.anyTableHasInvalidCells
        },
    },

    created() {
        window.onbeforeunload = () => {
            if (this.unsavedChanges) {
                return 'Changes you made may not be saved.'
            }
        }
    },

    async beforeRouteLeave(to, from, next) {
        // called when the route that renders this component is about to
        // be navigated away from.
        if (!this.unsavedChanges) {
            return next()
        }

        const answer = await this.$modals.confirm.warning({
            title: 'Unsaved changes!',
            actionsComponent: AibidiaModalContinueCancel,
            infoProps: {
                title: 'Do you want to discard unsaved changes?',
                text:
                    'If you press Continue, the most recent changes will NOT be saved since there are unresolved errors. Press Cancel if you want to fix the errors first and save the changes.',
            },
        })

        if (answer) {
            next()
        } else {
            next(false)
        }
    },
}
