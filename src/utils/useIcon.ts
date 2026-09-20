import { getUIService } from '../adapter'
export function getSemanticIconNode(name: string) {
  return getUIService('icons').semantic?.[name]?.()
}
