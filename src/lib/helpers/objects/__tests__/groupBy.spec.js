import { groupBy } from '../groupBy'

describe('groupBy', () => {
    const input = [
        { foo1: 'bar1' },
        { foo2: 'bar2' },
        { foo3: 'bar3' },
        { foo2: 'bar2' },
        { foo2: 'bar5' },
    ]

    const expectedOutput = {
        undefined: [{ foo1: 'bar1' }, { foo3: 'bar3' }],
        bar2: [{ foo2: 'bar2' }, { foo2: 'bar2' }],
        bar5: [{ foo2: 'bar5' }],
    }

    test('finds shallow property', () => {
        expect(groupBy(input, 'foo2')).toStrictEqual(expectedOutput)
    })
})
