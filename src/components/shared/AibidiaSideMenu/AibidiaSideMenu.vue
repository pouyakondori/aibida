<template>
    <menu
        class="a-sidemenu"
        :class="menuClass"
        @mouseover="handleMouseOver"
        @mouseleave="handleMouseLeave"
    >
        <div class="a-header">
            <slot name="brand">
                <solution-logo
                    data-cy="menu-solution-logo"
                    :main-only="isCollapsed"
                    :small="isCollapsed"
                >
                </solution-logo>
            </slot>
            <div
                v-if="showStickyIcon"
                class="sticky-icon"
                :title="stickyIconTitle"
            >
                <i
                    :class="stickyIconClass"
                    data-cy="menu-sticky-thumbtack"
                    @click="toggleSticky"
                />
            </div>
            <button
                class="a-menu-toggle"
                :class="{ 'is-open': isOpen }"
                @click="toggleOpen"
            >
                <span />
                <span />
                <span />
            </button>
        </div>
        <div
            class="a-content"
            @scroll="handleContentScroll"
        >
            <slot />
        </div>
    </menu>
</template>

<script>
/**
 * Reusable SideMenu component. Support stickiness and collapseable to icon menu.
 * Stickiness = Do not collapse menu, if mouse is left from the sidebar area.
 * Collapse = Show icons instead of full text menuitems.
 */

import Logo from 'components/shared/Logo/Logo.vue'

export default {
    components: {
        'solution-logo': Logo,
    },

    props: {
        /**
         * Control sidemenu stickiness default value
         */
        sticky: {
            type: Boolean,
            default: true,
        },
        /**
         * Show sticky icon in menu (only on uncollapsed state)
         */
        showStickyIcon: {
            type: Boolean,
            default: true,
        },
    },

    data() {
        return {
            /**
             * Internal state for stickiness
             */
            isSticky: this.sticky,
            /**
             * Internal state for openness (mobile menu)
             */
            isOpen: false,
            /**
             * Internal state for collapsed
             */
            isCollapsed: false,
            /**
             * Prevent collapsing. Used to prevent collapse happening if
             * collapse state just have been changed.
             */
            preventCollapse: false,
        }
    },

    computed: {
        /**
         * Classes for sticky icon
         *
         * @returns {{
         *      'fas fa-thumbtack': boolean,
         *      'fa-thumbtack--active': boolean,
         * }}
         */
        stickyIconClass() {
            return {
                'fas fa-thumbtack': true,
                'fa-thumbtack--active': !this.isSticky,
            }
        },
        /**
         * Title for sticky icon depending of stickiness
         *
         * @returns {string}
         */
        stickyIconTitle() {
            if (this.isSticky) {
                return 'Always show side menu'
            }

            return 'Show side menu only on mouse over'
        },
        /**
         * Classes for menu element
         *
         * @returns {{
         *      'is-open': boolean,
         *      'is-closed': boolean,
         *      'collapsed': boolean,
         *      'is-sticky': boolean,
         *      'is-not-sticky': boolean,
         * }}
         */
        menuClass() {
            return {
                'is-open': this.isOpen,
                'is-closed': !this.isOpen,
                'is-collapsed': this.isCollapsed,
                'is-sticky': this.isSticky,
                'is-not-sticky': !this.isSticky,
            }
        },
    },

    watch: {
        /**
         * Watcher for external sticky state
         */
        sticky(newVal) {
            this.isSticky = newVal
            if (!this.isSticky && !this.preventCollapse) {
                this.collapse()
            }
        },
    },

    mounted() {
        // By default, let's collapse
        this.collapse()
    },

    methods: {
        /**
         * Expand sidemenu from collapsed state (only if not sticky)
         */
        expand() {
            if (this.isCollapsed && !this.isSticky) {
                this.setCollapse(false)
            }
        },

        /**
         * Collapse sidemenu from uncollapsed state (only if not sticky)
         */
        collapse() {
            if (!this.isCollapsed && !this.isSticky) {
                this.setCollapse(true)
            }
        },

        /**
         * Keep sidemenu uncollapsed by toggling Sticky state
         */
        toggleSticky() {
            // Ensure we are not collapsing while toggling
            this.preventCollapse = true

            // Actual toggle
            this.isSticky = !this.isSticky

            // Emit the event
            this.$emit('sticky:change', this.isSticky)

            // Make sure window is getting resize notification, so app can adjust
            window.dispatchEvent(new Event('resize'))
            this.$nextTick(() => {
                // Once all is done, we can resume allowing collapses
                this.preventCollapse = false
            })
        },

        /**
         * Expand menu on mouseover
         */
        handleMouseOver() {
            this.expand()
        },

        /**
         * Collapse menu on mouseleave
         */
        handleMouseLeave() {
            // Check that we are not switching the stickiness
            if (!this.isOpen && !this.preventCollapse) {
                this.collapse()
            }
        },

        /**
         * On hover + scroll, the dom does not receive mouseover events.
         * Reposition submenus manually.
         */
        handleContentScroll() {
            // Iterate all elements in slots
            const elements = this.$slots.default
            for (const i in elements) {
                const el = elements[i]
                // If element is Vue component instance
                if (el && el.componentInstance) {
                    const i = el.componentInstance
                    // If element supports recalculatePosition call
                    if (typeof i.recalculatePosition === 'function') {
                        i.recalculatePosition()
                    }
                }
            }
        },

        /**
         * Set collapse state to value.
         *
         * @param {boolean} value
         */
        setCollapse(value) {
            this.isCollapsed = value
            this.$emit('collapse:change', value)
        },

        /**
         * Toggle open state menu (mobile menu)
         */
        toggleOpen() {
            this.isOpen = !this.isOpen
            this.$emit('open:change', this.isOpen)
        },
    },
}
</script>

