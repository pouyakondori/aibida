<template>
    <a-page-layout>
        <template #pagetabs>
            <slot name="pagetabs" />
        </template>

        <template #tips>
            <p>
                This is tip area for page tips.
            </p>
        </template>

        <template #filters>
            <span/>
        </template>

        <template #default>
            <a-one-thirds>
                <template #first>
                    <a-card scrollable>
                        <a-lorem>
                        </a-lorem>
                        <a-lorem>
                        </a-lorem>
                        <a-lorem>
                        </a-lorem>
                    </a-card>
                </template>

                <template #second>
                    <a-card scrollable>
                        <a-lorem>
                        </a-lorem>
                        <a-lorem>
                        </a-lorem>
                        <a-lorem>
                        </a-lorem>
                    </a-card>
                </template>

                <template #third>
                    <a-card scrollable>
                        <a-lorem>
                        </a-lorem>
                        <a-lorem>
                        </a-lorem>
                        <a-lorem>
                        </a-lorem>
                    </a-card>
                </template>
            </a-one-thirds>
        </template>

        <a-loader
            slot="loader"
            :active="isLoading"
            :full-form="true"
            :text="updateStatus"
        ></a-loader>
    </a-page-layout>
</template>

<script lang="ts">
import BaseView from 'views/BaseView.ts.vue'
import AibidiaOneThirdsLayout from 'components/shared/layout/AibidiaOneThirdsLayout/AibidiaOneThirdsLayout.ts.vue'

interface Data {
    /** If page is loading. Answer: Never (but used here to showcase how the layout works) */
    isLoading: boolean
    /** Possible update status for the AibidiaLoader. */
    updateStatus: string
}

/**
 * Sample page to display how scrollable AibidiaPanes work in AibidiaOneThirdsLayout.
 */
export default BaseView.extend<Data, void, void, void>({
    name: 'DualTableView',

    components: {
        'a-one-thirds': AibidiaOneThirdsLayout,
    },

    extends: BaseView,

    data() {
        return {
            isLoading: false,
            updateStatus: '',
        }
    },
})
</script>
