import type { MutationType } from 'types/MutationType'

/**
 * Helper for creating mutations with pending/success/error stages.
 *
 * @example
 * fetchEntities = mutationTypeCreator('FETCH_ENTITIES');
 * // Resulting object is
 * {Pending: 'FETCH_ENTITIES', Success: 'FETCH_ENTITIES_SUCCESS', Error: 'FETCH_ENTITIES_ERROR'}
 *
 * @param actionBaseName Base name for created mutation names.
 */
export function mutationTypeCreator(actionBaseName: string): MutationType {
    return {
        Pending: actionBaseName,
        Success: actionBaseName + '_SUCCESS',
        Error: actionBaseName + '_ERROR',
    }
}
