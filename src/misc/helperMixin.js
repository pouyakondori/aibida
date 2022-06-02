import { isNullOrWhitespace } from 'lib/helpers'

export default {
    methods: {
        /**
         * Indicates whether a specified string is null, empty, or consists only of white-space characters.
         * @param {string} text The string to test
         */
        isNullOrWhitespace: text => {
            return isNullOrWhitespace(text)
        },

        /**
         * Safe float equality comparison. By default precision of 4 decimals is used when fixing precision for comparison.
         * @param {number | string} value
         * @param {number | string} compared
         * @param {number} precision Number of decimals used in comparison
         */
        floatEquals: (value, compared, precision = 4) => {
            const fValue = parseFloat(value).toFixed(precision)
            const fCompared = parseFloat(compared).toFixed(precision)
            if (fValue > compared) {
                return (
                    parseFloat(fValue) - parseFloat(fCompared) < Number.EPSILON
                )
            }

            return parseFloat(fCompared) - parseFloat(fValue) < Number.EPSILON
        },
    },
}
