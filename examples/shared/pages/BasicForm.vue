<template>
  <section class="demo-section">
    <h2>个人资料</h2>
    <div class="demo-guide">
      填写姓名和联系方式，选择兴趣与日期。点击“提交”可查看校验结果；“填入示例”只更新已有字段，“重置”恢复初始数据。点击姓名搜索按钮或按回车会模拟一次异步查询；密码支持显隐切换，备注使用多行输入。
    </div>
    <div class="demo-actions">
      <button class="demo-control primary" @click="run('提交', form.submit)">提交</button
      ><button
        class="demo-control"
        @click="
          run('填入示例', () =>
            form.setFieldsValue({ name: '林小满', email: 'demo@example.com', age: 28, city: '杭州' })
          )
        "
      >
        填入示例</button
      ><button class="demo-control" @click="run('重置', () => form.resetFields())">重置</button
      ><button
        class="demo-control"
        @click="
          run('切换候选项', () => {
            cities = cities.length === 3 ? ['杭州', '苏州'] : ['上海', '深圳', '杭州']
          })
        "
      >
        切换选项</button
      ><button class="demo-control" @click="preview = !preview">{{ preview ? '返回编辑' : '查看详情' }}</button>
    </div>
    <SuperDetail v-if="preview" :schema="detailSchema" :data-source="model" />
    <SuperForm v-show="!preview" :schema="schema" @register="register" />
    <p role="status" class="demo-status">{{ status }}</p>
    <Teleport to="#demo-test-content"
      ><div class="dev-tools">
        <h2 class="demo-test-title">开发与测试 · 表单实例与校验</h2>
        <div class="dev-controls">
          <button class="demo-control" :disabled="preview" @click="run('整表校验', form.validate)">整表校验</button
          ><button
            class="demo-control"
            :disabled="preview"
            @click="run('姓名校验', () => form.validateField(['name']))"
          >
            只校验姓名</button
          ><button class="demo-control" :disabled="preview" @click="run('清除错误', form.clearValidate)">
            清除错误</button
          ><button
            class="demo-control"
            :disabled="preview"
            @click="run('原生实例', async () => ({ available: !!(await form.getNativeInstance()) }))"
          >
            读取原生实例
          </button>
        </div>
        <ol>
          <li>清空姓名提交，应出现统一校验错误；右侧“事件与结果”显示 fields.path/messages。</li>
          <li>切换详情保留当前数据与表单实例，返回编辑后可继续操作。</li>
          <li>清空日期范围应同时清空两个存储字段；显式提示和日期格式应保留。</li>
          <li>搜索按钮与回车每次只记录一条“姓名搜索”，加载期间不重复提交；密码显隐和备注换行不影响其他字段。</li>
        </ol>
      </div></Teleport
    >
  </section>
</template>
<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { SuperForm, SuperDetail, useForm, type ExtFormOption } from '@demo/product'
import { useDemo } from '../context'
const model = reactive({
  name: '陈清禾',
  email: '',
  age: 24,
  city: '杭州',
  cityLabel: '',
  tags: ['设计', '开发'],
  skills: ['表单'],
  enabled: true,
  start: '2026-09-01',
  end: '2026-09-30',
})
const preview = ref(false)
const cities = ref(['上海', '深圳', '杭州'])
const searching = ref(false)
const { isElement, event, run, status } = useDemo(() => ({ model, cities: cities.value, searching: searching.value }))
async function search() {
  searching.value = true
  try {
    await new Promise((resolve) => setTimeout(resolve, 450))
    event('姓名搜索', { keyword: model.name })
  } finally {
    searching.value = false
  }
}
const schema: ExtFormOption = {
  dataSource: model,
  subSpan: 12,
  attrs: {
    ...(isElement ? { labelWidth: '120px' } : {}),
    ...(!isElement ? { labelCol: { style: { width: '120px' } } } : {}),
  },
  subItems: [
    {
      type: 'InputSearch',
      field: 'name',
      label: '姓名',
      required: true,
      rules: { min: 2, message: '姓名至少两个字符' },
      attrs: reactive({ enterButton: true, loading: searching }),
      onSearch: search,
    },
    {
      type: 'Input',
      field: 'email',
      label: '邮箱',
      rules: { type: 'email', message: '请输入有效邮箱' },
      slots: { prefix: () => '@' },
    },
    { type: 'InputPassword', field: 'password', label: '密码', exclude: ['description'] },
    { type: 'InputNumber', field: 'age', label: '年龄', attrs: { min: 0, max: 120 } },
    { type: 'Select', field: 'city', labelField: 'cityLabel', label: '城市', options: { source: cities } },
    {
      type: 'RadioGroup',
      field: 'contact',
      label: '联系偏好',
      options: { source: ['邮件', '电话'] },
      initialValue: '邮件',
    },
    { type: 'CheckboxGroup', field: 'topics', label: '关注内容', options: { source: ['开发', '设计', '测试'] } },
    {
      type: 'Switch',
      field: 'enabled',
      labelField: 'enabledLabel',
      label: '启用通知',
      options: {
        source: [
          { value: false, label: '关闭' },
          { value: true, label: '开启' },
        ],
      },
    },
    { type: 'Rate', field: 'rating', label: '满意度', initialValue: 4, attrs: { allowHalf: true } },
    { type: 'DatePicker', field: 'birthday', label: '生日', attrs: { valueFormat: 'YYYY-MM-DD' } },
    {
      type: 'DateRangePicker',
      field: 'start',
      endField: 'end',
      label: '有效日期',
      attrs: { valueFormat: 'YYYY-MM-DD' },
    },
    { type: 'TimePicker', field: 'time', label: '提醒时间', attrs: { valueFormat: 'HH:mm:ss' } },
    {
      type: 'TimeRangePicker',
      field: 'timeStart',
      endField: 'timeEnd',
      label: '工作时段',
      attrs: { valueFormat: 'HH:mm:ss' },
    },
    { type: 'TagInput', field: 'tags', label: '个人标签' },
    {
      type: 'TagSelect',
      field: 'skills',
      label: '关注能力',
      options: { source: ['表单', '表格', '布局'] },
      attrs: { multiple: true },
    },
    {
      type: 'TextArea',
      field: 'note',
      label: '备注',
      span: 24,
      attrs: { rows: 3 },
    },
  ],
}
// 详情仅复用字段与布局，避免将表单校验和原生 Form 属性传给详情。
const detailSchema = computed(() => ({ subItems: schema.subItems, subSpan: schema.subSpan }))
const [register, form] = useForm(schema)
</script>
