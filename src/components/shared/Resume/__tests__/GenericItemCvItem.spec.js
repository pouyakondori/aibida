import { shallowMount } from '@vue/test-utils'
import GenericCvItem from 'components/shared/Resume/GenericCvItem.ts.vue'

describe('GenericCvItem', () => {
    it('renders date correctly', () => {
        const wrapper = shallowMount(GenericCvItem, {
            propsData: {
                item: {
                    date: 'Dec 2021 - Present',
                    label: 'Front end Developer',
                    description: 'PrimeIT, Porto - Portugal'
                }
            }
        })

        expect(wrapper.find('.generic-cv-item .date').exists()).toBe(true)
        expect(wrapper.find('.generic-cv-item .date').text()).toBe('Dec 2021 - Present')
    })
})
