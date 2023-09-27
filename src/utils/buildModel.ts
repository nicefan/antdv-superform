import buildRule from './buildRule'
import { Ref, reactive, ref, toRef, toValue, watch } from 'vue'
import { cloneDeep } from 'lodash-es'

/* eslint-disable no-param-reassign */
/** 当前控件数据初始化 */
function buildModelData(option: Obj, parentData: Ref<Obj>, __chain: string[]) {
  const { field, initialValue, columns, subItems } = option
  const nameArr = field ? field.split('.') : []
  const propChain = __chain.concat(nameArr)
  const refName = nameArr.splice(-1)[0]
  let currentRules: Obj[] | undefined

  const model = reactive({
    refName,
    initialValue,
    fieldName: field,
    parent: ref(),
    refData: ref(),
    rules: currentRules,
    propChain,
  })
  watch(
    parentData,
    (data) => {
      model.parent = data
      if (refName) {
        nameArr.forEach((name) => {
          model.parent = model.parent[name] ??= {}
        })
        if (columns || subItems) {
          model.parent[refName] ??= toValue(initialValue) ?? (columns ? [] : {})
        } else {
          model.parent[refName] ??= toValue(initialValue)
        }
        model.refData = toRef(model.parent, refName)
      } else {
        model.refData = ref(data)
      }
    },
    { immediate: true, flush: 'sync' }
  )

  return model
}

export function buildModelsMap(items: any[], data?: Obj | Ref<Obj>, propChain: string[] = []) {
  const currentData: Ref = toRef(data || {})
  const rules = {}
  const cols = items.sort(({ sort = 1 }, { sort: b_sort = 1 }) => sort - b_sort)
  const modelsMap: ModelsMap = new Map()
  cols.forEach((child) => {
    const subModel: ModelData = buildModelData(child, currentData, propChain)
    const { rules: _rules, label, subItems, columns } = child
    if (_rules) {
      const _r = Array.isArray(_rules) ? _rules : [_rules]
      subModel.rules = _r.map((item) => buildRule(item, label)).flat()
      rules[subModel.propChain.join('.')] = subModel.rules
    }
    if (subItems) {
      const children = buildModelsMap(subItems, toRef(subModel, 'refData'), subModel.propChain)
      Object.assign(rules, children.rules)
      subModel.children = children.modelsMap
    } else if (columns) {
      subModel.listData = buildModelsMap(columns)
    }
    modelsMap.set(child, subModel)
  })
  return {
    rules,
    modelsMap,
    initialData: cloneDeep(currentData.value),
  }
}

export function cloneModels<T extends ModelsMap>(orgModels: T, data, parentChain: any[] = []) {
  const currentData = toRef(data || {})
  const newRules = {}
  const models = [...orgModels].map(([option, model]) => {
    const { children, propChain, rules } = model
    const newModel: ModelData = buildModelData(option, currentData, parentChain)
    newModel.rules = rules
    newRules[propChain.join('.')] = rules
    if (children) {
      const { modelsMap, rules: childrenRules } = cloneModels(children, toRef(newModel, 'refData'), newModel.propChain)
      Object.assign(newRules, childrenRules)
      newModel.children = modelsMap
    }
    return [option, newModel] as const
  })
  return { modelsMap: new Map(models), rules: newRules }
}

/** 针对表格行生成平铺数据模型 */
export function cloneModelsFlat<T extends ExBaseOption>(orgMaps: ModelsMap<T>, data?: Obj, chain?: any[]) {
  const { modelsMap, rules } = cloneModels(orgMaps, data, chain)
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
