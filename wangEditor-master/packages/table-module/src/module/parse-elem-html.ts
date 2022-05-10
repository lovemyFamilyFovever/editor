/**
 * @description parse html
 * @author wangfupeng
 */

import { Descendant, Text } from 'slate'
import { IDomEditor, DomEditor } from '@wangeditor/core'
import { TableCellElement, TableRowElement, TableElement } from './custom-types'
import $, { Dom7Array, getTagName, getStyleValue, DOMElement } from '../utils/dom'

function parseCellHtml(
  elem: DOMElement,
  children: Descendant[],
  editor: IDomEditor
): TableCellElement {
  const $elem = $(elem)

  children = children.filter(child => {
    if (Text.isText(child)) return true
    if (editor.isInline(child)) return true
    return false
  })

  // 无 children ，则用纯文本
  if (children.length === 0) {
    children = [{ text: $elem.text().replace(/\s+/gm, ' ') }]
  }

  const colSpan = parseInt($elem.attr('colSpan') || '1')
  const rowSpan = parseInt($elem.attr('rowSpan') || '1')

  return {
    type: 'table-cell',
    isHeader: getTagName($elem) === 'th',
    colSpan,
    rowSpan,
    // @ts-ignore
    children,
  }
}

export const parseCellHtmlConf = {
  selector: 'td,th',
  parseElemHtml: parseCellHtml,
}

function parseRowHtml(
  elem: DOMElement,
  children: Descendant[],
  editor: IDomEditor
): TableRowElement {
  return {
    type: 'table-row',
    // @ts-ignore
    children: children.filter(child => DomEditor.getNodeType(child) === 'table-cell'),
  }
}

export const parseRowHtmlConf = {
  selector: 'tr',
  parseElemHtml: parseRowHtml,
}

function parseTableHtml(
  elem: DOMElement,
  children: Descendant[],
  editor: IDomEditor
): TableElement {
  const $elem = $(elem)

  // 判断 fullWidth
  let fullWidth = false

  if (!fullWidth) {
    fullWidth = getStyleValue($elem, 'width') === '100%'
  }
  if (!fullWidth) {
    fullWidth = $elem.attr('width') === '100%' // 兼容 V4
  }

  return {
    type: 'table',
    fullWidth,
    // @ts-ignore
    children: children.filter(child => DomEditor.getNodeType(child) === 'table-row'),
  }
}

export const parseTableHtmlConf = {
  selector: 'table',
  parseElemHtml: parseTableHtml,
}
