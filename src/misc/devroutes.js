export default {
    path: 'dev',
    component: () =>
        import(/* webpackChunkName: "dev" */ 'views/dev/Development.ts.vue'),
    meta: {
        breadcrumb: [{ name: 'Development', icon: 'fa fa-dev' }],
    },
    children: [
        { path: '', redirect: 'page/default' },
        { path: 'page', redirect: 'page/default' },
        {
            path: 'page/default',
            component: () =>
                import(
                    /* webpackChunkName: "dev" */ 'views/dev/PageLayout/GenericPage.ts.vue'
                ),
            meta: {
                breadcrumb: [
                    {
                        name: 'Generic Page',
                        icon: 'fa fa-file-code',
                    },
                ],
            },
        },
        {
            path: 'page/grid',
            component: () =>
                import(
                    /* webpackChunkName: "dev" */ 'views/dev/PageLayout/GridView.ts.vue'
                ),
            meta: {
                breadcrumb: [
                    {
                        name: 'Grid Page',
                        icon: 'fa fa-file-code',
                    },
                ],
            },
        },
        {
            path: 'page/scrollable',
            component: () =>
                import(
                    /* webpackChunkName: "dev" */ 'views/dev/PageLayout/Scrollable.ts.vue'
                ),
            meta: {
                breadcrumb: [
                    {
                        name: 'Scrollable Panes',
                        icon: 'fa fa-file-code',
                    },
                ],
            },
        },
    ],
}
