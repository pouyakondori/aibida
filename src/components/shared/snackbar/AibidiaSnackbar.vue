<template>
    <div
        class="aibidia-snackbar"
        :class="snackbarClass"
    >
        <h3>
            {{ snackbarMsg }}
        </h3>
    </div>
</template>

<script>
/**
 * Display toast-like information on the bottom of the page. Used for error and information messages that autofades away.
 *
 * Logic for showing this snackbar is implemented in VueX store.
 */

import { SnackbarTypes } from 'misc/constants'
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState({
            snackbarMsg: state => state.app.snackbarMsg,
            snackbarType: state => state.app.snackbarType,
            showSnackbar: state => state.app.snackbarVisible,
            menuIsSticky: state => state.app.menuIsSticky,
        }),

        /**
         * Computed class for snackbar element.
         *
         * Snackbar is narrower by default when sticky menu is in use.
         * @returns {{
         *     show: boolean,
         *     'snackbar--error': boolean,
         *     'snackbar--info': boolean,
         *     'snackbar--narrow': boolean,
         *     'snackbar--wide': boolean,
         * }}
         */
        snackbarClass() {
            return {
                show: this.showSnackbar,
                'aibidia-snackbar--error':
                    this.snackbarType === SnackbarTypes.Error,
                'aibidia-snackbar--info':
                    this.snackbarType === SnackbarTypes.Info,
                'aibidia-snackbar--narrow': this.menuIsSticky,
                'aibidia-snackbar--wide': !this.menuIsSticky,
            }
        },
    },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/sass/color.scss';

.aibidia-snackbar {
    visibility: hidden;
    background-color: $primary;
    color: $white;
    position: fixed;
    bottom: 20px;
    height: 56px;
    text-align: center;
    margin-left: 20px;
    border-radius: 10px;

    &--narrow {
        width: calc(100% - 280px);
    }

    &--wide {
        width: calc(100% - 120px);
    }

    h3 {
        font-size: 1.5em;
        line-height: 56px;
    }
}

.aibidia-snackbar--info {
    background-color: $info;
}

.aibidia-snackbar--error {
    background-color: $danger-light;
}

.aibidia-snackbar.show {
    visibility: visible;
    z-index: 2004; // TODO: Do we want to show snackbar on top of modals or no?
    -webkit-animation: fadein 0.5s, fadeout 0.5s 7.5s;
    animation: fadein 0.5s, fadeout 0.5s 7.5s;
}

// Snackbar animation
@-webkit-keyframes fadein {
    from {
        bottom: 0;
        opacity: 0;
    }

    to {
        bottom: 20px;
        opacity: 1;
    }
}

@keyframes fadein {
    from {
        bottom: 0;
        opacity: 0;
    }

    to {
        bottom: 20px;
        opacity: 1;
    }
}

@-webkit-keyframes fadeout {
    from {
        bottom: 20px;
        opacity: 1;
    }

    to {
        bottom: 0;
        opacity: 0;
    }
}

@keyframes fadeout {
    from {
        bottom: 20px;
        opacity: 1;
    }

    to {
        bottom: 0;
        opacity: 0;
    }
}
</style>
