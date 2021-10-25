/**
 * @deprecated: 行内编辑表格
 */

import { ref, shallowReactive, toRaw, watch, reactive, h } from 'vue'
import { buildModel } from '../util'
import { nanoid } from 'nanoid'
import cloneDeep from 'lodash/cloneDeep'
import { useForm } from 'ant-design-vue/es/form'
import * as Controls from '../controls'
import message from 'ant-design-vue/es/message'
import style from '../style.module.scss'

/** 生成编辑表单 */
function buildInlineForm(columns) {
  const modelMap: Obj = {}
  // 编辑表单数据绑定到editData上，编辑完成后再覆盖到原数据
  const defaultData: Obj = {}
  const rules: Obj = {}
  columns.forEach((col: Obj) => {
    modelMap[col.prop] = buildModel(col, { parent: defaultData, rules })
  })

  return (def = defaultData) => {
    const editData = reactive(cloneDeep(def))
    const form = useForm(editData, ref(rules))
    const nodes: Obj = {}
    columns.forEach((col: Obj) => {
      const { refName, propChain } = modelMap[col.prop]
      let parent = editData
      propChain.slice(0, -1).forEach((name) => {
        parent = reactive((parent[name] = parent[name] || {}))
      })
      const modelData = { refName, parent }

      nodes[col.prop] = () =>
        h(Controls[col.type], { option: col, modelData, ...form.validateInfos[refName], class: style['table-form-item'] })
    })

    return {
      nodes,
      ...form,
    }
  }
}

export default function render(cols, orgList, rowKey) {
  const createForm = buildInlineForm(cols)

  // 数据监听
  const newItems = ref<Obj[]>([])
  // const listItems = ref<any[]>([])
  const list = ref<Obj[]>([])
  const editMap: Obj = {}
  watch(
    () => orgList.length,
    () => {
      // listItems.value = orgList.map((item) => {
      //   let hashItem = weakMap.get(item)
      //   if (!hashItem) {
      //     // TODO: 可以在此处将新加的行进行字段过滤
      //     const hash = item.hash || random()
      //     hashItem = { ...item, hash }
      //     const editInfo = editMap[hash] ? Object.assign(editMap[hash], { isNew: false, isEdit: false, org: item }) : shallowReactive<Obj>({ org: item })
      //     // formWeakMap.set(hashItem, editInfo)
      //     editMap[hashItem.hash] = editInfo
      //     watch(() => editInfo.isEdit, (boo) => {
      //       boo && (editInfo.form = createForm(item))
      //     }, { flush: 'sync' })
      //     weakMap.set(item, hashItem)
      //   }
      //   return hashItem
      // })
      // list.value = listItems.value.concat(newItems.value)
      list.value = orgList.concat(newItems.value)
    }
  )

  watch(
    () => newItems.value,
    (items) => {
      list.value = orgList.concat(items)
    }
  )

  const methods = {
    add() {
      const hash = nanoid(12)
      editMap[hash] = shallowReactive<Obj>({ isEdit: true, isNew: true, form: createForm() })
      newItems.value = newItems.value.concat({ [rowKey]: hash })
    },
    edit({ record, selectedRows }) {
      const data = record || selectedRows[0]
      const editInfo = editMap[data[rowKey]]
      if (editInfo) {
        editInfo.isEdit = true
      } else {
        editMap[data[rowKey]] = shallowReactive<Obj>({ isEdit: true, form: createForm() })
      }
    },
    del({ record, selectedRows }) {
      const items = record ? [record] : selectedRows
      items.forEach((item) => {
        orgList.splice(orgList.indexOf(item), 1)
        delete editMap[item[rowKey]]
      })
    },
  }
  const save = ({ record }) => {
    const editInfo = editMap[record[rowKey]]
    editInfo.form
      .validate()
      .then(() => {
        const raw = toRaw(editInfo.form.modelRef)
        if (editInfo.isNew) {
          newItems.value.splice(newItems.value.indexOf(record), 1)
          editInfo.isNew = false
          editInfo.isEdit = false
          orgList.push({ ...record, ...raw })
        } else {
          Object.assign(toRaw(record), raw)
          editInfo.isEdit = false
        }
      })
      .catch((err) => {
        console.log('error', err)
        message.error(err.errorFields[0].errors[0])
      })
  }
  const cancel = ({ record }) => {
    const key = record[rowKey]
    const editInfo = editMap[key]
    if (editInfo.isNew) {
      newItems.value = newItems.value.filter(item => item[rowKey] !== key)
      delete editMap[key]
    } else {
      editInfo.isEdit = false
      editInfo.form.resetFields(record)
    }
  }
  const editButtons = (args) => (
    <a-space>
      <a-button type="link" onClick={() => save(args)}>
        保存
      </a-button>
      <a-button type="link" onClick={() => cancel(args)}>
        取消
      </a-button>
    </a-space>
  )

  const actionSlot = (param) => {
    const editInfo = editMap[param.record[rowKey]]
    if (editInfo?.isEdit) {
      return editButtons(param)
    }
  }

  const columns: Obj[] = cols.map((item) => {
    return {
      title: item.label,
      dataIndex: item.prop,
      customRender({ record, text }) {
        const editInfo = editMap[record[rowKey]]
        return editInfo?.isEdit ? h(editInfo.form.nodes[item.prop]) : text
      },
      ...item.attr,
    }
  })

  return {
    list,
    columns,
    methods,
    actionSlot,
  }
}
