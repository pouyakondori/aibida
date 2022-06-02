import Analytics from 'views/analytics/Analytics.ts.vue'
import AnalyticsTab from 'views/analytics/AnalyticsTab/AnalyticsTab.ts.vue'
import { RouteConfig } from 'vue-router/types/router'

import type { Category } from 'types/AnalyticsCategory'
import type { AnalyticsCategoryReport } from 'types/AnalyticsCategoryReport'

/**
 * Generates route for a category
 * @param category Analytics category
 */
function getCategoryRoute(category: Category): RouteConfig {
    return {
        children: [],
        component: Analytics,
        meta: {
            categoryId: category.Id,
            breadcrumb: [{ name: 'Analytics' }],
        },
        path: `analytics/categories/${category.Id}`,
    }
}

/**
 * Generates route for a category report
 * @param category Analytics category
 * @param report Analytics report
 * @param idx Report index
 */
function getReportRoute(
    category: Category,
    report: AnalyticsCategoryReport,
    idx: number
): RouteConfig {
    return {
        path: `report/${idx + 1}`,
        component: AnalyticsTab,
        meta: {
            categoryId: category.Id,
            reportId: report.Id,
            breadcrumb: [
                { name: category.Caption },
                {
                    name: report.Caption,
                    icon: 'fa fa-chart-bar',
                },
            ],
        },
    }
}

/**
 * Generates vue-router routes for analytics reports
 * @param categories Analytics categories
 */
export function generateAnalyticsRoutes(categories: Category[]): RouteConfig[] {
    return categories.map(category => {
        // Top level Analytics item for a category
        const categoryRoute = getCategoryRoute(category)

        // Create routes for category reports
        categoryRoute.children = category.Reports.map((report, idx) =>
            getReportRoute(category, report, idx)
        )

        // Redirect to the first report by default
        categoryRoute.children.push({
            path: 'report/',
            redirect: 'report/1',
        })

        return categoryRoute
    })
}
