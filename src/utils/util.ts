import buildRule from './buildRule'
import { inject, reactive, readonly, ref, shallowReactive, toRef, toRefs, unref, watchEffect } from 'vue'
import { cloneDeep, mergeWith } from 'lodash-es'
import { nanoid } from 'nanoid'

/** 统一生成动态属性参数 */
export function getEffectData<T extends { record: Obj; [k: string]: any }>(param: T) {
  const formData = inject<any>('exaProvider')?.data
  return readonly({ formData, ...toRefs(shallowReactive(param)) } as { formData: Obj } & T)
}

export function getComputedStatus(
  org: undefined | boolean | Ref<boolean> | Fn<boolean>,
  dataRef: { record: Obj } & Obj
) {
  const res = ref(!!unref(org))
  if (typeof org === 'function') {
    watchEffect(() => {
      res.value = org(dataRef)
    })
  }
  return res
}

export function useShow(hide, data) {
  const show = getComputedStatus(hide, data)
  show.value = !show.value
  return show
}

export function useDisabled(dis, data) {
  return getComputedStatus(dis, data)
}

/** 动态属性监听 */
export function getComputedAttr(handler: Fn<Obj>, dataRef: { record: Obj } & Obj) {
  const result: Obj = reactive({})
  if (handler) {
    watchEffect(() => {
      Object.assign(result, handler(dataRef))
    })
  }
  return result
}

export function getListener(option: Obj<Fn> = {}, formData) {
  const listener: Obj<Fn> = {}
  Object.entries(option).forEach(([key, fn]) => {
    const name = 'on' + key.charAt(0).toUpperCase() + key.slice(1)
    listener[name] = (...args) => fn(readonly(formData), ...args)
  })
  // 查找on开头的属性进行事件绑定
  // Object.keys(option).forEach((key) => {
  //   if (key.startsWith('on')) {
  //     listener[key] = (...args) => option[key](formData, ...args)
  //   }
  // })
  return listener
}

/* eslint-disable no-param-reassign */
/** 当前控件数据初始化 */
export function buildModelData(option: Obj, { parent, propChain = [], rules = {}, refName }: ParentModel) {
  const { field, keepField = option.labelField, label, rules: _rules, initialValue } = option
  const nameArr = field ? field.split('.') : []
  let current = refName ? parent[refName] : parent
  let _refName
  let currentRules
  nameArr.forEach((name, idx, arr) => {
    const isWrap = !!(option.columns || option.subItems)
    if (idx < arr.length - 1) {
      current[name] ||= {}
      current = reactive(current[name])
      rules = rules[name] ||= {}
    } else if (isWrap) {
      _refName = name
      current[name] ??= option.columns ? [] : {}
      currentRules = rules = rules[name] ||= {}
    } else {
      _refName = name
      current[name] ??= initialValue
      if (keepField) current[keepField] ??= undefined
      if (_rules) {
        const _r = Array.isArray(_rules) ? _rules : [_rules]
        currentRules = rules[name] = _r.map((item) => buildRule(item, label)).flat()
      }
    }
  })
  return {
    // propRef: toRef(_parent, _refName),
    refName: _refName,
    parent: current,
    rules,
    currentRules,
    propChain: propChain.concat(nameArr),
  }
}
export function buildModel(option, parentModel) {
  const { subItems, columns } = option
  const currentModel = buildModelData(option, parentModel)

  const data: ModelChildren = {
    model: currentModel,
  }
  if (subItems) {
    data.children = buildModelMaps(subItems, currentModel)
  } else if (columns) {
    // 列表控件子表单模型
    const initModel = { parent: reactive({}), rules: {} }
    data.listData = {
      model: initModel,
      children: buildModelMaps(columns, initModel),
    }
  }
  return data
}
/** 生成默认数据结构 */
export function buildModelMaps(children: any[], parentModel: ParentModel) {
  const cols = children.sort(({ sort = 1 }, { sort: b_sort = 1 }) => sort - b_sort)

  const models: ModelsMap = new Map()
  cols.forEach((child) => {
    const item = buildModel(child, parentModel)
    models.set(child, item)
  })
  return models
}

function getPropertyDeep(target: Obj, names: string[]) {
  let result = target
  names.forEach((name) => {
    result = result?.[name]
  })
  return result
}

export function cloneModels(orgModels: ModelsMap, data, parentName: any[] = []) {
  const models = [...orgModels].map(([option, { model, children }]) => {
    const parent = getPropertyDeep(data, model.propChain.slice(0, -1))
    const propChain = parentName.concat(model.propChain)
    const item = {
      model: { ...model, parent, propChain },
      ...(children && { children: cloneModels(children, data, parentName) }),
    }
    return [option, item] as [ExBaseOption, ModelChildren]
  })
  return new Map(models)
}

/** 针对表格行生成平铺数据模型 */
export function cloneModelsFlat<T>(orgModels: ModelsMap<T>, data?: Obj) {
  const models: [T, ModelData][] = []
  for (const [option, { model, children }] of orgModels) {
    if (data && model.refName) {
      data[model.refName] ??= cloneDeep(model.parent[model.refName])
    }
    if (children) {
      models.push(...cloneModelsFlat(children, data))
    } else if (data) {
      models.push([option, { ...model, parent: data }])
    } else {
      models.push([option, model])
    }
  }
  return new Map(models)
}

export function resetFields(origin, initial = {}) {
  for (const [key, value] of Object.entries(origin)) {
    if (Array.isArray(value)) {
      value.splice(0)
      if (initial[key]?.length) value.push(...cloneDeep(initial[key]))
    } else if (Object.prototype.toString.call(value) === '[object Object]') {
      resetFields(value, initial[key])
    } else {
      origin[key] = initial[key]
    }
  }
}

export function setFieldsValue(origin, data) {
  mergeWith(origin, data, (objValue, srcValue) => {
    if (Array.isArray(objValue)) {
      objValue.splice(0, objValue.length, ...cloneDeep(srcValue))
      // objValue.push(...srcValue)
      return objValue
    }
  })
}

export function setFieldsValue2(modelsMap: ModelsMap<MixOption>, data) {
  for (const [option, { model, children, listData }] of modelsMap) {
    if (children) {
      setFieldsValue(children, data)
    } else {
      const { parent, refName, propChain } = model
      const newParent = getPropertyDeep(data, propChain.slice(0, -1))
      if (!newParent || !refName || !Object.hasOwn(newParent, refName)) continue
      const curValue = newParent[refName]
      if (listData) {
        parent[refName].splice(0)
        const rowKey = (option.attrs as Obj)?.rowKey || 'id'
        curValue?.forEach((item) => {
          const def = cloneDeep(listData.model.parent)
          setFieldsValue(cloneModels(listData.children, def), item)
          def[rowKey] = item[rowKey] || nanoid(12)
          parent[refName].push(def)
        })
      } else {
        const keepField = option.keepField || option.labelField
        keepField && (parent[keepField] = newParent[keepField])
        parent[refName] = curValue
      }
    }
  }
}
