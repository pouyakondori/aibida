//
// NOTE:
// Prefix routes with application abbreviation.
// Every route must show up like /<appname>/<restoftheroute>
//

import devRoutes from './devroutes'

const routes = [
    { path: '/', redirect: '/hm' },
    {
        path: '/hm',
        component: () =>
            import(
                /* webpackChunkName: "core" */ 'components/AppContainer/AppContainer.ts.vue'
            ),
        meta: {
            breadcrumb: [{ name: 'Homework', icon: 'fa fa-home' }],
        },
        children: [
            { path: '', redirect: 'introduction' },
            {
                path: 'introduction',
                component: () =>
                    import(
                        /* webpackChunkName: "core" */ 'views/general/Introduction.ts.vue'
                    ),
                meta: {
                    section: 'General',
                    breadcrumb: [
                        { name: 'General' },
                        { name: 'Introduction', icon: 'fa fa-home' },
                    ],
                },
            },
        ],
    },
    // Any other paths must return your 404Component now
    {
        path: '*',
        component: () =>
            import(/* webpackChunkName: "core" */ 'components/404.vue'),
    },
]

if (process.env.NODE_ENV === 'development') {
    // Add development routes under #/hm
    routes[1].hasDevelopment = true
    routes[1].children.push(devRoutes)
}

export { routes }
