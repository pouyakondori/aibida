<template>
    <div class="modal-notification media padding-b-4">
        <figure class="media-left">
            <slot name="figure">
                <i class="fas fa-exclamation-circle is-size-1 is-purple-light" />
            </slot>
        </figure>
        <div class="content">
            <slot name="content">
                <h3>
                    <slot name="title">
                        This is a notification. Fill the "title" -slot.
                    </slot>
                </h3>
                <slot name="info">
                    {{ text }}
                </slot>
            </slot>
        </div>
    </div>
</template>

<script>
/**
 * Core Template for showing notifications. Extend and use slots to fill in necessary information
 */
export default {
    props: {
        /**
         * Arbitrary text notification
         */
        text: {
            type: String,
            default: null,
        },
    },
}
</script>

<style lang="scss">
.modal-notification {
    align-items: center;
    > .content > h3 {
        margin-top: 0.3rem;
        margin-bottom: 0.3rem;
        font-weight: normal;
    }
}
</style>
