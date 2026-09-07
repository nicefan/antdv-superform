import { globalConfig } from '../config'
import { renderUIIcon, renderUISemanticIcon } from '../adapter'

export function getIconNode(icon) {
  if (!icon) return
  return renderUIIcon(icon, { customIcon: globalConfig.customIcon })
}

export const getSemanticIconNode = renderUISemanticIcon
