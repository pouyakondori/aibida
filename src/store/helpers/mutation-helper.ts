import { coerceKey } from 'lib/helpers/core/coerceKey'
import equals from 'fast-deep-equal/es6'
import { clone } from 'ramda'

import type {
    StateAsMap,
    StateAsMapByYears,
    StateAsMapByYearsDeep,
} from 'types/State'

interface KeyConfig {
    /** Property name of the year identifier */
    yearKey?: string
    /** Property name of the item identifier */
    itemKey?: string
    /** Function to create a value which is set to the itemKey property. Function gets the item and array index as parameters.. Default value: null */
    createIdFn?: (item: unknown, arg: unknown) => unknown | null
}

interface DataUpdatedByYear {
    items: Record<string, unknown>[]
    [TransactionYearId: string]: unknown
}

/**
 * Constructs some entity's updated state in map form based on updated data in array form.
 * Use for lists of data NOT grouped by year.
 *
 * @example:
 * // Say, we have state in the form of
 * {'1': {'Id': 1, 'Foo': 'bar'}, '2': {'Id': 2, 'Foo': 'bar'}}
 * // And we get updated data in the form of
 * [{'Id': 2, 'Foo': 'new'}, {'Id': 3, 'Foo': 'new'}]
 * // We want to use `Id` as key and we want to get the result updated state in the form of
 * {'1': {'Id': 1, 'Foo': 'bar'}, '2': {'Id': 2, 'Foo': 'new'}, '3': {'Id': 3, 'Foo': 'new'}}
 *
 * @param state Objects from current state in map form, like `{'1': {'Id': 1, 'Foo': 'bar'}, '2': {'Id': 2, 'Foo': 'bar'}}`
 * @param updatedData Objects in array form that we want to update current state with, like `[{'Id': 2, 'Foo': 'new'}, {'Id': 3, 'Foo': 'new'}]`
 * @param itemKey Name of the key we want to use in the map
 */
export function updateData(
    state: StateAsMap<unknown> | null,
    updatedData: Record<string, unknown>[],
    itemKey = 'Id'
): StateAsMap<unknown> | null {
    const updatedState: StateAsMap<unknown> = updatedData.reduce(
        (acc: StateAsMap<unknown>, val) => {
            // Try to extract the key we want to group by. Often it will be some Id
            const key = coerceKey(val[itemKey])
            // Construct updated value only if key makes sense
            if (key) {
                acc[key] = val
            }

            return acc
        },
        {}
    )

    if (equals(state, updatedState)) {
        console.log('State has not changed')
        return state
    }

    return {
        ...state,
        ...updatedState,
    }
}

/**
 * Updates entity's state in object form group by year with an array of new objects.
 * Use for lists of data grouped by year.
 * Removes previous data for selected year
 *
 * @example
 * // Say, we have state in the form of
 * {'100': {'1': {'Id': 1, TransactionYearId: 100, 'Foo': 'bar'}}}
 * // And we get updated data in the form of
 * [{'Id': 2, 'Foo': 'new'}, {'Id': 3, 'Foo': 'new'}]
 * // We want to use `Id` as key and we want to get the result updated state in the form of
 * {'100': {'2': {'Id': 2, TransactionYearId: 100, 'Foo': 'bar'}}, {'3': {'Id': 3, TransactionYearId: 100, 'Foo': 'new'}}}
 *
 * @param state Objects from current state in map form, like `{'100': {'1': {'Id': 1, TransactionYearId: 100, 'Foo': 'bar'}}}`
 * @param data Object with input data. Contains dynamic year key and flat array of updated data
 * @param config: Instruction how to transform new data into state
 */
export function updateYearData<T>(
    state: StateAsMapByYears<T> | null,
    data: DataUpdatedByYear,
    config: KeyConfig = {}
): StateAsMapByYears<T> {
    const yearKey = config.yearKey || 'TransactionYearId'
    const itemKey = config.itemKey || 'Id'
    const createIdFn = config.createIdFn || null

    // Transform null state into empty state
    if (!state) {
        state = {}
    }

    // Try to extract value to use as year key
    const yearKeyValue = coerceKey(data[yearKey])

    // Proceed only if year key makes sense
    if (yearKeyValue) {
        // Construct updated state from new data array
        const updatedState: StateAsMapByYears<T> = data.items.reduce(
            (acc: StateAsMapByYears<T>, val, idx) => {
                if (!acc[yearKeyValue]) {
                    acc[yearKeyValue] = {}
                }

                // Extract item key value alling a constructor function
                if (createIdFn) {
                    val[itemKey] = createIdFn(val, idx)
                }

                // Coerce value to string type.
                const itemKeyValue = coerceKey(val[itemKey])

                // Construct updated value only if item key makes sense
                if (itemKeyValue) {
                    acc[yearKeyValue][itemKeyValue] = val as T
                }

                return acc
            },
            {}
        )

        if (equals(state[yearKeyValue], updatedState[yearKeyValue])) {
            console.log('State has not changed')
            return state
        }

        return {
            ...state,
            ...updatedState,
        }
    }

    // If something was wrong with updated data signature
    // Copy object for Vuex to track change
    return { ...state }
}

