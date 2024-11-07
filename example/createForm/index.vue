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
      <Button @click="onSubmit">提交</Button>
      <Button @click="setValue">赋值</Button>
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
const tableSchema = defineTable({
  ...myTableOption,
  dataSource: dataso,
  apis: {
    query: () =>
      new Promise((resolve) => {
        setTimeout(() => resolve(getData()), 1000)
      }),
  },
  attrs: {
    rowSelection: {
      selectedRowKeys,
    },
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
const onSubmit = () => {
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
      tip: '我租了二楼的三个商业用房共经营面积185平，装修时打通共用一个出入口，导致每个点步行到达过道上消火栓的距离大于25米，我现在应该是在室内加个消火栓，还是应该在面向消火栓的隔墙处加个开口？我这符合安装消火栓的要求吗？消火栓可以装在非公共区域吗？',
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
  ]
  return data
}
const setValue = () => {
  // table.setData(data)
  dataso.value = getData()
}
</script>
