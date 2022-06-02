import type { StateAsMap, StateAsMapByYears } from 'types/State'

/**
 * Returns all state entities for a currently globally selected year
 *
 * @example
 * // State property looks like
 * {'1': {'1': {..}, '2': {..}}, '2': {'3': {..}, '4': {..}}}
 * // where top level properties are year id and second level properties are object id,
 * // so we have objects grouped by years. So we're getting back
 * {'1': {..}, '2': {..}}
 *
 * Generic parameter T is entity type, like business line or ruling.
 *
 * @param state Property inside Vuex store with a collection of objects, grouped by year
 * @param getters Vuex global getters
 */
export function getYearObject<T>(
    state: StateAsMapByYears<T> | null,
    getters: { selectedYearId: string }
): StateAsMap<T> | null {
    return state?.[getters.selectedYearId] || null
}

/** Transform map-like collection (object) to vector-like collection (array)
 *
 * @param data Property inside Vuex store with a collection of objects
 * @param getters Vuex global getters
 * @param mapFn Transformation function to extract additional data. Mainly about applying other getter inside
 * @param preMapCheckFn First check function. Lambda like `(item) => item.prop === 'foo'`
 * @param postMapCheckFn Second check function for trying after mapping. Lambda like `(item) => item.prop === 'foo'`
 */
export function getObjectAsArray<T, S>(
    data: Record<string, T> | null,
    getters: { selectedYearId: string },
    mapFn: ((item: T | Record<string, T>, getters: unknown) => S) | null = null,
    preMapCheckFn: ((item: T | Record<string, T>) => unknown) | null = null,
    postMapCheckFn: ((item: T | Record<string, T> | S) => unknown) | null = null
): Array<T | S> {
    const list = []
    if (data) {
        for (const key of Object.keys(data)) {
            const item = data[key]
            // We only want to get items that pass the first check function if it's there
            if (!preMapCheckFn || preMapCheckFn(item)) {
                // Apply map function if it's there
                const listItem = mapFn ? mapFn(item, getters) : item
                // We only want to get items that pass the second check function if it's there
                if (!postMapCheckFn || postMapCheckFn(listItem)) {
                    list.push(listItem)
                }
            }
        }
    }

    return list
}

/**
 * Returns objects from state for a current year that pass criteria after certain transformations.
 *
 * @example
 * // State property looks like
 * {'1': {'1': {..}, '2': {..}}, '2': {'3': {..}, '4': {..}}}
 * // where top level properties are year id and second level properties are object id,
 * // so we have objects grouped by years.
 *
 * Takes two generic parameters: T for the object we're originally searching
 * And S for the mapping function transformation result.
 *
 * @param state Property inside Vuex store with a collection of objects
 * @param getters Vuex global getters
 * @param mapFn Transformation function to extract additional data. Mainly about applying other getter inside
 * @param preMapCheckFn First check function. Lambda like `(item) => item.prop === 'foo'`
 * @param postMapCheckFn Second check function for trying after mapping. Lambda like `(item) => item.prop === 'foo'`
 */
export function getYearObjectAsArray<T, S>(
    state: StateAsMapByYears<T> | null,
    getters: { selectedYearId: string },
    mapFn: ((item: T | Record<string, T>, getters: unknown) => S) | null = null,
    preMapCheckFn: ((item: T | Record<string, T>) => unknown) | null = null,
    postMapCheckFn: ((item: T | Record<string, T> | S) => unknown) | null = null
): Array<T | Record<string, T> | S> {
    const data = getYearObject(state, getters) || null
    return getObjectAsArray<T, S>(
        data,
        getters,
        mapFn,
        preMapCheckFn,
        postMapCheckFn
    )
}

/**
 * Extracts an object from a vuex state property by its id.
 *
 * @example
 * // State property looks like
 * {'1': {'1': {..}, '2': {..}}, '2': {'3': {..}, '4': {..}}}
 * // where top level properties are year id and second level properties are object id,
 * // so we have objects grouped by years.
 *
 * Tries to extract id only for current globally selected year.
 *
 * Takes two generic parameters: T for the object we're originally searching
 * And S for the mapping function transformation result.
 *
 * @param state Property inside Vuex store with a collection of objects, grouped by year
 * @param getters Vuex global getters
 * @param id Id of the element to retrieve
 * @param mapFn Transformation function that calls some additional getters on found object
 */
export function getById<T, S>(
    state: StateAsMapByYears<T> | null,
    getters: { selectedYearId: string },
    id: string | number,
    mapFn?: (item: T, getters: unknown) => S | null
): T | S | null {
    const yearsData = getYearObject(state, getters) || {}
    const item = yearsData[id] as T
    if (item) {
        return mapFn ? mapFn(item, getters) : item
    }

    return null
}
