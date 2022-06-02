<template>
    <a-page-layout :loading="isLoading">
        <template #pagetabs>
            <slot name="pagetabs" />
        </template>

        <template #tips>
            <p>
                This is tip area for page tips.
            </p>
        </template>

        <template #filters>
            <a-pane
                columns
                content-separation
            >
                <a-button @click="startLoading">
                    Page loader {{ isLoading }}
                </a-button>
                <a-button @click="toggleLoadingCard">
                    Toggle Card Loader
                </a-button>
                <div class="separator" />
                <b-radio
                    v-model="columns"
                    :native-value="3"
                >
                    One third column
                </b-radio>
                <b-radio
                    v-model="columns"
                    :native-value="2"
                >
                    Two columns
                </b-radio>
                <b-radio
                    v-model="columns"
                    :native-value="1"
                >
                    Three rows
                </b-radio>
            </a-pane>
        </template>

        <template #default>
            <a-pane
                class="dev-grid"
                grid
                content-grow
                :class="{['layout-' + columns]: true}"
            >
                <a-card
                    class="first"
                    scrollable
                >
                    <template #tabs>
                        <a-tabs>
                            <a-tab route="/hm">
                                Homework
                            </a-tab>
                            <a-tab route="/hm/notfound">
                                Not found
                            </a-tab>
                        </a-tabs>
                    </template>
                    <template #default>
                        <a-tooltip>
                            Here
                        </a-tooltip>
                        <a-lorem>
                        </a-lorem>
                        <a-lorem>
                        </a-lorem>
                    </template>
                </a-card>
                <a-card
                    ref="secondCard"
                    class="second"
                    columns
                    :loading="isLoadingCard"
                >
                    <a-delete-button @click="handleDelete">
                    </a-delete-button>
                    <a-confirm-button
                        icon="fa fa-sync"
                        :loading="isLoadingCard"
                        @click="refreshCard"
                    >
                        Refresh Card
                    </a-confirm-button>
                </a-card>
                <a-card
                    class="third"
                    scrollable
                    :rows="hasColumns"
                    :columns="!hasColumns"
                    :wrap-items="wrapItems"
                    :content-grow="!wrapItems"
                >
                    <template slot="header">
                        <a-card-header>
                            <template #title>
                                Third column
                            </template>
                            <template #subtitle>
                                subtitle
                            </template>
                            <b-radio
                                v-model="hasColumns"
                                :native-value="true"
                            >
                                Columns
                            </b-radio>
                            <b-radio
                                v-model="hasColumns"
                                :native-value="false"
                            >
                                Rows
                            </b-radio>
                            <b-checkbox
                                v-model="wrapItems"
                            >
                                Wrap
                            </b-checkbox>
                            <a-confirm-button @click="addCard">
                                Add
                            </a-confirm-button>
                            <a-delete-button @click="clearCards">
                                Clear
                            </a-delete-button>
                        </a-card-header>
                    </template>

                    <a-card
                        v-for="card in cards"
                        :key="card.name"
                    >
                        Lores ipsum sit doooorot clanse.
                    </a-card>
                </a-card>
            </a-pane>
        </template>
    </a-page-layout>
</template>

<script lang="ts">
import BaseView from 'views/BaseView.ts.vue'
import AibidiaTooltip from 'components/shared/AibidiaTooltip/AibidiaTooltip.vue'

interface Data {
    /** If the whole page is loading */
    isLoading: boolean
    /** If the sample card is loading */
    isLoadingCard: boolean
    /** Current user selection for number of columns to view in this test page */
    columns: number
    /** State of dynamically inserted cards to demo card */
    cards: Array<{
        name: string
    }>
    /** If the demo card should wrap the items */
    wrapItems: boolean
    /** If the demo card should have columns (true) or rows (false) */
    hasColumns: boolean
}
interface Methods {
    /** Method to simulate page loading */
    startLoading: () => void
    /** Method to toggle demo card loading on/off */
    toggleLoadingCard: () => void
    /** Method to simulate card refresh */
    refreshCard: () => void
    /** Method to simulate delete modal behavior */
    handleDelete: () => void
    /** Method to add dynamic card to the demo card */
    addCard: () => void
    /** Method to clear all dynamic card from the demo card */
    clearCards: () => void
}
interface Computed {
    /** Computed style for first column layout */
    firstColumnLayout: Record<string, boolean>
    /** Computed style for second column layout */
    secondColumnLayout: Record<string, boolean>
    /** Computed style for third column layout */
    thirdColumnLayout: Record<string, boolean>
}

/**
 * Sample page to display how to customize Layout by grids using flex-grid
 */
export default BaseView.extend<Data, Methods, Computed, void>({
    name: 'GridView',

    components: {
        'a-tooltip': AibidiaTooltip,
    },

    extends: BaseView,

    data() {
        return {
            isLoading: false,
            isLoadingCard: false,
            columns: 3,
            cards: [],
            wrapItems: false,
            hasColumns: false,
        }
    },

    computed: {
        firstColumnLayout() {
            return {
                'one-thirds': this.columns === 3,
                'row-span-2': this.columns === 3,
            }
        },

        secondColumnLayout() {
            return {
                'two-thirds': this.columns === 3,
            }
        },

        thirdColumnLayout() {
            return {
                'two-thirds': this.columns === 3,
            }
        },
    },

    methods: {
        startLoading() {
            this.isLoading = true
            setTimeout(() => {
                this.isLoading = false
            }, 4000)
        },

        toggleLoadingCard() {
            this.isLoadingCard = !this.isLoadingCard
        },

        refreshCard() {
            this.isLoadingCard = true
            setTimeout(() => {
                this.isLoadingCard = false
            }, 4000)
        },

        async handleDelete() {
            await this.$modals.confirm.okcancel({
                title: 'Are you sure you want to delete?',
                infoProps: {
                    title: 'Delete these items',
                    text: 'Deleting the items will alter the timeline.',
                },
            })
        },

        addCard() {
            this.cards.push({
                name: 'test_' + this.cards.length,
            })
        },

        clearCards() {
            this.cards = []
        },
    },
})
</script>

<style lang="scss">
.dev-grid.pane-grid {
    &.layout-3 {
        > .a-content {
            grid-template-columns: 1fr 2fr;

            .first {
                grid-row: 1 / span 2;
            }

            .second {
                grid-column-start: 2;
                grid-column-end: 4;
            }

            .third {
                grid-column-start: 2;
                grid-column-end: 4;
            }
        }
    }

    &.layout-2 {
        > .a-content {
            grid-template-columns: 1fr 1fr;

            .first {
                grid-row: 1;
            }

            .second {
                grid-row: 1;
            }

            .third {
                display: none;
            }
        }
    }
}
</style>
