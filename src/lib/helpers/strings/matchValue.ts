import { isEmpty } from '../core/isEmpty'
import { deAccent } from './deAccent'

/**
 * Returns true if value (accented or un-accented) includes check-string.
 * @param value Value to compare
 * @param check String to compare against
 */
export function matchValue(value: unknown, check: string): boolean {
    const emptyCheck = isEmpty(check)
    const checkStr = !emptyCheck ? check.toLowerCase() : ''

    if (isEmpty(value) || emptyCheck) {
        return emptyCheck
    }

    const valueStr = String(value).toLowerCase()

    return valueStr.includes(checkStr) || deAccent(valueStr).includes(checkStr)
}
