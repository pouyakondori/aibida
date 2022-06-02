/**
 * Returns the left-hand parameter if the parameter is not null;
 * otherwise it returns the right hand parameter.
 * @param check The parameter to test
 * @param replacement Is the expression to be returned if the parameter 'check' is null
 */
export function coalesce(check: unknown, replacement: unknown): unknown {
    return check == undefined || check === null ? replacement : check
}
