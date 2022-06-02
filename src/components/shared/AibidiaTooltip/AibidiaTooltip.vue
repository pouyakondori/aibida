<template>
    <div
        ref="tooltip"
        class="aibidia-tooltip"
        :style="computedStyle"
        @mouseover="handleMouseOver"
        @mouseleave="handleMouseLeave"
        @mousedown="handleMouseDown"
    >
        <slot>
            Tooltip
        </slot>
    </div>
</template>

<script>
/**
 * Tooltip base component handling the positioning of the tooltip
 */

import { createPopper } from '@popperjs/core'

export default {
    props: {
        /**
         * Tooltip's placement in relation to reference element
         */
        placement: {
            type: String,
            default: 'right-start',
            validator: value => {
                // The value must match one of these strings
                return (
                    [
                        'auto',
                        'auto-start',
                        'auto-end',
                        'top',
                        'top-start',
                        'top-end',
                        'bottom',
                        'bottom-start',
                        'bottom-end',
                        'right',
                        'right-start',
                        'right-end',
                        'left',
                        'left-start',
                        'left-end',
                    ].indexOf(value) !== -1
                )
            },
        },
        /**
         * Tooltip's offset along and away from the reference element
         */
        offset: {
            type: Array,
            default: () => {
                return [0, 2]
            },
        },
        /**
         * Tooltip's width
         */
        width: {
            type: Number,
            default: null,
        },
        /**
         * Tooltip's maximum width
         */
        maxWidth: {
            type: Number,
            default: null,
        },
        /**
         * If tooltip stays on when hover moves from reference to tooltip itself
         */
        hoverStaysOn: {
            type: Boolean,
            default: true,
        },
    },

    data() {
        return {
            /**
             * Stored value for the last trigger requesting to show the tooltip
             * Only last trigger will be able to close to prevent double-closing.
             */
            currentTrigger: null,
            /**
             * Internal instance of popper.js
             */
            popperInstance: null,
            /**
             * Internal state if tooltip is currently shown
             */
            internalShow: false,
            /**
             * Timer for hiding the tooltip after hide() is called
             */
            hideTimeout: null,
            /**
             * Internal state which prevents hiding the tooltip.
             */
            internalPreventClosing: false,
        }
    },

    computed: {
        isShown() {
            return this.internalShow
        },

        computedStyle() {
            const style = {}
            if (this.width) {
                style.width = `${this.width}px`
            }

            if (this.maxWidth) {
                style.maxWidth = `${this.maxWidth}px`
            }

            return style
        },
    },

    mounted() {
        document.addEventListener('keydown', this.handleKeyDown)
        document.addEventListener('mouseup', this.handleMouseUp)
    },

    beforeDestroy() {
        document.removeEventListener('keydown', this.handleKeyDown)
        document.removeEventListener('mouseup', this.handleMouseUp)
        this.destroyPopper()
    },

    methods: {
        /**
         * Show tooltip on mouseover if condition is fulfilled
         */
        handleMouseOver() {
            if (this.hoverStaysOn) {
                this.showInternal()
            }
        },

        /**
         * Hide tooltip on mouseleave if condition is fulfilled
         */
        handleMouseLeave() {
            if (this.hoverStaysOn && !this.internalPreventClosing) {
                this.hideInternal()
            }
        },

        /**
         * Handles (component) mousedown, which can occur if user starts selecting text
         * Prevents closing tooltip while selecting text or dragging.
         */
        handleMouseDown() {
            this.internalPreventClosing = true
        },

        /**
         * Handles (document) mouseup, which allows to close the tooltip again
         * Prevents closing tooltip while selecting text
         */
        handleMouseUp() {
            this.internalPreventClosing = false
        },

        /**
         * Create popper instance and show tooltip
         *
         * @param {Event} event
         */
        async show(event) {
            const tooltip = this.$refs.tooltip
            if (!tooltip) {
                return
            }

            const trigger = event.target
            this.currentTrigger = trigger
            this.popperInstance = createPopper(trigger, tooltip, {
                placement: this.placement,
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: this.offset,
                        },
                    },
                    {
                        name: 'preventOverflow',
                        options: {
                            altAxis: true,
                            padding: 4,
                        },
                    },
                ],
            })

            this.showInternal()
        },

        /**
         * Hide tooltip with timeout
         */
        async hide(event) {
            // Only current trigger can hide the tooltip unless the hover stays on
            if (event.target !== this.currentTrigger) {
                return
            }

            this.currentTrigger = null
            this.internalShow = false
            this.hideTimeout = setTimeout(this.hideInternal, 50)
        },

        /**
         * Show tooltip by setting data-show attribute
         */
        showInternal() {
            const tooltip = this.$refs.tooltip
            if (!tooltip) {
                return
            }

            clearTimeout(this.hideTimeout)
            this.internalShow = true
            tooltip.setAttribute('data-show', '')
        },

        /**
         * Hide tooltip by removing data-show attribute and destroy popper instance
         */
        hideInternal() {
            const tooltip = this.$refs.tooltip
            if (!tooltip) {
                return
            }

            clearTimeout(this.hideTimeout)
            tooltip.removeAttribute('data-show')
            this.destroyPopper()
        },

        /**
         * Destroys popper instance if not already destroyed.
         */
        destroyPopper() {
            if (this.popperInstance) {
                this.popperInstance.destroy()
                this.popperInstance = null
            }
        },

        /**
         * Handler for keyboard down events. Hides tooltip on Esc
         */
        handleKeyDown(event) {
            if (event.code === 'Escape') {
                this.hide(event)
            }
        },
    },
}
</script>

<style lang="scss">
@import '~@/assets/sass/color.scss';

.aibidia-tooltip {
    display: none;
    background-color: $grey-lightest;
    box-shadow: 0px 0px 8px $hover-shadow;
    z-index: 1001;
    max-height: 70%;

    &[data-show] {
        display: flex;
        flex-direction: column;
    }

    > div {
        min-height: 0;
    }
}
</style>
