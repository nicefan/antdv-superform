<template>
  <div style="background: #eee; padding: 16px">
    <VIcon type="user"></VIcon>
    <VIcon type="mail2"></VIcon>
    <a-button @click="openForm">弹窗表单</a-button>
    <a-button @click="openTable">显示表格</a-button>
    <a-button @click="setTable">表格赋值</a-button>
    <div style="margin-top: 16px">
      <exa-table @register="registTable" :rowSelection="false" />
    </div>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, inject, toRefs } from 'vue'
import { Button } from 'ant-design-vue'
import VIcon from '../src/icon/VIcon'
import exampleForm from './useExForm'
import { useTable, ExaTable } from '../src/ExaTable'
import { useModal } from '../src/Modal'
import { myTableOption } from './createForm/formOption'
import { useFormModal } from '../src/ExaForm'

export default defineComponent({
  components: {
    VIcon,
    AButton: Button,
    ExaTable,
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
      attrs:{ bordered: true},
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
    } as any)

    /** 弹窗表单 */
    const formModal = useFormModal(exampleForm().options, {
      title: '新增测试数据',
      width: 1600,
      onOk() {
        return formModal.getForm('onSubmit').then((data) => {
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
      formModal.setData({
        name: '白龙',
        street: '白龙',
        isReg: 1,
        'table': [{ id: 'dadf', col2: 'col2' }],
        'group': {
          'food': ['1'],
        },
        list: [{ tab1: 'tab1' }],
      })
    }
    return {
      registTable,
      openForm,
      openTable,
      setTable() {
        setTableData2(data)
      },
    }
  },
})
</script>
