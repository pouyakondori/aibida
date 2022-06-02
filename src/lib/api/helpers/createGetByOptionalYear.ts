import { RequestMaker } from '../RequestMaker'

import type { GetByOptionalYear } from 'types/crud'

/**
 * Creates GET endpoint with optional refinement by a given year
 * @param requestMaker Collection of methods for authenticating and making Axios requests
 * @param entity Name of the business logic entity to include in requests
 */
export function createGetByOptionalYear<T>(
    requestMaker: RequestMaker,
    entity: string,
): GetByOptionalYear<T> {
    return (yearId: number | null | undefined) => {
        return requestMaker.get(
            yearId
                ? `years/${yearId}/${entity}`
                : entity
        )
    }
}
