import { eventPath } from '../eventPath'
import { mount } from '@vue/test-utils'

// Define quick component template
const Component = {
    template: `
    <div id="foo">
      <div id="bar">
        <div id="zar" @click="$event => $emit('click', $event)">
         </div>
      </div>
    </div>`,
}

describe('eventPath', () => {
    test('returns path of expected form', () => {
        // We simulate eventPath and expect the path to be array of elements
        let path = null
        const wrapper = mount(Component, {
            listeners: {
                click: $event => {
                    // Click handler calls the testing method and assigns the path
                    path = eventPath($event)
                },
            }
        })

        // Trigger the actual click so we get proper event
        wrapper.find('#zar').trigger('click')

        // Now we should have path properly built
        expect(path.length).toBe(4)
        expect(path[0].id).toBe('zar')
        expect(path[1].id).toBe('bar')
        expect(path[2].id).toBe('foo')
        expect(path[3]).toBe(window)
    })
})
