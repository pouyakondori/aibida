
<template>
    <section
        v-if="content"
        class="overlay"
        :class="overlayClass"
    >
        <div class="overlay__container">
            <div class="overlay__content">
                <p class="overlay__text">
                    {{ content.text }}
                </p>

                <div class="overlay__button-container">
                    <template v-for="(button, key) in content.buttons">
                        <div :key="key">
                            <a-primary-button
                                v-if="button.link"
                                class="margin-b-1 overlay__button"
                                icon="fas fa-caret-right"
                                icon-align="right"
                                :route="button.link"
                            >
                                Go To {{ button.text }}
                            </a-primary-button>

                            <button
                                v-if="button.action"
                                class="button is-success is-small overlay__button"
                                @click="button.action"
                            >
                                <span class="icon is-small">
                                    <i :class="button.icon" />
                                </span>
                                <span>
                                    {{ button.text }}
                                </span>
                            </button>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
/**
 * This component is used when need to show absolute positioned, centered
 * information with additional actions to user.
 *
 * Used in case table has no entries, and user must go elsewhere to fill
 * in the data first.
 */

export default {
    props: {
        /**
         * Content to display in overlay
         * TODO: Change to use slots and view components.
         */
        content: {
            type: Object,
            default: null,
        },
        /**
         * Is overlay transparent
         */
        transparent: {
            type: Boolean,
            default: false,
        },
        /**
         * Should we add depth effect to the overlay?
         */
        depth: {
            type: Number,
            default: 0,
        },
    },

    computed: {
        overlayClass() {
            return {
                'overlay--transparent': this.transparent,
                'depth-8': this.depth === 8,
            }
        },
    },
}
</script>

<style lang="scss">
@import '~@/assets/sass/color.scss';

.overlay {
    position: absolute;
    background-color: rgba(10, 10, 10, 0.86);
    top: 0;
    left: 0;
    z-index: 103;
    right: 0;
    bottom: 0;
    overflow: hidden;
    display: flex;
    align-items: center;

    &--transparent {
        background-color: transparent;
    }

    &__container {
        margin: 0 auto;
    }

    &__content {
        padding: 0 20%;
        text-align: center;
    }

    &__text {
        color: $grey;
        font-size: 1rem;
        padding-bottom: 10px;
    }

    &__button-container {
        display: inline-block;
    }

    &__button {
        width: 100%;
    }
}
</style>
