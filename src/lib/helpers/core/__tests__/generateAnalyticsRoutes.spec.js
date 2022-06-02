import { generateAnalyticsRoutes } from '../generateAnalyticsRoutes'

jest.mock('views/analytics/Analytics.ts.vue', () => {
    void 0
})

jest.mock('views/analytics/AnalyticsTab/AnalyticsTab.ts.vue', () => {
    void 0
})

const categories = [
    {
        Id: '1',
        Caption: 'Good category',
        Reports: [
            {
                Id: '1',
                Caption: 'Good report',
                Type: 'foo',
                SortOrder: 1,
            },
            {
                Id: '1',
                Caption: 'Bad report',
                Type: 'bar',
                SortOrder: 2,
            },
        ],
        Type: 'foo',
        SortOrder: 1,
    },
    {
        Id: '2',
        Caption: 'Bad category',
        Reports: [
            {
                Id: '1',
                Caption: 'The best report',
                SortOrder: 1,
                Type: 'foo',
            },
            {
                Id: '1',
                Caption: 'The worst report',
                SortOrder: 2,
                Type: 'bar',
            },
        ],
        Type: 'bar',
        SortOrder: 2,
    },
]

describe('generateAnalyticsRoutes', () => {
    test('generates routes', () => {
        expect(generateAnalyticsRoutes(categories)).toEqual([
            {
                children: [
                    {
                        meta: {
                            breadcrumb: [
                                {
                                    name: 'Good category',
                                },
                                {
                                    icon: 'fa fa-chart-bar',
                                    name: 'Good report',
                                },
                            ],
                            categoryId: '1',
                            reportId: '1',
                        },
                        path: 'report/1',
                    },
                    {
                        meta: {
                            breadcrumb: [
                                {
                                    name: 'Good category',
                                },
                                {
                                    icon: 'fa fa-chart-bar',
                                    name: 'Bad report',
                                },
                            ],
                            categoryId: '1',
                            reportId: '1',
                        },
                        path: 'report/2',
                    },
                    {
                        path: 'report/',
                        redirect: 'report/1',
                    },
                ],
                meta: {
                    breadcrumb: [
                        {
                            name: 'Analytics',
                        },
                    ],
                    categoryId: '1',
                },
                path: 'analytics/categories/1',
            },
            {
                children: [
                    {
                        meta: {
                            breadcrumb: [
                                {
                                    name: 'Bad category',
                                },
                                {
                                    icon: 'fa fa-chart-bar',
                                    name: 'The best report',
                                },
                            ],
                            categoryId: '2',
                            reportId: '1',
                        },
                        path: 'report/1',
                    },
                    {
                        meta: {
                            breadcrumb: [
                                {
                                    name: 'Bad category',
                                },
                                {
                                    icon: 'fa fa-chart-bar',
                                    name: 'The worst report',
                                },
                            ],
                            categoryId: '2',
                            reportId: '1',
                        },
                        path: 'report/2',
                    },
                    {
                        path: 'report/',
                        redirect: 'report/1',
                    },
                ],
                meta: {
                    breadcrumb: [
                        {
                            name: 'Analytics',
                        },
                    ],
                    categoryId: '2',
                },
                path: 'analytics/categories/2',
            },
        ])
    })

    test('empty input', () => {
        expect(generateAnalyticsRoutes([])).toEqual([])
    })
})
