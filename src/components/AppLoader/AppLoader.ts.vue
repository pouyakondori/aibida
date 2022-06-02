<template>
    <div class="app-loader background-black">
        <logo class="logo"></logo>
        <div :class="[{ pulse: isAnimated }, `caption`]">
            {{ message }}
        </div>
        <article
            v-if="showNotification"
            class="notification is-dark"
        >
            <div class="media">
                <div class="media-left">
                    <i class="icon is-large fa fa-plug is-size-3" />
                </div>
                <div class="media-content">
                    <p>We are experiencing an unusual delay while loading the application.</p>
                    <p>Please wait while we try to reconnect...</p>
                </div>
            </div>
        </article>
    </div>
</template>

<script lang="ts">
import Logo from 'components/shared/Logo/components/HMLogo.vue'
import { AppLoadingMessages } from 'misc/constants'
import Vue from 'vue'

interface Data {
    /** Should we show notification for user if the loading takes too long */
    showNotification: boolean
    /** Internal timer for notification shower */
    showNotificationTimeout: NodeJS.Timeout | null
}

interface Computed {
    /** Should animation be applied to the text */
    isAnimated: boolean
}

interface Props {
    /** Message to display on loader screen */
    message: AppLoadingMessages
    /** How long to load before showing unusual loading notification message */
    notificationDelay: number
}

/** Application overlay loader.
 *  Use it during initial loading or when you need to hide interface while doing some async operation
 */
export default Vue.extend<void, Data, Computed, Props>({
    components: {
        logo: Logo,
    },

    props: {
        message: {
            type: String as () => AppLoadingMessages,
            default: AppLoadingMessages.Loading,
        },
        notificationDelay: {
            type: Number,
            default: 10000,
        },
    },

    data() {
        return {
            showNotification: false,
            showNotificationTimeout: null,
        }
    },

    computed: {
        isAnimated(): boolean {
            // Only show animation for loading case
            return this.message === AppLoadingMessages.Loading
        },
    },

    mounted() {
        this.showNotification = false

        if (this.showNotificationTimeout) {
            clearTimeout(this.showNotificationTimeout)
        }

        this.showNotificationTimeout = setTimeout(() => {
            this.showNotification = true
        }, this.notificationDelay)
    },
})
</script>

<style lang="scss" scoped>
@import '~@/assets/sass/color.scss';
@import '~@/assets/sass/core/background';
.app-loader {
    bottom: 0;
    display: flex;
    flex-direction: column;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 9999;
    user-select: none;

    .caption {
        color: $white;
        font-size: 1.2rem;
        margin-top: 1rem;
    }

    .pulse {
        animation: pulse 2s infinite;
    }

    .logo {
        height: 8rem;
    }

    .notification {
        margin-top: 1rem;
        user-select: text;
    }
}

@keyframes pulse {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0.4;
    }
    100% {
        opacity: 1;
    }
}
</style>
