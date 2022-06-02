import { dateBetween } from '../dateBetween'

describe('dateBetween', () => {
    test('properly checks dates in string format', () => {
        const beginDate = '2018-11-10'
        const endDate = '2030-02-15'
        const insideDate = '2020-02-15'
        const outsideDate = '1950-02-15'
        expect(dateBetween(beginDate, endDate, insideDate)).toBe(true)
        expect(dateBetween(beginDate, endDate, outsideDate)).toBe(false)
    })

    test('properly checks dates in date format', () => {
        const beginDate = new Date(2018, 11, 10)
        const endDate = new Date(2030, 11, 10)
        const insideDate = new Date(2020, 11, 10)
        const outsideDate = new Date(1950, 11, 10)
        expect(dateBetween(beginDate, endDate, insideDate)).toBe(true)
        expect(dateBetween(beginDate, endDate, outsideDate)).toBe(false)
    })
})
