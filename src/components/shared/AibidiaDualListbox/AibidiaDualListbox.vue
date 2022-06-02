<template>
    <div class="aibidia-dual-listbox">
        <!-- Container for unselected options -->
        <div class="aibidia-dual-listbox__container">
            <a-search-input
                v-if="searchable"
                v-model="unSelectedOptionsSearch"
            >
            </a-search-input>
            <div
                class="aibidia-dual-listbox__options-container"
                :class="{'aibidia-dual-listbox__options-container--disabled': disabled}"
                :style="{maxHeight: height + 'px', minHeight: height + 'px'}"
            >
                <template v-for="option in unSelectedOptions">
                    <div
                        :key="option[trackBy]"
                        class="aibidia-dual-listbox__option"
                        :class="{
                            'aibidia-dual-listbox__option--highlight': highlightedOptions[option[trackBy]] !== undefined,
                            'disabled': disabled
                        }"
                        :style="{minHeight: itemHeight + 'px'}"
                        @click="highlightUnselected(option)"
                        @dblclick="moveOptionToSelected(option)"
                    >
                        <div>
                            {{ option[label] }}
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <!-- Container for listbox controls -->
        <div class="aibidia-dual-listbox__control-container">
            <button
                class="aibidia-dual-listbox__control-button button is-primary margin-b-1"
                :disabled="disabled"
                @click="moveToSelected"
            >
                <span class="icon is-small">
                    <i class="fas fa-chevron-right" />
                </span>
            </button>
            <button
                class="aibidia-dual-listbox__control-button button is-primary"
                :disabled="disabled"
                @click="moveToUnselected"
            >
                <span class="icon is-small">
                    <i class="fas fa-chevron-left" />
                </span>
            </button>
        </div>
        <!-- Container for selected options -->
        <div class="aibidia-dual-listbox__container">
            <a-search-input
                v-if="searchable"
                v-model="selectedOptionsSearch"
            >
            </a-search-input>
            <div
                class="aibidia-dual-listbox__selected-container"
                :class="{'aibidia-dual-listbox__selected-container--disabled': disabled}"
                :style="{maxHeight: height + 'px', minHeight: height + 'px'}"
            >
                <template v-for="option in computedSelected">
                    <div
                        :key="option[trackBy]"
                        class="aibidia-dual-listbox__option"
                        :class="{
                            'aibidia-dual-listbox__option--highlight': highlightedOptions[option[trackBy]] !== undefined,
                            'disabled': disabled
                        }"
                        :style="{minHeight: itemHeight + 'px'}"
                        @click="highlightSelected(option)"
                        @dblclick="moveOptionToUnselected(option)"
                    >
                        <div>
                            {{ option[label] }}
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
/**
 * This component is used in scenarios where user need to select multiple options to another list.
 * There is two lists, 'unselected' and 'selected' list side by side. 'Selected' is a list of all the available options for user
 * that are not yet selected, and 'selected' list is a list for user selected options.
 * User has option to select multiple items from each list and press "left" or "right" arrows to move items
 * between selected and unselected lists.
 *
 * It is possible to make each list searchable so user can quickly filter each list to find the needed options.
 */

import AibidiaSearchInput from 'components/shared/form/AibidiaInput/AibidiaSearchInput.vue'

const OptionType = {
    Unselected: 1,
    Selected: 2,
}

const SELECTED_PROP = '__aibidia-dual-listbox-selected__'

