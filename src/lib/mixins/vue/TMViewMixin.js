export const TMViewMixin = {
    created: function () {
        const selectedYear = this.$store.getters.selectedYear
        selectedYear && this.fetchViewYearlyData(selectedYear.Id)

        this.$watch(
            function () {
                return this.$store.getters.selectedYear
            },
            function (newVal) {
                newVal && this.fetchViewYearlyData(newVal.Id)
            }
        )
    },
}
