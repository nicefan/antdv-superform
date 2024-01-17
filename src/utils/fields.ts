import { cloneDeep, mergeWith } from 'lodash-es'

export function resetFields(origin, initial = {}) {
  for (const [key, value] of Object.entries(origin)) {
    if (Array.isArray(value)) {
      origin[key] = cloneDeep(initial[key])
    } else if (Object.prototype.toString.call(value) === '[object Object]') {
      resetFields(value, initial[key])
    } else {
      origin[key] = initial[key]
    }
  }
}

export function setFieldsValue(origin, data) {
  mergeWith(origin, data, (objValue, srcValue, key, current) => {
    if (Array.isArray(objValue)) {
      return cloneDeep(srcValue)
      // objValue.splice(0, objValue.length, ...cloneDeep(srcValue))
      // return objValue
    }
  })
}
