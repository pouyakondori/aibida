<template>
    <div class="modal-group-wrapper">
        <confirm-modal
            ref="confirm"
        >
        </confirm-modal>
    </div>
</template>

<script>
/**
 * Wrapper for all global confirm modal actions, which are populated to Vue.$prototype.modals.confirm
 */
import ConfirmModal from './Confirm/ConfirmModal.vue'

export default {
    components: {
        'confirm-modal': ConfirmModal,
    },

    methods: {
        /**
         * Show basic ok-cancel confirmation modal. Use when wanting to ask simple confirmation dialog.
         *
         * @param {{
         *      title?: string,
         *      items?: Array,
         *      columns?: Object,
         *      actionsComponent?: VueInstance,
         *      infoComponent?: VueInstance,
         *      dontShowAgainSetter?: string,
         *      modalWidth?: number,
         *      modalClass?: Object,
         * }} options Options for confirmation modal
         * @returns {Promise}
         */
        okcancel(options) {
            return this.$refs.confirm.confirm(options)
        },

        /**
         * Show warning confirmation modal. Warning notification is red and should be used only when user may lose work or data.
         *
         * @param {{
         *      title?: string,
         *      items?: Array,
         *      columns?: Object,
         *      actionsComponent?: VueInstance,
         *      infoComponent?: VueInstance,
         *      modalWidth?: number,
         *      modalClass?: Object,
         * }} options Options for confirmation modal
         * @returns {Promise}
         */
        warning(options) {
            // Extend class
            if (!options.modalClass) {
                options.modalClass = {}
            }

            options.modalClass['is-warning'] = true
            return this.$refs.confirm.confirm(options)
        },
    },
}
</script>