export default {
    components: {
        'a-search-input': AibidiaSearchInput,
    },

    props: {
        /**
         * Array of all available options to show in listbox.
         */
        options: {
            type: Array,
            default: () => {
                return []
            },
        },

        /**
         * Array of all selected options to show in listbox.
         */
        value: {
            type: Array,
            default: () => {
                return []
            },
        },

        /**
         * Defines what property of the object is displayed in the listbox.
         */
        label: {
            type: String,
            required: true,
        },

        /**
         * Defines what property of the object is used as an identifier.
         */
        trackBy: {
            type: String,
            required: true,
        },

        /**
         * If true, searching is enabled for both listboxes.
         */
        searchable: {
            type: Boolean,
            default: false,
        },

        /**
         * Enable sorting of options.
         * If enabled, the options are sorted alphabetically by default.
         * Custom compare function can be defined and it is used instead of default.
         */
        sort: {
            type: [Boolean, Function],
            default: false,
        },

        /**
         * If true, selecting and unselecting is disabled.
         */
        disabled: {
            type: Boolean,
            default: false,
        },

        /**
         * Height of the listbox component.
         */
        height: {
            type: Number,
            default: 175,
        },

        /**
         * Height of a listbox option.
         */
        itemHeight: {
            type: Number,
            default: 35,
        },
    },

    data() {
        return {
            /**
             * Internal state for all available options
             */
            internalOptions: {},
            /**
             * Currently highlighted options
             */
            highlightedOptions: {},
            /**
             * Highlighting type. Either selected or unselected.
             */
            highlightingType: null,
            /**
             * Which filter user has inputted to unselected options list.
             */
            unSelectedOptionsSearch: '',
            /**
             * Which filter user has inputted to selected options list.
             */
            selectedOptionsSearch: '',
        }
    },

    computed: {
        /**
         * @returns {Array<Object>} sorted array of objects in unselected list
         */
        unSelectedOptions() {
            const unSelectedOptions = Object.values(
                this.internalOptions
            ).filter(opt => {
                if (opt && opt[SELECTED_PROP] === false) {
                    if (this.searchable && this.unSelectedOptionsSearch) {
                        const match =
                            opt[this.label]
                                .toString()
                                .toLowerCase()
                                .indexOf(
                                    this.unSelectedOptionsSearch.toLowerCase()
                                ) > -1

                        return match
                    }

                    return true
                }

                return false
            })

            if (this.sort) {
                return this.sortOptions(unSelectedOptions)
            }

            return unSelectedOptions
        },

        /**
         * @returns {Array<Object>} sorted array of objects in selected list
         */
        computedSelected() {
            const selectedOptions = Object.values(this.internalOptions).filter(
                opt => {
                    if (opt && opt[SELECTED_PROP] === true) {
                        if (this.searchable && this.selectedOptionsSearch) {
                            const match =
                                opt[this.label]
                                    .toString()
                                    .toLowerCase()
                                    .indexOf(
                                        this.selectedOptionsSearch.toLowerCase()
                                    ) > -1

                            return match
                        }

                        return true
                    }

                    return false
                }
            )

            if (this.sort) {
                return this.sortOptions(selectedOptions)
            }

            return selectedOptions
        },
    },

    watch: {
        options() {
            this.setInternalOptions()
        },

        value() {
            this.setInternalOptions()
        },

        disabled(newVal, oldVal) {
            // Clear highlighted options, when input gets disabled.
            if (newVal) {
                this.highlightedOptions = {}
            }
        },
    },

    mounted() {
        this.setInternalOptions()
    },

    methods: {
        /**
         * Sorts array of objects by object Name parameter.
         *
         * @param {Array<Object>} options Unsorted array of options.
         * @returns {Array<Object>} Sorted (by name) array of options.
         */
        sortOptions(options) {
            let compareFn = (a, b) => a.Name.localeCompare(b.Name)

            if (typeof this.sort === 'function') {
                compareFn = this.sort
            }

            return options.sort(compareFn)
        },

        /**
         * Sets option highlight to Unselected.
         *
         * @param {Object} option Option to unselect
         */
        highlightUnselected(option) {
            this.highlightOption(option, OptionType.Unselected)
        },

        /**
         * Sets option highlight to Selected.
         *
         * @param {Object} option Option to select
         */
        highlightSelected(option) {
            this.highlightOption(option, OptionType.Selected)
        },

        /**
         * Sets option highlight to option type.
         *
         * @param {Object} option Option to select
         * @param {OptionType} optionType OptionType to assign (Selected or Unselected)
         */
        highlightOption(option, optionType) {
            if (this.disabled) {
                return
            }

            let highlightedOptions = { ...this.highlightedOptions }

            if (
                this.highlightingType !== optionType ||
                event.ctrlKey === false
            ) {
                highlightedOptions = {}
            }

            this.highlightingType = optionType

            const trackByValue = option[this.trackBy]

            if (this.highlightedOptions[trackByValue]) {
                delete highlightedOptions[trackByValue]
            } else {
                highlightedOptions[trackByValue] = option
            }

            this.highlightedOptions = highlightedOptions
        },

        /**
         * Moves all highlighted options to selected list
         */
        moveToSelected() {
            if (this.disabled) {
                return
            }

            if (this.highlightingType === OptionType.Unselected) {
                Object.keys(this.highlightedOptions).forEach(key => {
                    this.internalOptions[key][SELECTED_PROP] = true
                })

                this.highlightedOptions = {}
                this.handleSelectedChange()
            }
        },

        /**
         * Moves all highlighted options to unselected list
         */
        moveToUnselected() {
            if (this.disabled) {
                return
            }

            if (this.highlightingType === OptionType.Selected) {
                Object.keys(this.highlightedOptions).forEach(key => {
                    this.internalOptions[key][SELECTED_PROP] = false
                })

                this.highlightedOptions = {}
                this.handleSelectedChange()
            }
        },

        /**
         * Moves an option to selected list
         *
         * @param {Object} option Option to be moved to selected list.
         */
        moveOptionToSelected(option) {
            if (this.disabled) {
                return
            }

            const trackByValue = option[this.trackBy]
            this.internalOptions[trackByValue][SELECTED_PROP] = true

            this.handleSelectedChange()
        },

        /**
         * Moves an option to unselected list
         *
         * @param {Object} option Option to be moved to unselected list.
         */
        moveOptionToUnselected(option) {
            if (this.disabled) {
                return
            }

            const trackByValue = option[this.trackBy]
            this.internalOptions[trackByValue][SELECTED_PROP] = false

            this.handleSelectedChange()
        },

        /**
         * Event handler when selection is changed
         */
        handleSelectedChange() {
            const selected = []

            Object.values(this.internalOptions).forEach(iOpt => {
                if (iOpt[SELECTED_PROP] === true) {
                    const selectedOpt = { ...iOpt }
                    delete selectedOpt[SELECTED_PROP]

                    selected.push(selectedOpt)
                }
            })

            this.$emit('input', selected)
        },

        /**
         * Clears unselected search filter
         */
        clearUnselectedOptionsSearch() {
            this.unSelectedOptionsSearch = ''
        },

        /**
         * Clears selected search filter
         */
        clearSelectedOptionsSearch() {
            this.selectedOptionsSearch = ''
        },

        /**
         * Sets internal options from initial options prop.
         */
        setInternalOptions() {
            this.internalOptions = this.options.reduce((acc, opt) => {
                const internalOpt = {
                    ...opt,
                    [SELECTED_PROP]: false,
                }

                if (
                    this.value &&
                    this.value.length &&
                    this.value.find(
                        sel => sel[this.trackBy] === internalOpt[this.trackBy]
                    )
                ) {
                    internalOpt[SELECTED_PROP] = true
                }

                acc[internalOpt[this.trackBy]] = internalOpt
                return acc
            }, {})
        },
    },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/sass/color.scss';

.aibidia-dual-listbox {
    display: flex;

    &__container {
        width: calc(50% - 18.5px);
        background: $white;
    }

    #option-container {
        flex: none;
        width: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        border: 1px solid $grey-table-border;
    }

    .aibidia-search-input,
    .aibidia-search-input > input {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    #option-container--disabled {
        background-color: $grey-lightest;
        cursor: not-allowed;

        & > * {
            pointer-events: none;
        }
    }

    &__options-container {
        @extend #option-container;

        &--disabled {
            @extend #option-container--disabled;
        }
    }

    &__control-container {
        flex: none;
        width: 37px;
        padding-left: 5px;
        padding-right: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    &__control-button {
        width: 27px;
        height: 27px;
        padding: 0;
    }

    &__selected-container {
        @extend #option-container;

        &--disabled {
            @extend #option-container--disabled;
        }
    }

    &__option {
        width: 100%;
        display: flex;
        padding: 0 4px 0 4px;
        align-items: center;

        // Prevent text selection
        user-select: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;

        &:hover {
            background-color: $purple-lighter;
            cursor: pointer;

            > div {
                word-wrap: break-word;
                white-space: normal;
            }
        }

        > div {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        &--highlight {
            background-color: $grey-lighter;
        }
    }
}
</style>
