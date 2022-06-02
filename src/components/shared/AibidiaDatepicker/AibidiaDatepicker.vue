<template>
    <b-field style="margin-bottom: 0">
        <b-datepicker
            v-model="internalValue"
            :placeholder="placeholder"
            :focused-date="focusedDate"
            :min-date="minDate"
            :max-date="maxDate"
            :years-range="yearsRange"
            :date-formatter="formatDatepickerDate"
            :disabled="disabled"
            :style="styles"
            :position="position"
            class="aibidia-datepicker"
            size="is-small"
            icon="calendar-check"
            @input="$emit('input', $event)"
        >
        </b-datepicker>
        <div
            v-if="showClearIcon"
            class="aibidia-datepicker__clear control"
            @click="clearInput"
        >
            <i class="aibidia-datepicker__clear-icon fas fa-times" />
        </div>
    </b-field>
</template>

<script>
import { formatDate } from 'lib/helpers'
import { DateConversions } from 'misc/constants'

export default {
    props: {
        /**
         * Initial value for Date.
         */
        value: {
            type: Date,
            default: null,
        },
        /**
         * Minimum allowed date (inclusive)
         */
        minDate: {
            type: Date,
            default: null,
        },
        /**
         * Maximum allowed date (inclusive)
         */
        maxDate: {
            type: Date,
            default: null,
        },
        /**
         * Which date is focused. Defaults to current date.
         */
        focusedDate: {
            type: Date,
            default: () => {
                return new Date()
            },
        },
        /**
         * Placeholder string to be displayed if value is not set
         */
        placeholder: {
            type: String,
            default: '',
        },
        /**
         * Years range relative to selected year
         */
        yearsRange: {
            type: Array,
            default: () => {
                return [-100, 3]
            },
        },
        /**
         * Is the field disabled
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Show icon next to datepicker which can be used to clear the value
         */
        showClearIcon: {
            type: Boolean,
            default: true,
        },
        /**
         * Additional styles to be appended to datepicker element
         */
        styles: {
            type: String,
            default: '',
        },
        /**
         * Where to open the datepicker dropdown.
         */
        position: {
            type: String,
            default: 'is-bottom-left',
            validator: function (value) {
                // The value must match one of these strings
                return (
                    ['is-top-right', 'is-top-left', 'is-bottom-left'].indexOf(
                        value
                    ) !== -1
                )
            },
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
         * Watches for external value. Overrides internal value.
         */
        value(newVal, oldVal) {
            this.internalValue = newVal
        },
    },

    mounted() {
        this.internalValue = this.value
    },

    methods: {
        /**
         * Method to format value to DatePicker accepted format
         *
         * @param {Date} value
         * @returns {Date} Formatted date
         */
        formatDatepickerDate(value) {
            return formatDate(value, DateConversions.ToYearLast)
        },
        /**
         * Clears dateinput and sets value to null.
         * Click-handler for optional clear-button.
         * Emits input change.
         */
        clearInput() {
            this.$emit('input', null)
            this.internalValue = null
        },
    },
}
</script>

<style lang="scss">
@import '~@/assets/sass/color.scss';

.aibidia-datepicker {
    width: 100%;

    &.datepicker {
        .dropdown-content,
        .dropdown-item {
            padding: 0.25rem;
        }

        span.select select {
            min-width: unset;
        }

        .datepicker-header {
            padding-bottom: 0.35rem;
            margin-bottom: 0.35rem;
        }

        .datepicker-content {
            height: unset;
        }

        .datepicker-cell {
            padding: 0.2rem 0.7rem;
        }
    }

    &__clear {
        width: 27px;
        margin-left: -27px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 5;
        cursor: pointer;
    }

    &__clear-icon {
        font-size: 0.75rem;
        color: $grey-lighter;
        height: 8px;
    }
}
</style>
