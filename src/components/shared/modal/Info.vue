<template>
    <div class="modal-group-wrapper">
        <info-modal
            ref="infoModal"
        >
        </info-modal>
    </div>
</template>

<script>
import InfoModal from './Info/InfoModal.vue'

/**
 * Info: Wrapper for all global info modal actions, which are populated to Vue.$prototype.modals.info
 */

export default {
    components: {
        'info-modal': InfoModal,
    },

    methods: {
        /**
         * Main method to show info modal.
         * Returns a promise, which is resolved to "true" or passed "items", when user clicks OK
         * or resolved to "false" or null, if modal is cancelled.
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
         *
         * @returns {{Promise}} A promise which is resolved if user accepts or cancels the modal
         * or rejected if error is thrown.
         */
        show(options) {
            return this.$refs.infoModal.show(options)
        },
    },
}
</script>
