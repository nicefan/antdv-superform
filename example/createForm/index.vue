<template>
  <div>
    <!-- <MyTable class="hi"> 
      <template #tableFooter>
        <h3>表格footer插槽</h3>
      </template>
    </MyTable> -->
    <SuperTable :schema="tableSchema">
      <template #tableFooter>
        <h3>表格footer插槽</h3>
      </template>
    </SuperTable>
    <Row :gutter="10">
      <!-- <a-button @click="changeSelect">切换选项</a-button> -->
      <Button @click="setValue">赋值</Button>
      <Button @click="nextPage">下一页</Button>
      <Button @click="setSelected">选中</Button>
    </Row>
  </div>
</template>
<script setup lang="ts">
import { watch, reactive, ref, toRef, h } from 'vue'
import { Row, Button } from 'ant-design-vue'
import { myTableOption } from './formOption'
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
})
const selectedRowKeys = ref(['121'])
const dataso = ref<any[]>([])
const currentPage = ref(1)
const tableSchema = defineTable({
  ...myTableOption,
  dataSource: dataso,
  // apis: {
  //   query: () =>
  //     new Promise((resolve) => {
  //       setTimeout(() => resolve(getData()), 1000)
  //     }),
  // },
  attrs: {
    rowSelection: {
      selectedRowKeys,
    },
    pagination:{
      pageSize: 2,
    }
  },
  tabs: {
    options: ['湖南', '广东'],
    valueToLabel: true,
    activeKey: toRef(params, 'name'),
    bordered: true,
    customTab: ({ item }) => h('span', { style: 'font-size:18px' }, item.tab),
  },
  params,
})

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
      dataType: ['text'],
      isRequire: 1,
      tip: '正则表达式是用于匹配字符串中字符组合的模式',
      col2: '12',
      // fileIds: ['a'],
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
      dataType: ['text'],
      isRequire: 1,
      col2: '122',
      // fileIds: ['a2'],
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
      dataType: ['text'],
      isRequire: 1,
      col2: '123',
      // fileIds: ['a2'],
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
