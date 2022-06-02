<template>
    <aibidia-modal
        ref="modal"
        :class="modalClass"
        :modal-width="modalWidth"
        @action:ok="resolvePromise"
        @action:cancel="cancelPromise"
    >
        <template #title>
            {{ title }}
        </template>
        <template #content>
            <div
                :is="infoComponent"
                v-bind="infoProps"
            >
                This is a confirmation notification
            </div>
        </template>
        <div
            :is="actionsComponent"
            slot="actions"
        >
        </div>
    </aibidia-modal>
</template>

<script>
/**
 * Component Modal for programmatically asking user to confirm action, which can be OKed or Cancelled.
 * Can display optional table items.
 */

/**
 * Object used to define properties for programmatic confirm modals.
 * @typedef {Object} ConfirmModalSettings
 * @property {string} [title] Modal title.
 * @property {Object[]} [items] Optional items to display in table
 * @property {Object} [columns] Optional columns to display in table
 * @property {import('vue').Component} [infoComponent] Vue component to display as info message.
 * @property {import('vue').Component} [actionsComponent] Vue component to replace action buttons.
 * @property {Object} [infoProps] Vue component props to pass to infoComponent.
 * @property {number} [modalWidth] Width of the modal in pixels.
 * @property {Object} [modalClass] Optional classes object to pass to modal.
 * @global
 */

import AibidiaModalOKCancel from 'components/shared/modal/AibidiaModal/ActionGroups/AibidiaModalOKCancel.vue'
import AibidiaModal from 'components/shared/modal/AibidiaModal/AibidiaModal.ts.vue'
import InfoNotification from 'components/shared/modal/notifications/InfoNotification.vue'

export default {
    components: {
        'aibidia-modal': AibidiaModal,
    },
    data() {
        return {
            /**
             * Title of modal, shown in header
             */
            title: 'Confirm',
            /**
             * Optional items to show in table
             */
            items: [],
            /**
             * Optional columns to show in table
             */
            columns: {},
            /**
             * Custom class for modal
             */
            modalClass: {},
            /**
             * Width of modal in pixels
             */
            modalWidth: 640,
            /**
             * Component to display help message
             */
            infoComponent: InfoNotification,
            /**
             * Component of modal actions
             */
            actionsComponent: AibidiaModalOKCancel,
            /**
             * Help message Component props to pass
             */
            infoProps: {},
            /**
             * Promise resolver to be called when user confirms delete
             */
            resolvePromise: () => {
                return Promise.resolve(null)
            },
            /**
             * Promise canceller to be called when user cancels modal
             */
            cancelPromise: () => {
                return Promise.resolve(null)
            },
            /**
             * Promise rejecter to be called when error occurs
             */
            rejectPromise: () => {
                return Promise.reject(null)
            },
        }
    },

    methods: {
        /**
         * Helper method to clear modal data to default state.
         */
        clear() {
            this.title = 'Confirm'
            this.items = []
            this.columns = {}
            this.modalWidth = 640
            this.actionsComponent = AibidiaModalOKCancel
            this.resolvePromise = () => {
                return Promise.resolve(true)
            }

            this.cancelPromise = () => {
                return Promise.resolve(null)
            }

            this.rejectPromise = () => {
                return Promise.reject(null)
            }
        },

        /**
         * Main method to show confirmation.
         * Returns a promise, which is resolved to "true" or passed "items", when user clicks OK
         * or resolved to "false" or null, if modal is cancelled.
         *
         * @param {ConfirmModalSettings} options Options for confirmation modal
         * @returns {Promise} A promise which is resolved if user accepts or cancels delete action
         * or rejected if error is thrown.
         */
        confirm(options) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const ctx = this
            return new Promise((resolve, reject) => {
                ctx.title = options.title || 'Confirm'
                ctx.items =  null
                ctx.columns = null
                ctx.infoComponent = options.infoComponent || InfoNotification
                ctx.actionsComponent =
                    options.actionsComponent || AibidiaModalOKCancel

                ctx.infoProps = options.infoProps || {}
                ctx.modalWidth = ctx.items == null ? 640 : 1900
                ctx.rejectPromise = reject
                ctx.modalClass = options.modalClass || { confim: true }

                ctx.resolvePromise = () => {
                    ctx.clear()
                    if (ctx.items) {
                        return resolve(ctx.items)
                    }

                    return resolve(true)
                }

                ctx.cancelPromise = () => {
                    ctx.clear()
                    if (ctx.items) {
                        return resolve(null)
                    }

                    return resolve(false)
                }

                ctx.$refs.modal.show()
            })
        },
    },
}
</script>

<style lang="scss">
@import 'src/assets/sass/color.scss';

.aibidia-modal.is-warning {
    .modal-card-head {
        background-color: $danger;
    }

    .modal-card-body {
        .fa-exclamation-circle {
            color: $danger;
        }
    }
}
</style>
