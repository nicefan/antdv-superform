import { cloneDeep, isPlainObject } from 'lodash-es'

const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key)

export function resetFields(origin, data = {}, initial = {}) {
  for (const [key, value] of Object.entries(origin)) {
    if (Array.isArray(value)) {
      origin[key] = cloneDeep(data?.[key] ?? initial?.[key])
    } else if (Object.prototype.toString.call(value) === '[object Object]') {
      resetFields(value, data?.[key], initial?.[key])
    } else {
      origin[key] = data?.[key] ?? initial?.[key]
    }
  }
}

export function setFieldsValue(origin, data, initial = {}) {
  for (const [key, currentValue] of Object.entries(origin)) {
    if (!hasOwn(data, key)) continue

    const newData = data[key] ?? initial?.[key]
    if (isPlainObject(currentValue) && isPlainObject(newData)) {
      setFieldsValue(currentValue, newData, initial?.[key])
    } else if (Array.isArray(newData) || isPlainObject(newData)) {
      origin[key] = cloneDeep(newData)
    } else {
      origin[key] = newData
    }
  }
  // mergeWith(origin, data, (objValue, srcValue, key, current) => {
  //   if (Array.isArray(objValue)) {
  //     return cloneDeep(srcValue)
  //     // objValue.splice(0, objValue.length, ...cloneDeep(srcValue))
  //     // return objValue
  //   }
  // })
}
