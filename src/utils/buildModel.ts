import buildRule from './buildRule'
import { reactive, ref, toRef, toValue, watch, markRaw, isRef } from 'vue'
import { cloneDeep, get as objGet, set as objSet } from 'lodash-es'

/* eslint-disable no-param-reassign */
/** 当前控件数据初始化 */
function buildModelData(option: Obj, parentData: Ref<Obj>, __chain: string[]) {
  const { field, keepField = option.labelField, columns, subItems, initialValue, value } = option
  const nameArr = field ? field.split('.') : []
  const propChain = __chain.concat(nameArr)
  const refName = nameArr.splice(-1)[0]

  const model = reactive({
    refName,
    initialValue,
    fieldName: field,
    parent: ref(),
    refData: ref(),
    propChain,
  })

  watch(
    parentData,
    (data) => {
      model.parent = data
      if (refName) {
        nameArr.forEach((name) => {
          model.parent[name] ??= {}
          model.parent = toRef(model.parent, name)
        })
        if (columns || subItems) {
          model.parent[refName] ??= toValue(initialValue) ?? (columns ? [] : {})
        } else {
          model.parent[refName] ??= toValue(value) ?? toValue(initialValue)
        }
        model.refData = toRef(model.parent, refName)
        if (keepField) objGet(data, keepField) ?? objSet(data, keepField, undefined)
      } else if (isRef(value)) {
        model.refData = value
        model.propChain=[]
      } else {
        model.refData = data
      }
    },
    { immediate: true, flush: 'sync' }
  )

  return model
}

export function buildModelsMap(items: any[], data?: Obj | Ref<Obj>, propChain: string[] = []) {
  const currentData: Ref = toRef(data || {})
  const rules = {}
  // const cols = items.sort(({ sort = 1 }, { sort: b_sort = 1 }) => sort - b_sort)
  const modelsMap: ModelsMap = new Map()
  items.forEach((child) => {
    if (typeof child !== 'object') return
    const subModel: ModelData = buildModelData(child, currentData, propChain)
    const { rules: _rules, label, subItems, columns } = child
    if (_rules && subModel.propChain.length) {
      const _r = Array.isArray(_rules) ? _rules : [_rules]
      let ruleType = 'string'
      if (subModel.refData) {
        const baseType = typeof subModel.refData
        ruleType = baseType === 'object' && Array.isArray(subModel.refData) ? 'array' : baseType
      }
      subModel.rules = _r.map((item) => buildRule({ type: ruleType, ...item }, label)).flat()
      rules[subModel.propChain.join('.')] = subModel.rules
    }
    if (subItems) {
      const children = buildModelsMap(subItems, toRef(subModel, 'refData'), subModel.propChain)
      Object.assign(rules, children.rules)
      subModel.children = children.modelsMap
    } else if (columns) {
      subModel.listData = buildModelsMap(columns)
    }
    modelsMap.set(markRaw(child), subModel)
  })
  return {
    rules,
    modelsMap,
    initialData: cloneDeep(currentData.value),
  }
}

export function cloneModels<T extends ModelsMap>(orgModels: T, data, parentChain: any[] = [], index?: number) {
  const currentData = toRef(data || {})
  const newRules = {}
  const models = [...orgModels].map(([option, model]) => {
    const { children, rules, listData } = model
    const chain = index !== undefined ? [...parentChain, index] : parentChain
    const newModel: ModelData = buildModelData(option, currentData, chain)
    if (index !== undefined) {
      newModel.index = index
    }
    newModel.rules = rules as any
    if (newModel.propChain.length && rules) {
      newRules[newModel.propChain.join('.')] = rules
    }
    if (children) {
      const { modelsMap, rules: childrenRules } = cloneModels(children, toRef(newModel, 'refData'), newModel.propChain)
      Object.assign(newRules, childrenRules)
      newModel.children = modelsMap
    }
    if (listData) {
      newModel.listData = listData
    }
    return [option, newModel] as const
  })
  return { modelsMap: new Map(models), rules: newRules }
}

/** 针对表格行生成平铺数据模型 */
export function cloneModelsFlat<T extends GetBaseOption>(
  orgMaps: ModelsMap<T>,
  data?: Obj,
  chain?: any[],
  index?: number
) {
  const { modelsMap, rules } = cloneModels(orgMaps, data, chain, index)
  const newMaps: [T, ModelData][] = []
  ;(function deepCopy(_maps) {
    for (const [option, model] of _maps) {
      newMaps.push([option, model])
      if (model.children) {
        deepCopy(model.children)
      }
    }
  })(modelsMap as any)
  return { modelsMap: new Map(newMaps), rules }
}
