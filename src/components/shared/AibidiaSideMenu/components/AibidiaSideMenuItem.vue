<template>
    <li
        v-if="!hidden"
        ref="item"
        class="a-menu-item"
        :class="menuClass"
        @click="toggleNav"
        @mousemove="calculateSubMenuPos"
    >
        <router-link
            v-if="!external"
            :to="link || {}"
            :event="disabled ? '' : 'click'"
        >
            <i
                v-if="icon"
                :class="icon"
            />
            <span>{{ label }}</span>
        </router-link>
        <a
            v-else
            class="external-link"
            :class="{ 'disabled': disabled }"
            :href="link"
            :title="externalTooltip"
            :target="linkTarget"
            :disabled="disabled"
        >
            <i
                v-if="icon"
                :class="icon"
            />
            <span>{{ label }}</span>
        </a>
        <section
            v-if="$slots.default"
            ref="submenu"
            class="a-submenu"
            :class="{ 'disabled': disabled }"
            :style="submenuStyle"
        >
            <div
                v-if="showHoverHelper"
                ref="hoverhelper"
                class="a-hoverhelper"
                :style="hoverHelperStyle"
                @mousemove.stop.prevent="() => {}"
            />
            <slot />
        </section>
    </li>
</template>

<script>
/**
 * Reusable SideMenuItem component.
 */

export default {
    name: 'MenuItem',
    props: {
        /**
         * Menuitem text label
         */
        label: {
            type: String,
            default: 'Label',
        },
        /**
         * Optional Font Awesome icon (set null to disable icon)
         */
        icon: {
            type: String,
            default: null,
        },
        /**
         * Vue-router link (String or Object) where to navigate if user clicks the menuitem
         * If external = true, pass to href
         */
        link: {
            type: [String, Object],
            default: null,
        },
        /**
         * If link is external and not VueRouter link
         */
        external: {
            type: Boolean,
            default: false,
        },
        /**
         * Open in new tab (only applicable to external links)
         */
        newtab: {
            type: Boolean,
            default: false,
        },
        /**
         * Hide menuitem
         */
        hidden: {
            type: Boolean,
            default: false,
        },
        /**
         * Use HoverHelper to ease accessing submenus.
         */
        useHoverHelper: {
            type: Boolean,
            default: true,
        },
        /**
         * Delay (ms) how long the submenu HoverHelper should be visible
         */
        hideHoverHelperDelay: {
            type: Number,
            default: 750,
        },
        /**
         * Offset submenu position in Y-axis (pixels)
         */
        subMenuYOffset: {
            type: Number,
            default: 16,
        },
        /**
         * Is menuitem disabled
         */
        disabled: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            /**
             * Internal position for submenu hover
             * TODO: Switch to user popper.js
             */
            submenuX: 0,
            submenuY: 0,
            /**
             * Internal position for hover-helper triangle
             */
            hoverHelperX: 0,
            /**
             * Internal width for hover-helper triangle
             */
            hoverHelperWidth: 0,
            /**
             * If hover helper is shown
             */
            showHoverHelper: false,
            /**
             * Autohide-timer for hover helper
             */
            showHoverTimer: null,
        }
    },

    computed: {
        /**
         * Classes for menuitem element
         *
         * @returns {{
         *      'has-submenu': boolean,
         *      'disabled': boolean,
         * }}
         */
        menuClass() {
            return {
                'has-submenu': this.$slots.default,
                disabled: this.disabled,
            }
        },
        /**
         * Style (position left, right) for submenu
         *
         * @returns {{
         *      'left': string,
         *      'top': string,
         * }}
         */
        submenuStyle() {
            return {
                left: this.submenuX + 'px',
                top: this.submenuY + 'px',
            }
        },
        /**
         * Style (position left, width) for hover helper
         *
         * @returns {{
         *      'left': string,
         *      'width': string,
         * }}
         */
        hoverHelperStyle() {
            return {
                left: this.hoverHelperX + 'px',
                width: this.hoverHelperWidth + 'px',
            }
        },
        /**
         * Target for menuitem external link.
         *
         * @returns {string}
         */
        linkTarget() {
            if (this.newtab) {
                return '_blank'
            }

            return null
        },
        /**
         * Tooltip if showing external link
         *
         * @returns {string}
         */
        externalTooltip() {
            return `Go to external link ${this.link} ${this.newTabTooltip}`
        },
        /**
         * Tooltip if opening external link in new tab.
         *
         * @returns {string}
         */
        newTabTooltip() {
            return this.newtab ? '(opens in a new tab)' : ''
        },
    },

    mounted() {
        this.calculateSubMenuPos(null)
    },

    beforeDestroy() {
        clearTimeout(this.showHoverTimer)
    },

    methods: {
        /**
         * Navigation is toggled
         */
        toggleNav() {
            this.$emit('toggleNav')
        },

        /**
         * Parent will call this if necessary to reposition submenu
         */
        recalculatePosition() {
            this.calculateSubMenuPos(null)
        },

        /**
         * Calculate submenu position in window
         *
         * @param {Event} event
         */
        calculateSubMenuPos(event) {
            // Require that refs still exists
            const submenu = this.$refs.submenu
            if (!submenu) {
                return
            }

            const item = this.$refs.item
            if (!item) {
                return
            }

            // Get the item position
            const pos = item.getBoundingClientRect()
            this.submenuX = pos.left + pos.width
            this.submenuY = pos.top

            // Get the submenu position
            const subpos = submenu.getBoundingClientRect()
            if (this.submenuY + subpos.height > window.innerHeight) {
                this.submenuY =
                    this.submenuY -
                    subpos.height +
                    pos.height +
                    this.subMenuYOffset
            }

            this.repositionHoverHelper(event)
        },

        /**
         * Calculate hoverhelper position in window.
         * Hides after hideHoverHelperDelay ms has elapsed
         *
         * @param {Event} event
         */
        repositionHoverHelper(event) {
            // If no event, or we are not using hoverhelper then just return
            if (!event || !this.useHoverHelper) {
                return
            }

            // Activate submenu hover helper
            const mx = event.clientX
            this.hoverHelperWidth = this.submenuX - mx
            this.hoverHelperX = -this.hoverHelperWidth
            this.showHoverHelper = this.hoverHelperWidth > 5

            // HideHoverHelper after short delay
            clearTimeout(this.showHoverTimer)
            this.showHoverTimer = setTimeout(() => {
                this.showHoverHelper = false
            }, this.hideHoverHelperDelay)
        },
    },
}
</script>

