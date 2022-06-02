<template>
    <div class="modal-group-wrapper">
        <crud-modal
            ref="crudModal"
        >
        </crud-modal>
    </div>
</template>

<script>
import CrudModal from './Edit/CrudModal.vue'

/**
 * Info: Wrapper for all global edit modal actions, which are populated to Vue.$prototype.modals.edit
 */

export default {
    components: {
        'crud-modal': CrudModal,
    },

    methods: {
        /**
         * Main method to show CRUD edit modal.
         * Returns a promise, which is resolved to "true" or passed "items", when user clicks OK
         * or resolved to "false" or null, if modal is cancelled.
         *
         * @param {{
         *      title?: string,
         *      editorComponent: VueInstance,
         *      columns?: Object,
         *      modalWidth?: number,
         *      modalClass?: Object,
         * }} options Options for editor modal
         *
         * @returns {{Promise}} A promise which is resolved if user clicks done on the modal
         * or rejected if error is thrown.
         */
        crud(options) {
            return this.$refs.crudModal.show(options)
        },
    },
}
</script>
