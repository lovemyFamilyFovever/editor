/**
 * @description 自定义 element
 * @author wangfupeng
 */

import { Text } from 'slate'

//【注意】需要把自定义的 Element 引入到最外层的 custom-types.d.ts

export type LinkElement = {
  type: 'link'
  url: string
  target?: string
  children: Text[]
}
