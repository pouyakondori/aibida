<template>
    <b-field
        :type=" { 'is-danger': !valid }"
        :style="{ width: width ? `${width}px` : 'initial' }"
    >
        <b-autocomplete
            ref="autocomplete"
            v-model="internalValue"
            size="is-small"
            class="aibidia-autocomplete"
            :append-to-body="appendToBody"
            :icon="icon"
            :icon-pack="iconPack"
            :open-on-focus="true"
            :data="filteredData"
            :disabled="disabled"
            :field="field"
            :keep-first="keepFirstComputed"
            :maxlength="maxLength"
            :has-counter="false"
            :placeholder="placeholder"
            @focus="focusInput"
            @click.native="openDropdown"
            @keydown.native="keyDown"
            @keyup.native="keyUp"
            @blur="handleValueChange($event, null)"
            @select="(option) => handleValueChange(null, option)"
        >
            <template slot-scope="props">
                <div :title="props.option[field]">
                    {{ props.option[field] }}
                </div>
            </template>
        </b-autocomplete>
    </b-field>
</template>

<script>
/**
 * This component is a wrapper for Buefy Autocomplete field. It provides UI field,
 * where user can pick from preselected list an item, or type a string and filter the
 * itemslist, so that picking the right item is easier.
 */
import { isEmpty } from 'lib/helpers'

