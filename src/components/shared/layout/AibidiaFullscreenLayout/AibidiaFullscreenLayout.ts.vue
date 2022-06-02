<template>
    <div class="background-black">
        <div>
            <a-logo>
            </a-logo>

            <h1 class="title title-grey margin-t-3">
                <slot name="title" />
            </h1>

            <p
                class="margin-b-1 has-text-primary is-size-5 text--bold"
            >
                <slot name="group" />
            </p>

            <p class="title-grey margin-b-3">
                <slot name="description" />
            </p>

            <div class="is-grouped is-grouped-centered">
                <slot name="actions" />
                <br><br>
            </div>

            <slot name="default" />
        </div>

        <a-snackbar>
        </a-snackbar>
    </div>
</template>

<script lang="ts">
import Logo from 'components/shared/Logo/Logo.vue'
import AibidiaSnackbar from 'components/shared/snackbar/AibidiaSnackbar.vue'
import Vue from 'vue'

interface Props {
    loading: boolean
}

/**
 * This is layout component to display fullscreen page.
 */
export default Vue.extend<void, void, void, Props>({
    components: {
        'a-snackbar': AibidiaSnackbar,
        'a-logo': Logo,
    },

    props: {
        loading: {
            type: Boolean,
            default: false,
        },
    },
})
</script>


<style lang="scss" scoped>
@import '~@/assets/sass/core/background';
</style>
