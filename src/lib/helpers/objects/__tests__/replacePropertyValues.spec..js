import { replacePropertyValues } from '../replacePropertyValues'

const objectList = [
    {
        Id: 1,
        Property1: 11,
        Property2: 'Second',
        Property3: false,
        Property4: undefined,
    },
    {
        Id: 2,
        Property1: 11,
        Property2: 'Second',
        Property3: true,
        Property4: null,
    },
    {
        Id: 3,
        Property1: 35,
        Property2: 'Another property',
        Property3: false,
        Property4: 'Yes',
    },
    {
        Id: 4,
        Property1: 58,
        Property2: 'Second',
        Property3: true,
    },
]

describe('replacePropertyValues', () => {
    it('Replaces numeric properties correctly', () => {
        const newList = replacePropertyValues(
            objectList,
            'Property1',
            [11, 58],
            813
        )

        expect(newList).toStrictEqual([
            {
                Id: 1,
                Property1: 813,
                Property2: 'Second',
                Property3: false,
                Property4: undefined,
            },
            {
                Id: 2,
                Property1: 813,
                Property2: 'Second',
                Property3: true,
                Property4: null,
            },
            {
                Id: 3,
                Property1: 35,
                Property2: 'Another property',
                Property3: false,
                Property4: 'Yes',
            },
            {
                Id: 4,
                Property1: 813,
                Property2: 'Second',
                Property3: true,
            },
        ])
    })

    it('Replaces string properties correctly', () => {
        const newList = replacePropertyValues(
            objectList,
            'Property2',
            ['Second'],
            'Replacement string'
        )

        expect(newList).toStrictEqual([
            {
                Id: 1,
                Property1: 11,
                Property2: 'Replacement string',
                Property3: false,
                Property4: undefined,
            },
            {
                Id: 2,
                Property1: 11,
                Property2: 'Replacement string',
                Property3: true,
                Property4: null,
            },
            {
                Id: 3,
                Property1: 35,
                Property2: 'Another property',
                Property3: false,
                Property4: 'Yes',
            },
            {
                Id: 4,
                Property1: 58,
                Property2: 'Replacement string',
                Property3: true,
            },
        ])
    })

    it('Replaces boolean values correctly', () => {
        const newList = replacePropertyValues(
            objectList,
            'Property3',
            [false],
            true
        )

        expect(newList).toStrictEqual([
            {
                Id: 1,
                Property1: 11,
                Property2: 'Second',
                Property3: true,
                Property4: undefined,
            },
            {
                Id: 2,
                Property1: 11,
                Property2: 'Second',
                Property3: true,
                Property4: null,
            },
            {
                Id: 3,
                Property1: 35,
                Property2: 'Another property',
                Property3: true,
                Property4: 'Yes',
            },
            {
                Id: 4,
                Property1: 58,
                Property2: 'Second',
                Property3: true,
            },
        ])
    })

    it('Replaces null values correctly', () => {
        const newList = replacePropertyValues(
            objectList,
            'Property4',
            [null],
            'A non-null value'
        )

        expect(newList).toStrictEqual([
            {
                Id: 1,
                Property1: 11,
                Property2: 'Second',
                Property3: false,
                Property4: undefined,
            },
            {
                Id: 2,
                Property1: 11,
                Property2: 'Second',
                Property3: true,
                Property4: 'A non-null value',
            },
            {
                Id: 3,
                Property1: 35,
                Property2: 'Another property',
                Property3: false,
                Property4: 'Yes',
            },
            {
                Id: 4,
                Property1: 58,
                Property2: 'Second',
                Property3: true,
            },
        ])
    })

    it('Replaces or creates undefined values correctly', () => {
        const newList = replacePropertyValues(
            objectList,
            'Property4',
            [undefined],
            'A non-null value'
        )

        expect(newList).toStrictEqual([
            {
                Id: 1,
                Property1: 11,
                Property2: 'Second',
                Property3: false,
                Property4: 'A non-null value',
            },
            {
                Id: 2,
                Property1: 11,
                Property2: 'Second',
                Property3: true,
                Property4: null,
            },
            {
                Id: 3,
                Property1: 35,
                Property2: 'Another property',
                Property3: false,
                Property4: 'Yes',
            },
            {
                Id: 4,
                Property1: 58,
                Property2: 'Second',
                Property3: true,
                Property4: 'A non-null value',
            },
        ])
    })
})
