<template>
    <b-input
        v-model="computedValue"
        placeholder="Search..."
        type="text"
        icon-pack="fas"
        :icon="hideIcon ? '' : 'search'"
        icon-right="fas fa-times"
        icon-right-clickable
        size="is-small"
        class="aibidia-search-input"
        :disabled="disabled"
        @icon-right-click="clearValue"
    >
    </b-input>
</template>

<script>
/**
 * Special input wrapper for search inputs.
 */
export default {
    props: {
        /**
         * Initial value for the search.
         */
        value: {
            type: String,
            default: null,
        },
        /**
         * Is icon not visible. Otherwise 'search' icon is shown from FontAwesome package.
         */
        hideIcon: {
            type: Boolean,
            default: false,
        },
        /**
         * Is input disabled?
         */
        disabled: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            /**
             * Internal state for input value.
             */
            internalValue: null,
        }
    },

    computed: {
        /**
         * Get or set the internal value.
         */
        computedValue: {
            get() {
                return this.internalValue
            },
            set(newVal) {
                this.internalValue = newVal
                this.$emit('input', this.internalValue)
            },
        },
    },

    watch: {
        /**
         * Watch for external value changes
         */
        value() {
            this.internalValue = this.value
        },
    },

    mounted() {
        this.internalValue = this.value
    },

    methods: {
        /**
         * Clears the input value.
         */
        clearValue() {
            this.internalValue = null
            this.$emit('input', this.internalValue)
        },
    },
}
</script>

<style lang="scss">
@import '~@/assets/sass/color.scss';
.aibidia-search-input {
    flex-grow: 1;
    &.control {
        .input {
            padding-top: 7px;
        }

        .icon {
            padding-top: 3px;
        }
    }

    > .is-clickable {
        &:hover {
            color: $red;
        }
    }
}
</style>
