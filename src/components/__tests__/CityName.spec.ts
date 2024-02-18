import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CityName from '@/components/CityName.vue'

describe('CityName', () => {
  it('renders properly', () => {
    const wrapper = mount(CityName, { props: { cityName: 'Test City' } })
    expect(wrapper.text()).toContain('Test City')
  })
})
