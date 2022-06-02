import { clearChildValues } from '../clear-child-values'

const ChildPropertyId = 'ChildPropertyId'

const parentList = [
    {
        Id: 1,
        ChildPropertyId: 2, // Deleted property in both child lists
        OtherPropertyId: 3,
    },
    {
        Id: 2,
        ChildPropertyId: 2, // Deleted property in both child lists
        OtherPropertyId: 5,
    },
    {
        Id: 3,
        ChildPropertyId: 5,
        OtherPropertyId: 4,
    },
    {
        Id: 4,
        ChildPropertyId: 1, // Deleted property in 'items'
        OtherPropertyId: 3,
    },
    {
        Id: 5,
        ChildPropertyId: 7,
        OtherPropertyId: 5,
    },
    {
        Id: 6,
        ChildPropertyId: 12,
        OtherPropertyId: 4,
    },
]

const items = [
    {
        Id: 1,
        Name: 'Deleted property 1',
    },
    {
        Id: 2,
        Name: 'Deleted property 2',
    }
]

const alternateItems = [
    {
        PropertyId: 2,
        Name: 'Deleted property with fancy key',
    }
]

describe('clearChildValues', () => {
    it('Modifies the data correctly', () => {
        const newList = clearChildValues(parentList, ChildPropertyId, items)

        // Assert that each object has the correct values
        expect(newList).toStrictEqual([
            {
                Id: 1,
                ChildPropertyId: null,
                OtherPropertyId: 3,
            },
            {
                Id: 2,
                ChildPropertyId: null,
                OtherPropertyId: 5,
            },
            {
                Id: 3,
                ChildPropertyId: 5,
                OtherPropertyId: 4,
            },
            {
                Id: 4,
                ChildPropertyId: null,
                OtherPropertyId: 3,
            },
            {
                Id: 5,
                ChildPropertyId: 7,
                OtherPropertyId: 5,
            },
            {
                Id: 6,
                ChildPropertyId: 12,
                OtherPropertyId: 4,
            },
        ])
    })

    it('Handles items with the correct property key', () => {
        const newList = clearChildValues(
            parentList,
            ChildPropertyId,
            alternateItems,
            'PropertyId'
        )

        // Assert that each object has the correct values
        expect(newList).toStrictEqual([
            {
                Id: 1,
                ChildPropertyId: null,
                OtherPropertyId: 3,
            },
            {
                Id: 2,
                ChildPropertyId: null,
                OtherPropertyId: 5,
            },
            {
                Id: 3,
                ChildPropertyId: 5,
                OtherPropertyId: 4,
            },
            {
                Id: 4,
                ChildPropertyId: 1,
                OtherPropertyId: 3,
            },
            {
                Id: 5,
                ChildPropertyId: 7,
                OtherPropertyId: 5,
            },
            {
                Id: 6,
                ChildPropertyId: 12,
                OtherPropertyId: 4,
            },
        ])
    })
})
