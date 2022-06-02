<template>
    <div
        class="generic-cv-item"
    >
        <span
            class="date"
        >
            {{ item.date }}
        </span>
        <strong
            class="label"
        >
            {{ item.label }}
        </strong>
        <p>
            {{ item.description }}
        </p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import GenericCvItem from 'types/GenericCvItem'

interface Props {
    item: GenericCvItem
}

/**
 * SkillItem component
 */
export default Vue.extend<void, void, void, Props>({
    name: 'GenericCvItem',

    props: {
        item: {
            type: Object,
            required: true,
        }
    }
})
</script>

<style lang="scss">
.generic-cv-item {
    font-size: 13px;
    margin-bottom: 16px;

    .date {
        color: darkgrey;
    }

    .label {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 0;
    }
}
</style>