/**
 * Updates some entity's state in object form grouped by year with a single input object
 * Use for single data items grouped by year.
 *
 * @example:
 * // Say, we have state in the form of
 * {'100': {'1': {'Id': 1, TransactionYearId: 100, 'Foo': 'bar'}}}
 * // And we get updated data in the form of
 * {'Id': 1, TransactionYearId: 100, 'Foo': 'new'}
 * // We want to use 'TransactionYearId' as year key and 'Id' as item key, and we want to get the result updated state in the form of
 * {'100': {'1': {'Id': 1, TransactionYearId: 100, 'Foo': 'new'}}}
 *
 * @param state Objects from current state in map form, like `{'100': {'1': {'Id': 1, TransactionYearId: 100, 'Foo': 'bar'}}}`
 * @param data Single object that we want to update current state with, like `{'Id': 1, TransactionYearId: 100, 'Foo': 'new'}`
 * @param config Instruction how to transform new data into state
 */
export function updateYearItemData<T>(
    state: StateAsMapByYears<T> | null,
    data: Record<string, unknown>,
    config: KeyConfig = {}
): StateAsMapByYears<T> {
    const yearKey = config.yearKey || 'TransactionYearId'
    const itemKey = config.itemKey || 'Id'
    const createIdFn = config.createIdFn || null

    // Transform null state into empty state
    if (!state) {
        state = {}
    }

    const newState = clone(state)

    if (data) {
        // Transform item key value if transform function is provided
        if (itemKey && createIdFn) {
            data[itemKey] = createIdFn(data, null)
        }

        if (yearKey && itemKey) {
            const yearKeyValue = coerceKey(data[yearKey])
            const itemKeyValue = coerceKey(data[itemKey])

            // Create year record only if year key makes sense
            if (yearKeyValue) {
                // Empty value for year key does not exist
                if (!newState[yearKeyValue]) {
                    newState[yearKeyValue] = {}
                }

                // Create item record only if item key makes sense
                if (itemKeyValue) {
                    newState[yearKeyValue][itemKeyValue] = data as T
                }
            }
        }
    }

    return newState
}

/**
 * Injects single data into store object which has 3-level nesting.
 * First level is year, then there are two levels of nested item keys.
 *
 * @example:
 * // Say, we have state like
 * {'100': {'1': {'50': {'Id': 50, 'EntityId': 1, 'TransactionYearId': 100, 'Foo': 'bar'}}}}
 * // And we get updated data in the form of
 * {'Id': 50, 'EntityId': 1, 'TransactionYearId': 100, 'Foo': 'new'}
 * // We want to use `TransactionYearId` as year key, `EntityId` as first level item key, `Id` as second level item key,
 * // and we want to get the result updated state in the form of
 * {'100': {'1': {'50': {'Id': 50, 'EntityId': 1, 'TransactionYearId': 100, 'Foo': 'new'}}}}
 *
 * @param  state Module's state property
 * @param  data Data to update the state property
 * @param  yearKey Name of the year's key property.
 * @param  item1Key Name of the item's key property in the nested object
 * @param  item2Key Name of the nested item's key property in the nested object
 */
export function updateYearItemItemData(
    state: StateAsMapByYearsDeep | null,
    data: Record<string, unknown>,
    yearKey = 'TransactionYearId',
    item1Key = 'EntityId',
    item2Key = 'Id'
): StateAsMapByYearsDeep {
    // Transform null state into empty state
    if (!state) {
        state = {}
    }

    const newState = clone(state)

    if (data) {
        // Extract keys from data
        const yearKeyValue = coerceKey(data[yearKey])
        const item1KeyValue = coerceKey(data[item1Key])
        const item2KeyValue = coerceKey(data[item2Key])

        // Create empty record for year key if it's not present
        if (yearKeyValue) {
            if (!newState[yearKeyValue]) {
                newState[yearKeyValue] = {}
            }

            // Create empty record for item key if it's not present
            if (item1KeyValue) {
                if (!newState[yearKeyValue][item1KeyValue]) {
                    newState[yearKeyValue][item1KeyValue] = {}
                }

                // Add item under third level record
                if (item2KeyValue) {
                    newState[yearKeyValue][item1KeyValue][item2KeyValue] = data
                }
            }
        }
    }

    return newState
}

/**
 * Deletes record from state object by it's year and item keys.
 * State should be in the form of records grouped by year
 *
 * @example:
 * // Say, we have state object like
 * {'100': {'1': {'Id': 1, 'TransactionYearId': 100, 'Foo': 'bar'}}}
 * // and we want to delete record with item key 1 and year key 100.
 * // We want the updated state to be
 * {'100': {}}
 *
 * @param state Module's state property
 * @param yearKeyValue Value of the year's key property.
 * @param itemKeyValue Value of the item's key property.
 */
export function deleteYearItemData<T>(
    state: StateAsMapByYears<T> | null,
    yearKeyValue: string | number,
    itemKeyValue: string | number
): StateAsMapByYears<T> {
    // Transform null state into empty state
    if (!state) {
        return {}
    }

    const newState = clone(state)
    delete newState[yearKeyValue]?.[itemKeyValue]
    return newState
}

/**
 * Retrieves item object from state by its year and object keys
 * State should be in the form of records grouped by year
 *
 * @example:
 * // Say, we have state
 * {'100': {'1': {'Id': 1, 'TransactionYearId': 100, 'Foo': 'bar'}}}
 * //Provided year key 100 and item key 1, we want to get
 * {'Id': 1, 'TransactionYearId': 100, 'Foo': 'bar'}
 *
 * @param state Module's state property
 * @param yearKeyValue Value of the year's key property.
 * @param itemKeyValue Value of the item's key property.
 */
export function getYearItem<T>(
    state: StateAsMapByYears<T> | null,
    yearKeyValue: string | number,
    itemKeyValue: string | number
): T | undefined {
    return state?.[yearKeyValue]?.[itemKeyValue] as T
}
