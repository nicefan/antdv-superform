import buildRule from './buildRule'
import { inject, reactive, readonly, ref, shallowReactive, toRef, toRefs, unref, watchEffect } from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import { nanoid } from 'nanoid'

export function getComputedStatus(org: undefined | boolean | Ref<boolean> | Fn<boolean>, data: Obj = {}) {
  const res = ref(!!unref(org))
  if (typeof org === 'function') {
    const formData = inject('formData')
    const dataRef = readonly({ formData, ...toRefs(shallowReactive(data)) })
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
export function getComputedAttr(handler?: Fn<Obj>, data: Obj = {}) {
  const result: Obj = reactive({})
  if (handler) {
    const formData = inject('formData')
    const dataRef = readonly({ formData, ...toRefs(shallowReactive(data)) })
    watchEffect(() => {
      Object.assign(result, handler(dataRef))
    })
  }
  return result
}

export function getListener(option: Obj<Fn> = {}, formData) {
  // 查找on开头的属性进行事件绑定
  const listener: Obj<Fn> = {}
  Object.entries(option).forEach(([key, fn]) => {
    const name = 'on' + key.charAt(0).toUpperCase() + key.slice(1)
    listener[name] = (...args) => fn(readonly(formData), ...args)
  })
  // Object.keys(option).forEach((key) => {
  //   if (key.startsWith('on')) {
  //     listener[key] = (...args) => option[key](formData, ...args)
  //   }
  // })
  return listener
}

/* eslint-disable no-param-reassign */
/** 当前控件数据初始化 */
export function buildModel(option: Obj, { parent, propChain = [], rules = {}, refName }: ParentModel) {
  const { prop = '', keepProp, label, rules: _rules, initialValue } = option
  const propArr = prop.split('.')
  let current = refName ? parent[refName] : parent
  let _refName
  let currentRules
  propArr.forEach((name, idx, arr) => {
    const isLast = idx === arr.length - 1
    const isWrap = !!(option.columns || option.subItems)
    if (!isLast) {
      current[name] ||= {}
      current = reactive(current[name])
      rules = rules[name] ||= {}
    } else if (isWrap) {
      _refName = name
      current[name] ??= option.columns ? [] : {}
      rules = rules[name] ||= {}
    } else {
      _refName = name
      current[name] ??= initialValue
      if (keepProp) current[keepProp] ??= undefined
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
    propChain: propChain.concat(propArr),
  }
}

/** 生成默认数据结构 */
export function buildModelDeep(children: any[], { parent, propChain = [], rules = {}, refName = '' }: ParentModel) {
  const currentModel = { parent, propChain, rules, refName }
  const cols = children.sort(({ sort = 1 }, { sort: b_sort = 1 }) => sort - b_sort)

  const models: ModelsMap = new Map()
  cols.forEach((child) => {
    const { prop, subItems, columns } = child
    const subModel = prop ? buildModel(child, currentModel) : currentModel
    const item: ModelChildren = {
      model: subModel,
    }
    if (subItems) {
      item.children = buildModelDeep(subItems, subModel)
    } else if (columns) {
      // 列表控件子表单模型
      const initModel = { parent: reactive({}), rules: {} }
      item.listData = {
        model: initModel,
        children: buildModelDeep(columns, initModel),
      }
    }
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

export function cloneModels(orgModels: ModelsMap, data) {
  const models = [...orgModels].map(([option, { model, children }]) => {
    const parent = getPropertyDeep(data, model.propChain.slice(0, -1))
    const item = {
      model: { ...model, parent },
      ...(children && { children: cloneModels(children, data) }),
    }
    return [option, item] as [ExBaseOption, ModelChildren]
  })
  return new Map(models)
}

/** 针对表格行生成平铺数据模型 */
export function flatModels(orgModels: ModelsMap, data?: Obj) {
  const models: [ExBaseOption, ModelData][] = []
  for (const [option, { model, children }] of orgModels) {
    if (children) {
      models.push(...flatModels(children, data))
    } else if (data) {
      const parent = getPropertyDeep(data, model.propChain.slice(0, -1))
      models.push([option, { ...model, parent }])
    } else {
      models.push([option, model])
    }
  }
  return new Map(models)
}

export function setFieldsValue(modelsMap: ModelsMap<MixOption>, data) {
  for (const [option, { model, children, listData }] of modelsMap) {
    if (children) {
      setFieldsValue(children, data)
    } else {
      const parent = getPropertyDeep(data, model.propChain.slice(0, -1))
      if (!parent) continue
      const curValue = parent[model.refName]
      if (listData) {
        model.parent[model.refName].splice(0)
        const rowKey = option.attr?.rowKey || 'id'
        curValue?.forEach((item) => {
          const def = cloneDeep(listData.model.parent)
          setFieldsValue(cloneModels(listData.children, def), item)
          def[rowKey] = item[rowKey] || nanoid(12)
          model.parent[model.refName].push(def)
        })
      } else {
        const keepProp = option.keepProp
        keepProp && (model.parent[keepProp] = parent[keepProp])
        model.parent[model.refName] = curValue
      }
    }
  }
}
