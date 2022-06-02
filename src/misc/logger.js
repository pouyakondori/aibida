function getLogger() {
    if (process.env.NODE_ENV === 'production') {
        return {}
    } else {
        return window.console
    }
}

const logger = getLogger()

export default logger
