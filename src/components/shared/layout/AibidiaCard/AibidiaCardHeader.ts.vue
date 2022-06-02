<template>
    <a-pane
        columns
        class="a-card-header"
        :class="{small}"
    >
        <slot name="before-title" />
        <span
            class="a-title"
        >
            <slot
                v-if="!internalEditingTitle"
                name="title"
            >
                {{ editableTitle }}
            </slot>
            <a-pane
                v-if="internalEditingTitle"
                align-items="flex-start"
            >
                <a-input
                    ref="editorInput"
                    v-model="internalTitle"
                    class="a-title-input"
                    :placeholder="placeholderTitle"
                    :max-length="255"
                    :show-counter="false"
                    :type="'text'"
                    :show-message="!!validationMessage"
                    :message="validationMessage"
                    :error="validationMessage ? { message: validationMessage } : null"
                    @input.native="$emit('validateTitleEdit', internalTitle)"
                >
                </a-input>
            </a-pane>
            <span
                v-if="$slots.subtitle"
                class="a-subtitle"
            >
                <slot name="subtitle" />
            </span>
        </span>
        <a-pane
            v-if="editableTitle !== null"
            columns
            content-separation
            :grow="0"
        >
            <button
                v-if="!internalEditingTitle"
                class="button is-small is-primary is-flat"
                title="Edit title"
                @click="edit"
            >
                <span class="icon">
                    <i class="fas fa-edit" />
                </span>
            </button>
            <button
                v-if="internalEditingTitle"
                class="button is-small is-success is-flat"
                title="Save title edit"
                :disabled="!titleValid"
                @click="save"
            >
                <span class="icon">
                    <i class="fas fa-save" />
                </span>
            </button>
            <button
                v-if="internalEditingTitle"
                class="button is-small is-danger is-flat"
                title="Cancel title edit"
                @click="cancel"
            >
                <span class="icon">
                    <i class="fas fa-times" />
                </span>
            </button>
        </a-pane>
        <slot />
        <a-pane
            v-if="$slots.counter"
            :grow="0"
            class="counter"
            data-cy="entity-counter"
        >
            <b><slot name="counter" /></b>
        </a-pane>
    </a-pane>
</template>

<script lang="ts">
import AibidiaInput from 'components/shared/form/AibidiaInput/AibidiaInput.vue'
import Vue from 'vue'

interface Data {
    /** Is the title currently being edited */
    internalEditingTitle: boolean
    /** Internal state for the title */
    internalTitle: string | null
}

interface Props {
    /** Editable title string */
    editableTitle: string | null
    /** Placeholder for editable title input when title is null */
    placeholderTitle: string | null
    /** Validate message error for invalid title */
    validationMessage: string | null
    /** If the header should be small or regular */
    small: boolean
}

interface Computed {
    /** Is editing title valid? If not, save button is disabled */
    titleValid: boolean
}

interface Methods {
    edit: () => void
    cancel: () => void
    save: () => void
}

/**
 * Component to use with AibidiaCard to add header element to the card.
 * Title is optionally editable, and holds a place for an optional counter.
 *
 * @extends AibidiaPane
 */
export default Vue.extend<Data, Methods, Computed, Props>({
    name: 'AibidiaCardHeader',

    components: {
        'a-input': AibidiaInput,
    },

    props: {
        editableTitle: {
            type: String,
            default: null,
        },
        placeholderTitle: {
            type: String,
            default: null,
        },
        validationMessage: {
            type: String,
            default: null,
        },
        small: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            /**
             * Internal state for editing enabled.
             */
            internalEditingTitle: false,
            /**
             * Current internal title value.
             */
            internalTitle: this.editableTitle,
        }
    },

    computed: {
        titleValid() {
            if (!this.internalEditingTitle) {
                return false
            }

            if (!this.internalTitle) {
                return false
            }

            if (this.validationMessage) {
                return false
            }

            return this.internalTitle.length > 0
        },
    },

    watch: {
        editableTitle() {
            this.internalTitle = this.editableTitle
        },
    },

    methods: {
        edit() {
            if (this.internalEditingTitle) {
                return
            }

            this.internalEditingTitle = true
            this.internalTitle = this.editableTitle
            this.$emit('startTitleEdit')
        },

        cancel() {
            if (!this.internalEditingTitle) {
                return
            }

            this.internalEditingTitle = false
            this.internalTitle = this.editableTitle
            this.$emit('cancelTitleEdit')
        },

        save() {
            if (!this.internalEditingTitle) {
                return
            }

            this.internalEditingTitle = false
            this.$emit('saveTitle', this.internalTitle)
        },
    },
})
</script>

<style lang="scss">
@import '~@/assets/sass/color.scss';

.a-card-header {
    background-color: $purple;
    padding: 0.75rem;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    color: $white;
    min-width: 0;

    > .a-title {
        margin: 0;
        font-weight: 600;
        font-size: 1.25rem;
        color: $white;
        flex-grow: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        > .a-subtitle {
            white-space: nowrap;
            font-weight: 400;
            color: $white;
            font-size: 1.25rem;
            margin-left: 0.375rem;
        }
    }

    &.small {
        padding: 0.5rem;
        > .a-title {
            font-size: 0.75rem;
        }
    }

    .a-title-input .input.is-small {
        font-size: 1.25rem;
        padding-top: 0;
        padding-bottom: 0;
        height: 27px;
        border: none;
    }

    .help.is-danger {
        color: $danger-invert;
    }
}
</style>
