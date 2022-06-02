<template>
    <div
        class="modal-card"
        style="margin: auto; width: 100%"
    >
        <header class="modal-card-head">
            <p class="modal-card-title flex-item--shrink-1 text--ellipsis-hoverable padding-r-1">
                {{ headerText || '' }}
            </p>
            <i
                class="fas fa-times is-size-5 close-tick"
                @click="cancel()"
            />
        </header>
        <section
            class="modal-card-body"
            style="display: flex; flex-direction: column;"
        >
            <div class="centered">
                <i class="fas fa-exclamation-circle is-size-1 is-purple-light" />
            </div>
            <h1
                v-if="title"
                class="title is-4"
            >
                {{ title }}
            </h1>

            <p
                v-if="textContent"
                class="centered margin-t-2 is-size-6 text--break-word"
            >
                {{ textContent }}
            </p>

            <div
                v-if="htmlContent"
                v-html="htmlContent"
            />

            <!-- Slot for defining content more specifically -->
            <slot />

            <div
                v-if="showTable"
                class="action-modal__table-container"
            >
                <modal-table
                    :items="items"
                    :columns="columns"
                >
                </modal-table>
            </div>
        </section>
        <footer class="modal-card-foot is-grouped centered">
            <button
                v-if="action && action !== 'Delete'"
                class="button is-primary is-small"
                @click="confirmClicked()"
            >
                <span>{{ action }}</span>
                <span class="icon">
                    <i
                        v-if="!actionIconClass"
                        class="fas fa-check"
                    />
                    <i
                        v-else
                        :class="actionIconClass"
                    />
                </span>
            </button>
            <delete-button
                v-if="action === 'Delete'"
                icon-align="right"
                @click="confirmClicked()"
            >
                Delete
            </delete-button>
            <button
                v-if="!hideCancel"
                class="button is-small"
                @click="cancel()"
            >
                Cancel
            </button>
        </footer>
    </div>
</template>
<script>
/**
 * Old ActionModal component.
 * @deprecated in favour of AibidiaModal.
 */
import ActionModalTable from './components/ActionModalTable.vue'
import DeleteButton from 'components/shared/button/DeleteButton/DeleteButton.vue'

export default {
    components: {
        'modal-table': ActionModalTable,
        'delete-button': DeleteButton,
    },

    props: {
        headerText: String,
        footerText: String,
        title: String,
        textContent: String,
        htmlContent: String,
        action: String,
        actionIconClass: String,
        hideCancel: {
            type: Boolean,
            default: false,
        },
        alwaysEmitCancel: {
            type: Boolean,
            default: true,
        },
        // Data related to modal, returned in emit
        data: [Array, Object],
        // Items shown in modal's table, returned in emit
        items: Array,
        columns: Object,
    },

    computed: {
        showTable() {
            return this.items && this.items.length
        },
    },

    methods: {
        // Cancel modal window
        cancel() {
            this.$emit('cancel', this.data, this.items)
            this.$parent.close()
        },

        // Event handler for confirm clicked
        confirmClicked() {
            // Emit event to parent
            this.$emit('action-clicked', this.data, this.items)

            // Emit cancel signal
            if (this.alwaysEmitCancel) {
                this.cancel()
            }
        },
    },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/sass/color.scss';

.action-modal {
    &__table-container {
        margin-top: 15px;
        width: 100%;
        overflow: hidden;
    }
}
</style>
