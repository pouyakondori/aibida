<template>
    <aibidia-modal
        ref="modal"
        :class="modalClass"
        :modal-width="modalWidth"
        @action:done="resolvePromise"
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
                This is a information notification
            </div>
        </template>
        <template #pre-actions>
            <div
                v-if="dontShowAgainSetter"
            >
                <b-checkbox
                    v-model="dontShowNotificationAgain"
                    title="Check this, if you do not want to see this notification again"
                >
                    Do not show this again
                </b-checkbox>
            </div>
        </template>
    </aibidia-modal>
</template>

<script>
/**
 * This component can be used to show simple information modal to user.
 * There is option to not show the modal again, and that case the dontShowAgainSetter should be assigned to proper $store setter.
 *
 * @example
 * this.$modals.info.show({
 *    title: 'This is info modal',
 *    infoProps: {
 *        title: 'This goes to title',
 *        text: '.. additional text'
 *    }
 * })
 */

/**
 * Object used to define properties for programmatic info modals.
 * @typedef {Object} InfoModalSettings
 * @property {string} [title] Modal title.
 * @property {Object[]} [items] Optional items to display in table
 * @property {Object} [columns] Optional columns to display in table
 * @property {import('vue').Component} [infoComponent] Vue component to display as info message.
 * @property {Object} [infoProps] Vue component props to pass to infoComponent.
 * @property {number} [modalWidth] Width of the modal in pixels.
 * @property {import('vuex').ActionMethod} [dontShowAgainSetter] VueX store setter for "Do not show again" state.
 * @property {Object} [modalClass] Optional classes object to pass to modal.
 * @global
 */

import AibidiaModal from 'components/shared/modal/AibidiaModal/AibidiaModal.ts.vue'
import AibidiaModalDone from 'components/shared/modal/AibidiaModal/ActionGroups/AibidiaModalDone.vue'
import InfoNotification from 'components/shared/modal/notifications/InfoNotification.vue'

export default {
    components: {
        'aibidia-modal': AibidiaModal,
        done: AibidiaModalDone,
    },

    data() {
        return {
            /**
             * Title of modal, shown in header
             */
            title: 'Info',
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
            modalWidth: 1900,
            /**
             * Component to display help message
             */
            infoComponent: InfoNotification,
            /**
             * Help message Component props to pass
             */
            infoProps: {},
            /**
             * Internal don't show again data holder
             */
            dontShowStatus: false,
            /**
             * Optional store setter for don't show again feature
             */
            dontShowAgainSetter: null,
            /**
             * Promise resolver to be called when user confirms modal
             */
            resolvePromise: () => {
                return Promise.resolve(true)
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

    computed: {
        /**
         * Dynamic prop helper to set the store value for "Do not show again" -feature.
         */
        dontShowNotificationAgain: {
            get() {
                return this.dontShowStatus
            },

            set(value) {
                if (this.dontShowAgainSetter) {
                    this.$store.commit(this.dontShowAgainSetter, value)
                } else {
                    this.dontShowStatus = value
                }
            },
        },
    },

    methods: {
        /**
         * Helper method to clear modal data to default state.
         */
        clear() {
            this.title = 'Info'
            this.items = []
            this.columns = {}
            this.modalWidth = 1900
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
         * Main method to show info modal.
         * Returns a promise, which is resolved to "true" or passed "items", when user clicks OK
         * or resolved to "false" or null, if modal is cancelled.
         *
         * @param {InfoModalSettings} options Options for info modal
         * @returns {Promise} A promise which is resolved if user accepts or cancels the modal
         * or rejected if error is thrown.
         */
        show(options) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const ctx = this
            return new Promise((resolve, reject) => {
                ctx.title = options.title || 'Info'
                ctx.items = options.items || null
                ctx.columns = options.columns || null
                ctx.infoComponent = options.infoComponent || InfoNotification
                ctx.infoProps = options.infoProps || {}
                ctx.modalWidth = ctx.items == null ? 640 : 1900
                ctx.dontShowAgainSetter = options.dontShowAgainSetter || null
                ctx.rejectPromise = reject
                ctx.modalClass = options.modalClass || { info: true }

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
