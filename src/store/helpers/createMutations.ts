import { Mutation } from 'vuex'

type MutationsSet<T> = Record<string, Mutation<T>>

/**
 * Helper for creating similar mutations
 *
 * @param mutationNames Array of strings, mutation names
 * @param mutationFunction Function which mutation should perform
 */
export function createMutations<T>(
    mutationNames: string[],
    mutationFunction: Mutation<T>
): MutationsSet<T> {
    return mutationNames.reduce((acc: MutationsSet<T>, val) => {
        acc[val] = mutationFunction
        return acc
    }, {})
}