<style lang="scss">
@import '~@/assets/sass/color.scss';
.a-sidemenu {
    position: fixed;
    box-sizing: border-box;

    overflow: hidden;
    display: flex;
    flex-direction: column;
    z-index: 1002;

    .is-not-sticky {
        z-index: 1001;
    }

    transition: width 0.1s ease-in, height 0.1s ease-in;
    background: $black-bg;
    top: 0;
    left: 0;
    flex-shrink: 0;
    flex-grow: 0;
    width: 100%;
    height: 78px;
    margin: 0;
    padding: 0;
    font-size: 0.75rem;
    padding: 0.75rem;
    padding-bottom: 0;

    &.is-open {
        height: 100vh;
        > .a-content {
            overflow: auto;
            padding-bottom: 5em;
        }
    }

    > .a-header {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-grow: 0;
        flex-shrink: 0;
        min-width: 0;

        > .sticky-icon {
            top: 0;
            right: 0;
            position: absolute;
            cursor: pointer;
            transition: opacity 0.1s;
            opacity: 1;
            color: $grey;
            font-size: 1rem;

            .fa-thumbtack--active {
                transform: rotate(90deg);
                padding-right: 5px;
            }

            &:hover {
                cursor: pointer;
                color: $white;
            }
        }
    }

    &.is-collapsed .sticky-icon {
        opacity: 0;
    }

    .a-menu-toggle {
        position: relative;
        right: 0;
        width: 43px;
        height: 43px;
        cursor: pointer;
        background-color: transparent;
        border: 0;
        padding: 0;
        margin: 0 0 0 auto;
    }

    .a-menu-toggle > span:nth-child(1) {
        transform: translateY(-5px) rotate(0deg);
    }

    .a-menu-toggle > span:nth-child(2) {
        transform: scale(1) rotate(0deg);
    }

    .a-menu-toggle > span:nth-child(3) {
        transform: translateY(5px) rotate(0deg);
    }

    .a-menu-toggle > span {
        width: 17px;
        height: 2px;
        background-color: #ffffff;
        display: block;
        position: absolute;
        right: 13px;
        top: 50%;
        border-radius: 2px;
        transition: background 0.35s linear,
            transform 0.25s cubic-bezier(0.4, 0.01, 0.165, 0.99);
    }

    .a-menu-toggle.is-open > span:nth-child(1) {
        transform: translateY(0) rotate(45deg);
    }

    .a-menu-toggle.is-open > span:nth-child(2) {
        transform: scale(0) rotate(45deg);
    }

    .a-menu-toggle.is-open > span:nth-child(3) {
        transform: translateY(0) rotate(-45deg);
    }

    .a-menu-toggle.is-open > span {
        transition: background 0.35s linear,
            transform 0.25s cubic-bezier(0.4, 0.01, 0.165, 0.99);
    }
}

@media only screen and (max-width: 768px) {
    .a-sidemenu .sticky-icon {
        display: none;
    }
}

@media screen and (min-width: 769px), print {
    .a-sidemenu {
        width: 220px;
        height: 100%;

        > .a-header {
            min-height: 120px;
            height: 120px;

            .a-menu-toggle {
                display: none;
            }
        }

        > .a-content {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            overflow-x: hidden;
            overflow-y: auto;
            width: calc(220px - 0.75rem);
            transition: width 0.2s;
            padding-bottom: 1.5rem;
            min-width: 0;
        }

        &.is-collapsed {
            width: 60px !important;
            transition: width 0.3s ease-out;

            .a-header > .sticky-icon {
                opacity: 0;
            }
        }
    }
}
</style>
