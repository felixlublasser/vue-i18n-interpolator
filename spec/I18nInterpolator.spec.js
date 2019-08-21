/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

import { createLocalVue, mount } from '@vue/test-utils'
import i18nInterpolator from '@/components/utils/i18nInterpolator'

const localVue = createLocalVue()

describe('utils/i18nInterpolator', function () {
  subject(function () {
    return mount(i18nInterpolator, {
      localVue,
      propsData: { string: $string },
      scopedSlots: $scopedSlots
    })
  })

  const displaysCustomAndTextSlots = function () {
    return it('displays custom and text slots with content', function () {
      expect($subject.contains('[data-spec-custom-slot]')).to.be.true
      expect($subject.find('[data-spec-custom-slot]').text()).to.eq('testProp')
      expect($subject.contains('[data-spec-text-slot]')).to.be.true
      expect($subject.find('[data-spec-text-slot]').text()).to.eq('abc')
    })
  }

  const displaysCustomAndTextSlotsWithQuotes = function () {
    return it('displays custom and text slots with content', function () {
      expect($subject.contains('[data-spec-custom-slot]')).to.be.true
      expect($subject.find('[data-spec-custom-slot]').text()).to.eq('test\'Pro"p')
      expect($subject.contains('[data-spec-text-slot]')).to.be.true
      expect($subject.find('[data-spec-text-slot]').text()).to.eq('abc')
    })
  }

  context('with a custom slot', function () {
    def('string', () => "abc #test{prop: 'testProp'}")
    def('scopedSlots', () => ({
      test: '<span slot-scope="{ prop }" data-spec-custom-slot>{{ prop }}</span>'
    }))

    it('displays custom slot with content', function () {
      expect($subject.contains('[data-spec-custom-slot]')).to.be.true
      expect($subject.find('[data-spec-custom-slot]').text()).to.eq('testProp')
    })

    context('and a text slot', function () {
      def('scopedSlots', () => ({
        text: '<p slot-scope="{ text }" data-spec-text-slot>{{ text }}</p>',
        test: '<span slot-scope="{ prop }" data-spec-custom-slot>{{ prop }}</span>'
      }))

      context('when using no quotes around object keys', function () {
        context('and single quotes around values', function () {
          def('string', () => "abc #test{prop: 'testProp'}")

          displaysCustomAndTextSlots()

          context('using quotes and single quotes in text', function () {
            def('string', () => "abc #test{prop: 'test\\'Pro\"p'}")

            displaysCustomAndTextSlotsWithQuotes()
          })
        })

        context('and double quotes around values', function () {
          // eslint-disable-next-line quotes
          def('string', () => "abc #test{prop: \"testProp\"}")

          displaysCustomAndTextSlots()

          context('using quotes and single quotes in text', function () {
            def('string', () => "abc #test{prop: \"test'Pro\\\"p\"}")

            displaysCustomAndTextSlotsWithQuotes()
          })
        })
      })

      context('when using single quotes around object keys', function () {
        context('and single quotes around values', function () {
          def('string', () => "abc #test{'prop': 'testProp'}")

          displaysCustomAndTextSlots()

          context('using quotes and single quotes in text', function () {
            def('string', () => "abc #test{'prop': 'test\\'Pro\"p'}")

            displaysCustomAndTextSlotsWithQuotes()
          })
        })

        context('and double quotes around values', function () {
          def('string', () => "abc #test{'prop': \"testProp\"}")

          displaysCustomAndTextSlots()

          context('using quotes and single quotes in text', function () {
            def('string', () => "abc #test{'prop': \"test'Pro\\\"p\"}")

            displaysCustomAndTextSlotsWithQuotes()
          })
        })
      })

      context('when using double quotes around object keys', function () {
        context('and single quotes around values', function () {
          def('string', () => "abc #test{\"prop\": 'testProp'}")

          displaysCustomAndTextSlots()

          context('using quotes and single quotes in text', function () {
            def('string', () => "abc #test{\"prop\": 'test\\'Pro\"p'}")

            displaysCustomAndTextSlotsWithQuotes()
          })
        })

        context('and double quotes around values', function () {
          // eslint-disable-next-line quotes
          def('string', () => "abc #test{\"prop\": \"testProp\"}")

          displaysCustomAndTextSlots()

          context('using quotes and single quotes in text', function () {
            def('string', () => "abc #test{\"prop\": \"test'Pro\\\"p\"}")

            displaysCustomAndTextSlotsWithQuotes()
          })
        })
      })
    })
  })
})