<style lang="scss" >
@import '~@/assets/sass/color.scss';
.a-menu-item {
    user-select: none;

    > a {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: stretch;
        align-items: stretch;

        border-radius: 2px;
        color: $grey-light;
        padding: 0.5em 0.75em;

        > i {
            text-align: center;
            align-self: baseline;
            min-width: 22px;
            margin-right: 12px;
        }

        > span {
            align-self: baseline;
        }
    }

    > a.is-active,
    > a:hover {
        background-color: $grey-darker;
        color: $white;
    }

    &.disabled {
        > a {
            opacity: 0.5;
        }
    }

    > .a-submenu {
        margin-left: -1px;
        margin-top: -8px;
        position: fixed;
        transform-origin: top;
        animation-fill-mode: forwards;
        display: block;
        z-index: 1;
        min-width: 220px;

        background: $black-ter;
        border-radius: 2px;
        border: 1px solid $grey-darker;
        padding: 7px 5px;
        text-align: left;
        visibility: hidden;
        opacity: 0;
        transition: visibility 220ms linear;
    }

    &:hover > .a-submenu {
        visibility: visible;
        opacity: 1;
        transition: visibility 40ms linear;

        > .a-hoverhelper {
            top: 28px;
            height: 100%;
            clip-path: polygon(0 0, 100% 100%, 100% 0);
            // To view the polygon, uncomment following background
            //background: #0000ff44;
            position: absolute;
        }
    }
}

@media only screen and (max-width: 768px) {
    .a-menu-item.has-submenu > .a-submenu {
        display: none;
    }
}

@media only screen and (min-width: 769px) {
    .a-menu-item.has-submenu {
        > a:after {
            display: block;
            flex-grow: 1;
            text-align: right;
            font-family: 'Font Awesome 5 Free';
            content: '\f105' !important;
            color: $grey-darker;
            font-weight: 900;
            font-size: 0.7rem;
        }

        > a.is-active:after {
            color: $grey;
        }

        > a:hover:after {
            color: $white;
        }
    }
}
</style>
