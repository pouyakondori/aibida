<template>
    <div class="breadcrumb__container">
        <div class="icon is-large">
            <i
                class="fas fa-3x fa-fw is-primary"
                :class="breadcrumbIcon"
            />
        </div>

        <div class="margin-l-2">
            <h1
                v-if="$breadcrumbs"
                class="title is-4"
            >
                {{ breadcrumbTitle }}
            </h1>
            <nav
                class="breadcrumb is-small"
                aria-label="breadcrumbs"
            >
                <ul>
                    <li
                        v-for="(crumb, key) in breadcrumbNames"
                        :key="key"
                        class="is-active"
                        :class="{'text--break-word': key === 0}"
                    >
                        <a
                            href="#"
                            class="breadcrumb__link"
                        >
                            {{ crumb }}
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
        <slot />
    </div>
</template>

<script>
/**
 * Component to display navigation path (breadcrumb) for user.
 *
 * This component is used as a template for VueBreadcrumb component.
 */

export default {
    props: {
        /**
         * When rendering the item, we might want to use placeholder name instead of item name.
         */
        placeholders: {
            type: Array,
            default: () => {
                return []
            },
        },
        /**
         * Analytics category.
         * TODO: This is not used currently!
         */
        analyticsCategory: {
            type: Object,
            default: null,
        },
        /**
         * Array of initial breadcrumbs. This will be prepended to $router defined breadcrumb list.
         */
        initialBreadcrumbs: {
            type: Array,
            default: () => {
                return []
            },
        },
    },

    computed: {
        /**
         * Compute the needed breadcrumbs.
         *
         * @returns {Object[]}
         */
        breadcrumbNames() {
            const list = this.$breadcrumbs.map(bc => {
                return bc.meta && bc.meta.breadcrumb
            })

            // Flatten possible array of arrays
            const flatList = list.reduce((acc, val) => acc.concat(val), [])

            // Replace placeholders with real display values if exists
            if (this.placeholders && this.placeholders.length) {
                this.placeholders.forEach(ph => {
                    const item = flatList.find(bc => bc.name == ph.placeholder)
                    if (item) {
                        item.name = ph.display
                    }
                })
            }

            if (this.initialBreadcrumbs && this.initialBreadcrumbs.length) {
                return [
                    ...this.initialBreadcrumbs,
                    ...flatList.map(item => item.name),
                ]
            } else {
                return flatList.map(item => item.name)
            }
        },
        /**
         * Compute the last breadcrumb title.
         *
         * @returns {string}
         */
        breadcrumbTitle() {
            const breadcrumbs = this.$route.meta.breadcrumb
            const name = breadcrumbs[breadcrumbs.length - 1].name

            return this.getPlaceholderDisplay(name)
        },

        /**
         * Compute the last breadcrumb icon.
         *
         * @returns {string}
         */
        breadcrumbIcon() {
            const breadcrumbs = this.$route.meta.breadcrumb

            return breadcrumbs[breadcrumbs.length - 1].icon
        },
    },

    methods: {
        /**
         * Get placeholder title for particular breadcrumb
         *
         * @param {string} crumbName Breadcrump name to find from placeholders.
         */
        getPlaceholderDisplay(crumbName) {
            if (this.placeholders && this.placeholders.length) {
                const item = this.placeholders.find(
                    ph => ph.placeholder == crumbName
                )

                if (item) {
                    return item.display
                }
            }

            return crumbName
        },
    },
}
</script>

<style lang="scss" scoped>
.breadcrumb {
    margin-top: -1.5rem;

    &__container {
        display: flex;
        flex-grow: 1;
        flex-direction: row;
        padding: 0.375em * 2;
        align-items: center;
    }

    &__link {
        padding-bottom: 0;
        padding-top: 0;
    }
}
</style>
