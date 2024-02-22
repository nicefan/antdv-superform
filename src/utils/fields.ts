import { cloneDeep, mergeWith } from 'lodash-es'

export function resetFields(origin, data = {}, initial = {}) {
  for (const [key, value] of Object.entries(origin)) {
    if (Array.isArray(value)) {
      origin[key] = cloneDeep(data[key] ?? initial[key])
    } else if (Object.prototype.toString.call(value) === '[object Object]') {
      resetFields(value, data[key], initial[key])
    } else {
      origin[key] = data[key] ?? initial[key]
    }
  }
}

export function setFieldsValue(origin, data, initial = {}) {
  for (const [key, value] of Object.entries(data)) {
    const newData = value ?? initial[key]
    if (Array.isArray(newData)) {
      origin[key] = cloneDeep(newData)
    } else if (Object.prototype.toString.call(newData) === '[object Object]') {
      setFieldsValue(origin[key], newData, initial[key])
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
