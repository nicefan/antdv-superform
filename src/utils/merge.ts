import { mergeWith } from 'lodash-es'

/**
 * 合并对象，数组会被覆盖，undefined 会被删除
 * @param obj 目标对象
 * @param source 源对象
 * @returns 合并后的对象
 */
export const merge = (obj, ...source) => {
  return mergeWith(obj, ...source, (objValue, srcValue, key, current) => {
    if (srcValue === undefined) {
      current[key] = undefined
    } else if (Array.isArray(objValue)) {
      return srcValue
    }
  })
}
