import { h } from 'vue'

export function toNode(node, param: any = {}) {
  if (!node) return null
  if (typeof node === 'function') {
    return (node as Fn)(param || {})
  } else if (typeof node !== 'object') {
    return String(node)
  } else {
    return h(node)
  }
}
