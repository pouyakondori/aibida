<template>
    <button
        :disabled="disabled"
        class="default-button"
        :class="buttonClass"
        @click="handleClick"
    >
        <span
            v-if="icon && iconAlign === 'left'"
            :class="iconClass"
        >
            <i :class="icon" />
        </span>

        <span v-if="$slots.default">
            <slot>
                OK
            </slot>
        </span>

        <span
            v-if="icon && iconAlign === 'right'"
            :class="iconClass"
        >
            <i :class="icon" />
        </span>
    </button>
</template>

<script lang="ts">
import Vue from 'vue'
import { RawLocation } from 'vue-router'

import type { BulmaModifiers } from 'types/BulmaModifiers'

interface Props {
    /** Button loading state */
    loading: boolean
    /** Small or regular button */
    small: boolean
    /** Disabled state */
    disabled: boolean
    /** Outlined button */
    outlined: boolean
    /** Whether icon is right or left */
    iconAlign: string
    /** Icon class (fa or fas class name) */
    icon: string | null
    /** Optional route for navigation buttons */
    route: RawLocation | null
}
interface Computed {
    /** Compute button class based on props */
    buttonClass: BulmaModifiers
    /** Compute icon class based on props */
    iconClass: BulmaModifiers
}
interface Methods {
    /** Click event handler */
    handleClick: (event: Event) => void
}

/**
 * Baseclass for all Buttons. You should use this class instead of HTML5 <button>
 */
export default Vue.extend<void, Methods, Computed, Props>({
    name: 'AibidiaButtons',

    props: {
        loading: {
            type: Boolean,
            default: false,
        },
        small: {
            type: Boolean,
            default: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        outlined: {
            type: Boolean,
            default: false,
        },
        iconAlign: {
            type: String,
            default: 'left',
            validator: function (value): boolean {
                // The value must match one of these strings
                return ['left', 'right'].indexOf(value) !== -1
            },
        },
        icon: {
            type: String,
            default: null,
        },
        route: {
            type: [String, Object],
            default: null,
        },
    },

    computed: {
        buttonClass(): BulmaModifiers {
            return {
                button: true,
                'is-small': this.small,
                'is-outlined': this.outlined,
                'is-loading': this.loading,
                left: this.iconAlign === 'left',
                right: this.iconAlign === 'right',
            }
        },
        iconClass(): BulmaModifiers {
            return {
                icon: true,
                'is-small': this.small,
            }
        },
    },

    methods: {
        handleClick(event): void {
            if (this.route) {
                this.$router.push(this.route)
            }

            this.$emit('click', event)
        },
    },
})
</script>
