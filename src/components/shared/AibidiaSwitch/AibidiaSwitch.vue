<template>
    <div class="aibidia-switch">
        <div class="aibidia-switch__container">
            <span
                v-if="falseValueLabel"
                class="aibidia-switch__left-option"
                :class="{ 'disabled' : disabled }"
                @click="handleValueChange(falseValue)"
            >
                {{ falseValueLabel }}
            </span>
            <b-switch
                v-model="internalValue"
                name="switch"
                type="is-success"
                class="switch--no-shadow switch__toggle"
                :false-value="falseValue"
                :true-value="trueValue"
                :disabled="disabled"
                @input="handleValueChange"
            >
                <slot />
            </b-switch>
            <span
                v-if="trueValueLabel"
                class="aibidia-switch__right-option"
                :class="{ 'disabled' : disabled }"
                @click="handleValueChange(trueValue)"
            >
                {{ trueValueLabel }}
            </span>
        </div>
    </div>
</template>

<script>
/**
 * Wrapper for Buefy b-switch toggleable input field.
 */
export default {
    props: {
        /**
         * Initial value for the input switch.
         */
        value: {
            type: [Boolean, String, Number],
            default: null,
        },
        /**
         * Optional label to show if input value is true
         */
        trueValueLabel: {
            type: String,
            default: null,
        },
        /**
         * Optional label to show if input value is false
         */
        falseValueLabel: {
            type: String,
            default: null,
        },
        /**
         * Optional value for "true" state for the input
         */
        trueValue: {
            type: [Boolean, String, Number],
            default: true,
        },
        /**
         * Optional value for "false" state for the input
         */
        falseValue: {
            type: [Boolean, String, Number],
            default: false,
        },
        /**
         * Any custom classes passed to b-switch
         */
        customClass: {
            type: String,
            default: null,
        },
        /**
         * Disabled state for the switch
         */
        disabled: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            /**
             * Internal value
             */
            internalValue: null,
        }
    },

    watch: {
        /**
         * Watch external value changes
         */
        value(newVal) {
            this.internalValue = newVal
        },
    },

    mounted() {
        this.internalValue = this.value
    },

    methods: {
        /**
         * Handler for b-input value changes.
         * Forwards input event.
         *
         * @param {boolean} value
         */
        handleValueChange(value) {
            if (!this.disabled) {
                this.internalValue = value
                this.$emit('input', this.internalValue)
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.aibidia-switch {
    &__container {
        display: flex;
        flex-direction: row;
        margin-top: 0px;
        height: 27px;
        line-height: 27px;
    }

    &__left-option {
        padding-right: 0.5em;
        cursor: pointer;
        align-self: flex-start;

        &.disabled {
            cursor: not-allowed;
        }
    }

    &__right-option {
        cursor: pointer;
        display: inline-block;

        &.disabled {
            cursor: not-allowed;
        }
    }

}
</style>
