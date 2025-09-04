<template>
  <div>
    <!-- <MyTable class="hi"> 
      <template #tableFooter>
        <h3>表格footer插槽</h3>
      </template>
    </MyTable> -->
    <SuperTable @register="register">
      <template #tableFooter>
        <h3>表格footer插槽</h3>
      </template>
    </SuperTable>
    <Space style="margin-top: 12px">
      <!-- <a-button @click="changeSelect">切换选项</a-button> -->
      <Button @click="setValue">赋值</Button>
      <Button @click="nextPage">下一页</Button>
      <Button @click="setSelected">选中</Button>
      <Button @click="tablevalidate()" title="editable模式下有效">校验</Button>
    </Space>
  </div>
</template>
<script setup lang="ts">
import { watch, reactive, ref, toRef, h } from 'vue'
import { Button, Space } from 'ant-design-vue'
import { getTableOption } from './formOption'
import { useForm, useTable, SuperTable, defineTable } from '../../src'

const props = defineProps<{
  msg: string
  other?: string
}>()
const activeKey = ref<string>()
watch(activeKey, (k) => console.log(k))
// const myModel = useExampleModal()
const params = reactive({
  name: undefined,
  other: 'abc'
})
const selectedRowKeys = ref<string[]>([])
const dataso = ref<any[]>([])
const currentPage = ref(1)
const [register, tableAction] = useTable({
  ...getTableOption(),
  dataSource: dataso,
  // editable: true,
  // apis: {
  //   query: () =>
  //     new Promise((resolve) => {
  //       setTimeout(() => resolve(getData()), 1000)
  //     }),
  // },
  attrs: {
    rowKey: 'id',
    rowSelection: {
      selectedRowKeys,
      onChange: (keys, rows) => {
        // selectedRowKeys.value = keys
        console.log('选中行：', rows)
      },
    },
    pagination:{
      pageSize: 2,
      current: currentPage
    }
  },
  params,
})

const tablevalidate = () => {
  tableAction.validate().then((...args) => {
    console.log('表格数据校验', args)
  })
}
// const MyTable = register()
const setSelected = () => {
  selectedRowKeys.value = ['122']
}
watch(selectedRowKeys, (v) => {
  console.log('v-：' + v)
})
const nextPage = () => {
  currentPage.value += 1
  // console.log(table.selectedRows)
  // console.log(table.getData())
}
const getData = () => {
  const data = [
    {
      id: '121',
      fieldName: 'la',
      title: '大因',
      dataType: 'text',
      area: '0,1',
      isRequire: 1,
      tip: '正则表达式是用于匹配字符串中字符组合的模式',
      files: [
        {
          uid: 'a',
          name: 'a.a',
        },
      ],
    },
    {
      id: '122',
      fieldName: 'la2',
      title: '大因2',
      dataType: 'number',
      isRequire: 1,
      files: [
        {
          uid: 'a2',
          name: 'a2.a2',
        },
      ],
    },
    {
      id: '123',
      fieldName: 'la3',
      title: '大因3',
      dataType: 'text',
      isRequire: 1,
      files: [
        {
          uid: 'a2',
          name: 'a2.a2',
        },
      ],
    },
  ]
  return data
}
const setValue = () => {
  // table.setData(data)
  dataso.value = getData()
}
</script>
