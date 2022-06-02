<template>
    <section class="a-menu-section">
        <div
            class="a-menu-header"
            @click="toggleCollapse"
        >
            <span class="label">
                <span>{{ label }}</span>
                <i
                    class="fas toggle-arrow"
                    :class="{
                        'fa-caret-down': isCollapsed,
                        'fa-caret-up': !isCollapsed}"
                />
            </span>
        </div>
        <ul v-show="!isCollapsed">
            <slot />
        </ul>
    </section>
</template>

<script>
/**
 * Collapseable sidemenu section
 */

export default {
    props: {
        /**
         * Sidemenu section text label
         */
        label: {
            type: String,
            default: 'Section',
        },
    },

    data() {
        return {
            /**
             * Internal state if sidemenu-section is collapsed
             */
            isCollapsed: false,
        }
    },

    methods: {
        /**
         * Collapse sidemenu section programmatically.
         */
        collapse() {
            this.isCollapsed = true
            this.$emit('section:collapse')
        },

        /**
         * Uncollapse sidemenu section programmatically
         */
        uncollapse() {
            this.isCollapsed = false
            this.$emit('section:uncollapse')
        },

        /**
         * Toggle sidemenu section collapse state
         */
        toggleCollapse() {
            if (this.isCollapsed) {
                this.uncollapse()
            } else {
                this.collapse()
            }
        },

        /**
         * Recalculate all child submenu positions in default slot
         */
        recalculatePosition() {
            const elements = this.$slots.default
            for (const i in elements) {
                const el = elements[i]
                if (el && el.componentInstance) {
                    const i = el.componentInstance
                    if (typeof i.recalculatePosition === 'function') {
                        i.recalculatePosition()
                    }
                }
            }
        },
    },
}
</script>


<style lang="scss">
@import '~@/assets/sass/color.scss';
.a-menu-section {
    margin-top: 4px;
    margin-bottom: 4px;
    flex-grow: 0;

    ul {
        list-style: none;
        line-height: 1.25;
    }

    > .a-menu-header {
        > .label {
            background-color: $primary;
            color: $primary-invert;
            font-size: 0.75em;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            border-radius: 2px;
            margin: 0;
            padding: 0;
            padding-left: 15px;
            padding-right: 5px;
            margin-top: -5px;
            padding-top: 5px;
            margin-bottom: -5px;
            padding-bottom: 5px;
            transition: padding 0.3s, margin 0.3s;
            cursor: pointer;
            user-select: none;
        }

        margin-bottom: 5px;
        padding-top: 5px;
        padding-bottom: 5px;
    }
}

.a-sidemenu .a-menu-section .a-menu-item > a > span {
    opacity: 1;
    transition: opacity 0.1s;
}

.a-sidemenu.is-collapsed .a-menu-section > .a-menu-header > .label {
    color: transparent;
    padding-top: 0;
    padding-bottom: 0;
    margin-top: 0;
    margin-bottom: 0;
}

.a-sidemenu.is-collapsed .a-menu-section .a-menu-item > a > span {
    opacity: 0;
}

@media screen and (min-width: 769px), print {
    .a-menu-section {
        width: calc(100% - 0.75rem);
        min-width: 0;
    }
}
</style>
