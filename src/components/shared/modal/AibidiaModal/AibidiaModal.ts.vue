<template>
    <b-modal
        v-if="internalActive"
        ref="modal"
        class="aibidia-modal"
        :active.sync="internalActive"
        :can-cancel="internalCanCancel"
        :on-cancel="handleCancel"
        :width="modalWidth"
        @action="handleAction"
        @focus.native="handleFocus(true)"
        @blur.native="handleFocus(false)"
    >
        <div class="modal-card">
            <slot name="header">
                <aibidia-modal-header
                    :can-cancel="canCancel"
                    @close="handleCancel"
                >
                    <slot name="title" />
                </aibidia-modal-header>
            </slot>
            <section
                class="modal-card-body"
                :class="{'no-padding': !contentPadding}"
            >
                <slot name="content">
                    <p class="centered">
                        Content goes here
                    </p>
                </slot>
            </section>
            <footer class="modal-card-foot">
                <slot name="pre-actions">
                    <div class="footer-spacer" />
                </slot>
                <slot name="actions">
                    <aibidia-done
                        @action:done="handleCancel"
                    >
                        OK
                    </aibidia-done>
                </slot>
                <slot name="post-actions">
                    <div class="footer-spacer" />
                </slot>
            </footer>
        </div>
    </b-modal>
</template>
<script lang="ts">
import AibidiaModalDone from 'components/shared/modal/AibidiaModal/ActionGroups/AibidiaModalDone.vue'
import Vue from 'vue'
import AibidiaModalHeader from './AibidiaModalHeader.ts.vue'

interface Props {
    /** Modal is active/visible (use active.sync to control modal visibility) */
    active: boolean
    /** Modal automatically hides if action is triggered. Set to false, if you want to display progress etc. */
    autoHide: boolean
    /** Modal content has default padding if set to true */
    contentPadding: boolean
    /** Ways user can cancel the dialog. Default is by ESC key. Setting to "false" will disable cancellation. */
    canCancel: boolean | string[]
    /** Width of modal in pixels */
    modalWidth: number
}

interface Data {
    /** Internal active state, defaults to prop */
    internalActive: boolean
    /** Internal modal focus state */
    hasFocus: boolean
}

interface Computed {
    /** If modal can be cancelled. If modal does not have focus, modal can't be cancelled. */
    internalCanCancel: boolean | string[]
}

interface Methods {
    /**
     * Generic event handler from AibidiaActionGroup. Forwards action to modal user.
     * If 'autoHide' property is true, hides modal after action is emitted.
     *
     * @param action Action string which is sent from AibidiaActionGroup component.
     * @param event Native Click Event that is passed along from the AibidiaActionGroup component.
     */
    handleAction: (action: string, event: Event) => void
    /**
     * Event handler for 'cancel'-action from AibidiaActionGroup. Forwards action to modal user.
     * Also called when modal is closed by other close actions such as 'ESC' or user clicking modal close icon "X".
     * If 'autoHide' property is true, hides modal after action is emitted.
     *
     * @param event Event that is passed along from the AibidiaActionGroup component.
     */
    handleCancel: (event: Event) => void
    /** Shows the modal, unless already shown */
    show: () => void
    /** Hides the modal, unless already hidden */
    hide: () => void

    handleFocus: (value: boolean) => void
    focus: () => Promise<void>
}

/**
 * This component is a base component for all Modal components.
 * This button looks like the proposed action is about to be cancelled, or cancels the active user flow.
 * Use this button to close modals, or cancel long running operations.
 */
const AibidiaModal = Vue.extend<Data, Methods, Computed, Props>({
    components: {
        'aibidia-modal-header': AibidiaModalHeader,
        'aibidia-done': AibidiaModalDone,
    },

    props: {
        active: {
            type: Boolean,
            default: false,
        },
        autoHide: {
            type: Boolean,
            default: true,
        },
        canCancel: {
            type: [Array, Boolean],
            default: () => {
                return ['escape']
            },
        },
        modalWidth: {
            type: Number,
            default: 1900,
        },
        contentPadding: {
            type: Boolean,
            default: true,
        },
    },

    data() {
        return {
            internalActive: this.active,
            hasFocus: true,
        }
    },

    computed: {
        internalCanCancel() {
            if (!this.hasFocus) {
                if (Array.isArray(this.canCancel)) {
                    return this.canCancel.filter(val => val !== 'escape')
                }
            }

            return this.canCancel
        },
    },

    watch: {
        /** Watches external active state and updates internal, if necessary */
        active(newValue): void {
            if (newValue && !this.internalActive) {
                this.show()
            } else if (!newValue && this.internalActive) {
                this.hide()
            }
        },
    },

    methods: {
        handleAction(action, event): void {
            this.$emit('action:' + action, event)
            if (this.autoHide) {
                this.hide()
            }
        },
        handleCancel(event): void {
            this.$emit('action:cancel', event)
            if (this.autoHide) {
                this.hide()
            }
        },
        show(): void {
            if (this.internalActive) {
                return
            }

            // Show the modal
            this.internalActive = true
            this.$emit('update:active', this.internalActive)
            this.$emit('show')
            // Make sure we have focus after a while
            setTimeout(() => {
                this.focus()
            }, 1)
        },
        hide(): boolean | undefined {
            if (!this.internalActive) {
                return
            }

            if (this.canCancel === false) {
                // Prevent cancelling the modal
                return false
            }

            this.internalActive = false
            this.$emit('update:active', this.internalActive)
            this.$emit('hide')
        },
        async focus() {
            await this.$nextTick()
            const modal = this.$refs.modal as Vue
            if (!modal) {
                return
            }

            const div = modal.$el as HTMLElement
            if (!div) {
                return
            }

            div.focus()
        },
        handleFocus(value) {
            this.hasFocus = value
        },
    },
})

export default AibidiaModal
</script>

<style lang="scss">
@import '~@/assets/sass/color.scss';

.aibidia-modal {
    &:focus {
        outline: none;
    }

    .modal-card {
        margin: auto;
        width: 100%;

        .modal-card-head {
            border-bottom: none;
        }

        .modal-card-body {
            display: flex;
            flex-direction: column;
            background-color: $white-bg;

            .pane-grid {
                .field {
                    max-height: 100px;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 4;
                    -webkit-box-orient: vertical;
                }
            }

            &.no-padding {
                padding: unset;
            }
        }

        .modal-card-foot {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            > * {
                flex-grow: 2;
                width: 100%;
            }

            > .button {
                flex-grow: 0;
            }
        }
    }

    &.is-active {
        z-index: 1005;
    }
}
</style>
