import { getOffsetRect } from '../getOffsetRect'

describe('getOffsetRect', () => {
    test('returns object of expected form', () => {
        // We can't really emulate getBoundingClientRect as JSDOM does not do actual rendering,
        // and there is not enough reason to mock stuff,
        // so we only check that object has all expected properties with 0 values
        document.body.innerHTML = '<div id="foo">bar</div>'
        const el = document.getElementById('foo')
        expect(getOffsetRect(el)).toStrictEqual({
            top: 0,
            left: 0,
            width: 0,
            height: 0,
        })
    })
})