export default {
    props: {
        /**
         * Initial value, which is set to internal value.
         * Can be either Object, String or Number
         */
        value: {
            type: [Object, String, Number],
            default: null,
        },
        /**
         * Use this key to pick the value from the selected item in data array.
         */
        keyProperty: {
            type: String,
            default: 'Id',
        },
        /**
         * Disabled state for the field
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Data-set of options/suggestions.
         */
        data: {
            type: Array,
            default: null,
        },
        /**
         * Property of the object (if data is array of objects) to use as
         * display text, and to keep track of selected option
         */
        field: {
            type: String,
            required: true,
        },
        /**
         * If user selects item which does not exist, this callback is called
         * TODO: Change to $emit event 'create:option'
         */
        createOptionCallback: {
            type: Function,
            default: null,
        },
        /**
         * Enable filtering of data.
         */
        filter: {
            type: Boolean,
            default: true,
        },
        /**
         * Width of the wrapper element in pixels (or null = initial width)
         */
        width: {
            type: Number,
            default: null,
        },
        /**
         * Setting this attribute always has the first item selected
         */
        keepFirst: {
            type: Boolean,
            default: true,
        },
        /**
         * Maximum length of user inputted filter string
         */
        maxLength: {
            type: Number,
            default: 255,
        },
        /**
         * Placeholder to show when no input is entered
         */
        placeholder: {
            type: String,
            default: null,
        },
        /**
         * If this field is required
         */
        required: {
            type: Boolean,
            default: false,
        },
        /**
         * Optional icon shown next to the field
         */
        icon: {
            type: String,
            default: null,
        },
        /**
         * Which FontAwesome iconpack to use
         */
        iconPack: {
            type: String,
            default: 'fas',
        },
        appendToBody: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            /**
             * Internal value string (user inputted or selected).
             */
            internalValue: '',
            /**
             * Original value stored. Used if user cancels editing
             */
            originalValue: '',
            /**
             * If user inputted item is valid item from data list
             */
            valid: true,
            /**
             * Timer for debouncing select events.
             */
            selectDebounce: null,
            /**
             * Timer for debouncing change events.
             */
            changeDebounce: null,
        }
    },

    computed: {
        /**
         * Returns array of objects from data that have "field" property
         * similar to user inputted string. Converts items to string,
         * lowercases and tests partial string (indexOf(needle)) match.
         * @returns {Object[]}
         */
        filteredData() {
            if (!this.valid) {
                return this.data || []
            }

            if (this.filter) {
                if (
                    !this.internalValue ||
                    this.internalValue === this.originalValue
                ) {
                    return this.data || []
                }

                // Pick all items from the data-set which fuzzy-matches the
                // internalValue string
                return this.data.filter(option => {
                    return (
                        option &&
                        option[this.field] &&
                        option[this.field]
                            .toString()
                            .toLowerCase()
                            .indexOf(this.internalValue.toLowerCase()) > -1
                    )
                })
            }

            return this.data || []
        },

        /**
         * Computes whether to keep first item always selected from items.
         * Results false if it is possible to create options.
         * @returns {boolean}
         */
        keepFirstComputed() {
            return this.keepFirst && !this.createOptionCallback
        },
    },

    watch: {
        /**
         * Watches for data-set changes. Clears internal value.
         */
        data() {
            this.setInternalValue(this.value)
        },

        /**
         * Watches for external initial value change, and sets the internal value
         */
        value(newValue) {
            this.setInternalValue(newValue)
        },

        /**
         * Watches for internal value change
         */
        internalValue(newValue) {
            if (isEmpty(newValue)) {
                this.valid = true
            }
        },

        /**
         * Watches and emits valid property
         */
        valid(newValue) {
            this.$emit('valid', newValue)
        },
    },

    mounted() {
        this.setInternalValue(this.value)
    },

    methods: {
        /**
         * Opens the dropdown.
         */
        openDropdown() {
            if (this.$refs.autocomplete) {
                this.$refs.autocomplete.isActive = true
            }
        },

        /**
         * Handler for value change event.
         *
         * In case option has been changed to non-existing item, this method
         * will call findOrCreateOption to create it. Otherwise it just selects
         * the option.
         *
         * Debounces function for 250 to prevent event flooding.
         *
         * @param {Event} event Optional JS event.
         * @param {Object} option The item that was selected from the list
         */
        handleValueChange(event, option) {
            clearTimeout(this.changeDebounce)
            this.changeDebounce = setTimeout(() => {
                if (event) {
                    this.findOrCreateOption(event)
                } else if (option) {
                    this.selectOption(option)
                }
            }, 250)
        },

        /**
         * Makes sure either the option matches some item from the data-set,
         * or creates it (if createOptionCallback is defined)
         *
         * @param {Event} event
         */
        async findOrCreateOption(event) {
            const value = event.target.value
            let newValue = null

            if (value) {
                // Always trim input value
                const trimmedValue = value.trim()

                let existing = this.data.find(option => {
                    const optionStr =
                        option &&
                        option[this.field] &&
                        option[this.field].toString().toLowerCase()

                    return optionStr === trimmedValue.toLowerCase()
                })

                if (!existing && this.createOptionCallback) {
                    existing = await this.createOptionCallback(trimmedValue)
                }

                newValue = existing

                if (!newValue) {
                    this.valid = false
                    return
                }
            }

            if (newValue === null || newValue[this.keyProperty]) {
                this.selectOption(newValue)
            }
        },

        /**
         * Selects item from data-set and if option is valid item, emits
         * select and input events.
         *
         * @param {Object} option Item from data-set.
         */
        selectOption(option) {
            const value = (option && option[this.keyProperty]) || null

            if (this.required) {
                if (option === null || value === null) {
                    this.valid = false
                } else {
                    this.valid = true
                }
            } else {
                this.valid = true
            }

            if (value !== this.value && this.valid) {
                this.$emit('select', option)
                this.$emit('input', value)
            }
        },

        /**
         * Sets internal value, that is where the data keyProperty is value.
         *
         * @param {number, string, Object} value Value to be set
         */
        setInternalValue(value) {
            if (!this.data) {
                return
            }

            const selected = this.data.find(op => op[this.keyProperty] == value)
            this.internalValue = (selected && selected[this.field]) || ''
            this.originalValue = (selected && selected[this.field]) || ''

            this.valid = true
        },

        /**
         * Focuses the input for the keyboard entry.
         *
         * @param {Event} event
         */
        focusInput(event) {
            event.target.select()
            if (
                this.keepFirstComputed &&
                this.originalValue === this.internalValue
            ) {
                this.$nextTick().then(() => {
                    const selectedOption = this.data.find(
                        op => op[this.keyProperty] == this.value
                    )

                    if (this.$refs.autocomplete) {
                        this.$refs.autocomplete.setHovered(selectedOption)
                    }
                })
            }
        },

        /**
         * Handler for keyDown event.
         *
         * Escape cancels the value change and reverts back to original value.
         * Enter or Tab submits the value.
         *
         * @param {Event} event
         */
        async keyDown(event) {
            // Reset value if user presses esc.
            if (event.key === 'Escape') {
                event.stopImmediatePropagation()
                event.preventDefault()

                this.setInternalValue(this.value)
            }

            // Set current value if user presses enter.
            if (event.key === 'Enter' || event.key === 'Tab') {
                await this.findOrCreateOption(event)

                if (!this.valid) {
                    if (this.$refs.autocomplete) {
                        this.$refs.autocomplete.isActive = true
                    }

                    event.stopImmediatePropagation()
                    event.preventDefault()
                } else {
                    event.target.blur()
                    if (this.$refs.autocomplete) {
                        this.$refs.autocomplete.isActive = false
                    }
                }
            }
        },
        /**
         * Handler for keyUp event.
         *
         * Escape cancels the default behaviour.
         *
         * @param {Event} event
         */
        async keyUp(event) {
            if (event.key === 'Escape') {
                event.stopImmediatePropagation()
                event.preventDefault()
            }
        },
    },
}
</script>

<style lang="scss">
</style>
