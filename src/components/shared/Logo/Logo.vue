<template>
    <div
        class="logo__container"
        @click="handleClick"
    >
        <component
            :is="logoComponent"
            :class="{'logo': !small && !internalSmall, 'logo-small': small || internalSmall}"
        >
        </component>
    </div>
</template>

<script>
/**
 * Logo component wrapper for sidemenu logo. Shows either generic Aibidia Logo or Solution specific logo, if there is enough space.
 */
import MainLogo from './components/MainLogo.vue'
import HMLogo from './components/HMLogo.vue'

export default {
    components: {
        MainLogo,
        HMLogo,
    },

    props: {
        /**
         * If logo should display only main logo and never application logo.
         */
        mainOnly: {
            type: Boolean,
            default: false,
        },
        /**
         * If logo should be rendered small
         */
        small: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            /**
             * Internal state for if logo should be rendered small
             */
            internalSmall: false,
        }
    },

    computed: {
        /**
         * @returns {string} Returns which component to render depending on the usecase.
         */
        logoComponent() {
            return this.mainOnly || this.small || this.internalSmall
                ? 'MainLogo'
                : 'HMLogo'
        },
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize)
    },

    mounted() {
        window.addEventListener('resize', this.handleResize)
        this.handleResize()
    },

    methods: {
        /**
         * Event handler for clicking the logo.
         *
         * @param {Event} event
         */
        handleClick(event) {
            !this.internalSmall && this.$emit('click', event)
        },

        /**
         * Event handler for resizing page.
         *
         * TODO: Change to ResizeObserver.
         */
        handleResize() {
            if (window.innerWidth <= 768) {
                this.internalSmall = true
            } else {
                this.internalSmall = false
            }
        },
    },
}
</script>

<style lang="scss">
@import '~@/assets/sass/color.scss';

.logo__container {
    text-align: center;

    @media only screen and (min-width: 768px) {
        .logo {
            height: 120px;
            padding-top: 10px;
            padding-bottom: 10px;
            z-index: 1;
        }
    }

    .logo-small {
        height: 36px;
        z-index: 1;
        background-size: 100%;
        background-repeat: no-repeat;

        @media only screen and (max-width: 768px) {
            height: 55px;
            cursor: default;
            pointer-events: none;
        }
    }

    @media only screen and (max-width: 768px) {
        .logo {
            height: 55px;
            width: 55px;
            margin-bottom: 10px;
            cursor: default;
            pointer-events: none;
        }
    }
}
</style>
