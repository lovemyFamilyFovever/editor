/**
 * @description bulletedList menu test
 * @author luochao
 */

import {
  bulletedToHtmlConf,
  numberedToHtmlConf,
  listItemToHtmlConf,
} from '../src/module/elem-to-html'

describe('module elem-to-html', () => {
  const fixtures = [
    {
      name: 'bulletedToHtmlConf',
      value: bulletedToHtmlConf,
      type: 'bulleted-list',
      childrenHtml: '<li>123</li>',
      output: '<ul><li>123</li></ul>',
    },
    {
      name: 'numberedToHtmlConf',
      value: numberedToHtmlConf,
      type: 'numbered-list',
      childrenHtml: '<li>123</li>',
      output: '<ol><li>123</li></ol>',
    },
    {
      name: 'listItemToHtmlConf',
      value: listItemToHtmlConf,
      type: 'list-item',
      childrenHtml: '<span>123</span>',
      output: '<li><span>123</span></li>',
    },
  ]

  fixtures.forEach(i => {
    describe(`${i.name}`, () => {
      test(`${i.name} should return object that include "type" and "elemToHtml" property`, () => {
        expect(i.value.type).toBe(i.type)
        expect(typeof i.value.elemToHtml).toBe('function')
      })

      test(`${i.name} elemToHtml fn should return html ${i.type} string`, () => {
        const element = {
          type: i.type,
          children: [],
        }
        expect(i.value.elemToHtml(element, i.childrenHtml)).toBe(i.output)
      })
    })
  })
})
