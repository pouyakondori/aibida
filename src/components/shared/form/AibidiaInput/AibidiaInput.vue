<template>
    <div class="aibidia-input">
        <b-field
            class="aibidia-input__editor"
            :class="{'aibidia-input__help--hidden': !showMessage}"
            :type="{'is-danger': !computedValid}"
            :message="computedMessage"
        >
            <b-input
                ref="editor"
                v-model="internalValue"
                :type="type"
                size="is-small"
                :disabled="disabled"
                :maxlength="maxLength"
                :minlength="minLength"
                :required="required"
                :custom-class="computedInputClass"
                :placeholder="placeholder"
                :has-counter="showCounter"
                :rows="textareaRows"
                @focus="handleFocus"
                @blur="handleBlur"
                @input="handleInput"
                @input.native="calculateEditorSize"
            >
            </b-input>
        </b-field>
        <span class="aibidia-input__mirror">
            {{ internalValue }}
        </span>
    </div>
</template>

<script>
/**
 * Form input wrapper for text or number values.
 */

export default {
    props: {
        /**
         * Initial value for the input.
         */
        value: {
            type: [String, Number],
            default: null,
        },
        /**
         * Data type for the input. One of [text, password, email, number, url, tel, search, date, datetime, datetime-local, month, week, time, range, or color]
         */
        type: {
            type: String,
            default: 'text',
        },
        /**
         * Is this form field required.
         */
        required: {
            type: Boolean,
            default: false,
        },
        /**
         * Is this form field disabled.
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Minimum length of input string. Set null for no minimum.
         */
        minLength: {
            type: Number,
            default: null,
        },
        /**
         * Maximum length of input string. Set null for no maximum.
         */
        maxLength: {
            type: Number,
            default: null,
        },

        /**
         * If field type is number, the minimum value for this number. Set null for no minimum.
         */
        min: {
            type: Number,
            default: null,
        },
        /**
         * If field type is number, the maximum value for this number. Set null for no maximum.
         */
        max: {
            type: Number,
            default: null,
        },
        /**
         * If field type is number, the step amount to increment or decrement this value. Set null for no step.
         */
        step: {
            type: Number,
            default: null,
        },
        /**
         * Error object to display in case of errors.
         */
        error: {
            type: Object,
            default: null,
        },
        /**
         * Optional message string to display.
         */
        message: {
            type: String,
            default: null,
        },
        /**
         * Optional custom classes added to fields.
         */
        customClass: {
            type: Object,
            default: null,
        },
        /**
         * Optional placeholder for input field.
         */
        placeholder: {
            type: String,
            default: null,
        },

        /**
         * Minimum height of the field in px.
         */
        minHeight: {
            type: Number,
            default: 27,
        },
        /**
         * Minimum width of the field in px.
         */
        minWidth: {
            type: Number,
            default: 200,
        },

        /**
         * If message is displayed.
         */
        showMessage: {
            type: Boolean,
            default: true,
        },
        /**
         * If character counter is displayed.
         */
        showCounter: {
            type: Boolean,
            default: true,
        },
        textareaRows: {
            type: Number,
            default: null,
        },
    },

    data() {
        return {
            /**
             * Internal variable for value
             */
            internalValue: null,
            /**
             * Internal variable for value validity
             */
            internalValid: true,
            /**
             * Initial width for resizeable textarea. Defaults to minWidth prop.
             * @deprecated
             */
            initialWidth: this.minWidth,
            /**
             * Is the field currently focused.
             */
            focused: false,
        }
    },

    computed: {
        /**
         * @returns {?string} Null, message or error message to be displayed.
         */
        computedMessage() {
            if (this.internalValid === true) {
                return this.message
            }

            if (this.error && this.error.message) {
                return this.error.message
            }

            return null
        },

        /**
         * @returns {boolean} returns false if field is not marked valid or has errors. Otherwise returns true.
         */
        computedValid() {
            if (this.internalValid === false) {
                return false
            }

            if (this.error) {
                return false
            }

            return true
        },

        /**
         * @returns {?string} Computes input class name if customClass prop has it. Otherwise returns null.
         */
        computedInputClass() {
            if (this.customClass && this.customClass.input) {
                const className = this.customClass.input

                return className
            }

            return null
        },
    },

    watch: {
        value(newVal, oldVal) {
            if (newVal !== this.internalValue) {
                this.internalValue = newVal

                this.$nextTick().then(() => {
                    this.calculateEditorSize()
                })
            }
        },
    },

    mounted() {
        this.internalValue = this.value
        this.$nextTick().then(() => {
            this.calculateEditorSize()
        })
    },

    methods: {
        /**
         * Calculates the editor size. Textarea is calculated differently from the rest.
         */
        calculateEditorSize() {
            if (this.type === 'textarea') {
                const textArea = this.$refs.editor.$el.firstChild
                // Reset field height
                textArea.style.height = this.minHeight + 'px'
                textArea.style.paddingBottom = null

                // Calculate the height
                let height = textArea.scrollHeight + 2 // 2 = top/bottom-border

                if (this.maxLength && this.focused) {
                    // Add 12 to height, so text does not go over the counter
                    height += 12
                    textArea.style.paddingBottom = '12px'
                }

                textArea.style.height = height + 'px'
            } else {
                const input = this.$refs.editor.$el.firstChild
                const styles = getComputedStyle(input)

                const parent = this.$el
                const mirror = this.$el.lastElementChild

                mirror.style.padding = styles['padding']
                mirror.style.border = styles['border']
                mirror.style.fontSize = styles['fontSize']

                if (mirror.clientWidth > this.minWidth) {
                    input.style.width = mirror.clientWidth + 'px'
                } else {
                    input.style.width = this.minWidth + 'px'
                }
            }
        },

        /**
         * Event handler when the input changes. Validates and if valid, emits input signal.
         */
        handleInput() {
            this.validateInput()

            if (this.internalValid) {
                this.$emit('input', this.internalValue)
            }
        },

        /**
         * Validates the input. Emits valid signal.
         */
        validateInput() {
            this.internalValid = this.$refs.editor.checkHtml5Validity()
            this.$emit('valid', this.internalValid)
        },

        /**
         * Event handler when input gains focus. Triggers validation.
         */
        handleFocus() {
            this.focused = true

            if (this.type === 'textarea') {
                const textArea = this.$refs.editor.$el.firstChild

                // Calculate the height
                let height = textArea.scrollHeight + 2 // 2 = top/bottom-border

                if (this.maxLength) {
                    // Add 12 to height, so text does not go over the counter
                    height += 12
                    textArea.style.paddingBottom = '12px'
                }

                textArea.style.height = height + 'px'
            }

            this.validateInput()
        },

        /**
         * Event handler when input loses focus. Does not trigger validation.
         */
        handleBlur() {
            this.focused = false

            // Reduce the input height on blur
            // because the counter is hidden.
            if (this.type === 'textarea' && this.maxLength) {
                const textArea = this.$refs.editor.$el.firstChild
                textArea.style.paddingBottom = null

                let height = textArea.scrollHeight + 2 // 2 = top/bottom-border
                height -= 12

                textArea.style.height = height + 'px'
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.aibidia-input {
    &__editor {
        margin-bottom: 0 !important;
    }

    &__mirror {
        position: fixed;
        top: -9999px;
        left: -9999px;
        visibility: hidden;
    }
}
</style>

<style lang="scss">
.aibidia-input {
    .textarea:not([rows]) {
        min-height: 27px;
        max-height: 150px;
    }

    .textarea[rows='1'],
    .textarea[rows='2'] {
        min-height: 2em;
    }

    .textarea[rows='3'] {
        min-height: 4em;
    }

    .textarea[rows='4'] {
        min-height: 6em;
    }

    .textarea[rows='5'] {
        min-height: 8em;
    }

    &__editor {
        > .control .help.counter {
            position: absolute;
            bottom: -1px;
            right: 10px;
        }
    }

    &__help {
        &--hidden {
            .help {
                display: none;
            }
        }
    }
}
</style>
