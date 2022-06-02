import { shallowMount, createLocalVue } from '@vue/test-utils'
import AibidiaLoadingIndicator from './AibidiaLoadingIndicator.ts.vue'
import Buefy from 'buefy'

describe('LoadingIndicator', () => {
    const localVue = createLocalVue()
    localVue.use(Buefy)

    it('has loading text in long form', () => {
        const wrapper = shallowMount(AibidiaLoadingIndicator, {
            localVue,
            propsData: {
                active: true,
                fullForm: true,
                text: 'foobar',
            },
        })

        expect(wrapper.text()).toContain('foobar')
    })

    it('does not have loading text in short form', () => {
        const wrapper = shallowMount(AibidiaLoadingIndicator, {
            localVue,
            propsData: {
                active: true,
                text: 'foobar',
            },
        })

        expect(wrapper.text()).not.toContain('foobar')
    })

    it('is empty if not active', () => {
        const wrapper = shallowMount(AibidiaLoadingIndicator, {
            localVue,
        })

        expect(wrapper.text()).toHaveLength(0)
    })
})
