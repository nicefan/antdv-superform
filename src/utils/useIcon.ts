import { globalConfig } from '../config'
import { renderUIIcon, renderUISemanticIcon } from '../adapter'

export function getIconNode(icon) {
  return renderUIIcon(icon, { customIcon: globalConfig.customIcon })
}

export const getSemanticIconNode = renderUISemanticIcon
