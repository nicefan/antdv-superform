<template>
  <div style="background: #eee; padding: 16px">
    <super-buttons :actions="btnActions" />
    <super-buttons>
      <a-button @click="console.log('kk')" roleName="add" tooltip="提示" confirm-text="新增提示">新增</a-button>

      <a-button @click="console.log('kk')" roleName="add2">新增2</a-button>
      <div @click="console.log('kk')" roleName="add3">新增3</div>
    </super-buttons>
    <div style="margin-top: 16px">
      <super-table @register="registTable" :rowSelection="false" />
    </div>
    <!-- <component :is="FormModalSlot" /> -->
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, inject, toRefs, h, reactive } from 'vue'
import exampleForm from './useExForm'
import { useTable, SuperTable, useForm, type ButtonItem } from '../src'
import { SuperButtons } from '../src/superButtons'
import { useModal, useModalForm } from '../src'
import { getTableOption } from './fristTable/formOption'
import { nanoid } from 'nanoid'
import { SyncOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  components: {
    // VIcon,
    SuperTable,
    SuperButtons,
  },
  props: {
    // msg: {
    //   type: String,
    // },
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

    const [tableRegister, myTable] = useTable(getTableOption())
    const myTableModal = useModal(tableRegister(), {
      title: '弹窗表格',
      icon: () => h(SyncOutlined),
      width: 1400,
      height: 300,
      // buttons: [
      //   {
      //     label: '赋值',
      //     onClick: () => {
      //       myTable.setData([...data])
      //     },
      //   },
      //   {
      //     label: '确定',
      //     onClick: ({ modalRef }) => {
      //       modalRef?.onOk()
      //     },
      //   },
      // ],
    })
    const openTable = async () => {
      await myTableModal.openModal()
      const table = await myTable.getTable()
      table.setData([...data])
      console.log(table)
    }
    const abc = reactive({fieldName:'aaa'})
    /** 页面组件注册表格 */
    const [registTable, { setData: setTableData2 }] = useTable({
      dataSource: ref([...data]),
      isContainer: true,
      ...getTableOption(),
      // searchschema: undefined,
      // maxHeight: 500,
      // inheritHeight: true,
      // resizeHeightOffset: 16,
      isFixedHeight: true,
      pagination: {
        // pageSize: 30,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50'],
      },
      columnProps: {
        width: 100,
        minWidth: 100,
        resizable: true,
      },
      editMode: 'inline',
      addMode: 'inline',
      attrs: {
        bordered: true,
        height: 600,
        onResizeColumn(w, col) {
          col.width = w
        },
      },
      params: abc,
      // apis: {
      //   query: (arg) =>
      //     Promise.resolve().then(() => {
      //       console.log(arg)
      //       return new Array(50).fill({...data[0], id: nanoid()})
      //     }),
      //   delete: (data) =>
      //     Promise.resolve().then(() => {
      //       console.log(data)
      //     }),
      // },
    })

    const getData = () => ({
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
    /** 弹窗表单 */
    const formModal = useModalForm(exampleForm().options, {title: '弹窗表单', width: 1400})
    // const dataSource = ref({})
    // const [exampleFormReg, form] = useForm(exampleForm().options)
    // const formModal = useModal(exampleFormReg(), {
    //   title: '新增测试数据',
    //   width: 1600,
    //   destroyOnClose: true,
    //   onOk() {
    //     return form.submit().then((data) => {
    //       console.log(data)
    //     })
    //   },
    // })
    const openForm = () => {
      // setModalFormValue()
      // dataSource.value = getData()
      formModal.openModal({
        data: getData()
      }).then((form) => {
        console.log(form)
      })
    }
    // const setModalFormValue = () => {
    //   form.setData(getData())
    // }
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
        color: 'warning',
        tooltip: '提示',
        label: '表格赋值',
        onClick: () => {
          const list = [...new Array(50)].map((_, index) =>({ ...data[0], col2: index, id: nanoid() }))
          setTableData2(list)
        },
      },
      {
        color: 'success',
        label: '更新查询',
        onClick: () => {
          abc.fieldName = '2'
        },
      },
    ]
    return {
      // FormModalSlot: formModal.modalSlot,
      btnActions,
      registTable,
    }
  },
})
</script>
