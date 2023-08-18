<template>
  <div style="background: #eee; padding: 16px">
    <exa-buttons :actions="btnActions" />
    <div style="margin-top: 16px">
      <exa-table @register="registTable" :rowSelection="false" />
    </div>
    <component :is="FormModalSlot" />
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, inject, toRefs } from 'vue'
import VIcon from '../src/icon/VIcon'
import exampleForm from './useExForm'
import { useTable, ExaTable, useForm } from '../src'
import { ExaButtons } from '../src/exaButtons'
import { useModal } from '../src'
import { myTableOption } from './createForm/formOption'

export default defineComponent({
  components: {
    // VIcon,
    ExaTable,
    ExaButtons,
  },
  props: {
    msg: {
      type: String,
    },
  },
  emits: ['my-test'],
  setup(props, { attrs }) {
    const data = [
      {
        fieldName: 'la',
        title: '大因',
        dataType: 'text',
        isRequire: 1,
        col2: '12',
        id: 'lCBZmUm6_XET',
      },
    ]

    const [tableRegister, myTable] = useTable(myTableOption)
    const myTableModal = useModal(tableRegister(), {
      title: '弹窗表格',
      width: 1400,
      height: 300,
      buttons: [
        {
          label: '赋值',
          onClick: () => {
            myTable.setData([...data])
          },
        },
        {
          label: '确定',
          onClick: ({ modalRef }) => {
            modalRef?.onOk()
          },
        },
      ],
    })
    const openTable = async () => {
      await myTableModal.openModal()
      const table = await myTable.getTable()
      table.setData([...data])
      console.log(table)
    }

    /** 页面组件注册表格 */
    const [registTable, { setData: setTableData2 }] = useTable({
      isContainer: true,
      ...myTableOption,
      attrs: { bordered: true },
      apis: {
        query: (arg) =>
          Promise.resolve().then(() => {
            console.log(arg)
            return []
          }),
        save: (data) =>
          Promise.resolve().then(() => {
            console.log(data)
          }),
      },
    })

    /** 弹窗表单 */
    const [exampleFormReg, form] = useForm(exampleForm().options)
    const formModal = useModal(exampleFormReg(), {
      title: '新增测试数据',
      width: 1600,
      onOk() {
        return form.submit().then((data) => {
          console.log(data)
        })
      },
    })
    const openForm = () => {
      setModalFormValue()
      formModal.openModal().then((form) => {
        console.log(form)
      })
    }
    const setModalFormValue = () => {
      form.setData({
        name: '白龙',
        street: '白龙',
        array: ['a', 'b'],
        isReg: 1,
        'table': [{ id: 'dadf', col2: 'col2' }],
        'group': {
          'food': ['1'],
        },
        list: [{ tab1: 'tab1' }],
      })
    }
    const btnActions: ButtonItem[] = [
      {
        label: '弹窗表单',
        onClick: openForm,
      },
      {
        label: '显示表格',
        onClick: openTable,
      },
      {
        label: '表格赋值',
        onClick: () => setTableData2(data),
      },
    ]
    return {
      FormModalSlot: formModal.modalSlot,
      btnActions,
      registTable,
    }
  },
})
</script>
