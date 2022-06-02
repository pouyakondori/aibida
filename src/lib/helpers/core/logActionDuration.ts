/**
 * Logs to console time in milliseconds between two timestamps
 * @param timeRange Tuple with event start and event end timestamps in milliseconds
 * @param event Event name or description
 */
export function logActionDuration(
    timeRange: readonly [start: number, end: number],
    event: string
): void {
    if (process.env.NODE_ENV === 'development') {
        const toleranceThreshold = 1000
        const badColor = 'red'
        const goodColor = 'green'
        const responseTime = Math.round(timeRange[1] - timeRange[0])

        const logColor =
            responseTime > toleranceThreshold ? badColor : goodColor

        console.log(`%c${responseTime} ms: ${event}`, `color: ${logColor};`)
    }
}
