<template>
    <a-table
        :items="items"
    >
        <template #headers>
            <a-th
                v-for="(propertyName, idx) in properties"
                :key="propertyName + idx"
                text-wrap
            >
                {{ propertyName }}
            </a-th>
        </template>

        <template #default="{ item }">
            <template v-for="(propertyValue, key) in item">
                <td
                    :key="propertyValue + key"
                    :class="internalColumns[key] && internalColumns[key].class || 'cell--expandable'"
                    :style="internalColumns[key] && internalColumns[key].style"
                >
                    <span
                        v-if="internalColumns[key] && internalColumns[key].type === 'boolean'"
                        :class="{'fas fa-check' : propertyValue}"
                    />
                    <span v-else>
                        {{ propertyValue }}
                    </span>
                </td>
            </template>
        </template>
    </a-table>
</template>

<script>
import AibidiaTableHeader from 'components/shared/AibidiaTable/AibidiaTableHeader/AibidiaTableHeader.vue'
import AibidiaTable from 'components/shared/AibidiaTable/AibidiaTable.vue'

export default {
    components: {
        'a-th': AibidiaTableHeader,
        'a-table': AibidiaTable,
    },

    props: {
        items: Array,
        columns: Object,
    },

    data() {
        return {
            internalColumns: {},
        }
    },

    computed: {
        properties() {
            return Object.keys(this.items[0])
        },
    },

    watch: {
        columns(newVal, oldVal) {
            this.setInternalColumns()
        },
    },

    created() {
        this.setInternalColumns()
    },

    methods: {
        setInternalColumns() {
            const cols = this.columns || {}

            this.internalColumns = Object.keys(cols).reduce((acc, prop) => {
                const col = { ...cols[prop] }

                col.class = 'cell--expandable'

                if (col.type === 'numeric') {
                    col.class = 'cell--numeric'
                }

                if (col.type === 'boolean') {
                    col.class = 'cell--selected'
                }

                col.style = `min-width: ${col.minWidth}; max-width: ${col.maxWidth}; width: ${col.width}`

                acc[prop] = col
                return acc
            }, {})
        },
    },
}
</script>


