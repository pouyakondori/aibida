<template>
    <notification>
        <template slot="title">
            {{ title }}
        </template>
        <template slot="info">
            {{ text }}
        </template>
    </notification>
</template>

<script>
/**
 * Template to use when showing basic info notification.
 *
 * @extends ModalNotification
 */

import ModalNotification from './ModalNotification.vue'

export default {
    components: {
        notification: ModalNotification,
    },
    extends: ModalNotification,
    props: {
        /**
         * Title of the notification.
         */
        title: {
            type: String,
            default: 'Information Notification',
        },
    },
}
</script>
