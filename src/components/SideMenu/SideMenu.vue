<template>
    <a-side-menu
        :sticky="isSavedSticky"
        @sticky:change="handleStickyChange"
        @open:change="handleOpenChange"
    >
        <a-side-menu-section label="General">
            <a-side-menu-menuitem
                label="Introduction"
                icon="fas fas-menu fa-home"
                link="/hm/introduction"
            >
            </a-side-menu-menuitem>
        </a-side-menu-section>
        <a-side-menu-section
            v-if="isDevelopment"
            label="Dev"
        >
            <a-side-menu-menuitem
                label="Page layout"
                icon="fas fas-menu fa-file-code"
                link="/hm/dev/page"
            >
                <a-side-menu-menuitem
                    label="Layouts"
                    link="/hm/dev/page"
                >
                    <a-side-menu-menuitem
                        label="Default Page"
                        link="/hm/dev/page/default"
                    >
                    </a-side-menu-menuitem>
                    <a-side-menu-menuitem
                        label="Grid Page"
                        link="/hm/dev/page/grid"
                    >
                    </a-side-menu-menuitem>
                    <a-side-menu-menuitem
                        label="Scrollable"
                        link="/hm/dev/page/scrollable"
                    >
                    </a-side-menu-menuitem>
                </a-side-menu-menuitem>
            </a-side-menu-menuitem>
            <a-side-menu-menuitem
                label="Disabled"
                icon="fas fas-menu fa-file-code"
                link="/hm/dev/notfound"
                :disabled="true"
            >
            </a-side-menu-menuitem>
        </a-side-menu-section>
    </a-side-menu>
</template>

<script>
import AibidiaSideMenu from 'components/shared/AibidiaSideMenu/AibidiaSideMenu.vue'
import AibidiaSideMenuItem from 'components/shared/AibidiaSideMenu/components/AibidiaSideMenuItem.vue'
import AibidiaSideMenuSection from 'components/shared/AibidiaSideMenu/components/AibidiaSideMenuSection.vue'
import { clone } from 'ramda'
import { AppMutations } from 'store/modules/app-store'
import { mapState } from 'vuex'

export default {
    components: {
        'a-side-menu': AibidiaSideMenu,
        'a-side-menu-section': AibidiaSideMenuSection,
        'a-side-menu-menuitem': AibidiaSideMenuItem,
    },

    extends: AibidiaSideMenu,

    computed: {
        ...mapState({
            isSavedSticky: state => state.app.menuIsSticky,
        }),

        isDevelopment() {
            return this.$router.options.routes[1].hasDevelopment
        },
    },

    async created() {
        this.$emit('sticky:change', this.isSavedSticky)
    },

    methods: {
        handleStickyChange(value) {
            this.$emit('sticky:change', value)
            this.$store.commit(AppMutations.SET_MENU_STICKY_STATE, value)
        },
        handleOpenChange(value) {
            this.$emit('open:change', value)
        },
    },
}
</script>
