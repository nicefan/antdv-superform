<template>
  <section class="demo-section">
    <h2>文件与提交</h2>
    <div class="demo-guide">
      自动上传在选文件后执行；提交上传等待表单提交；自定义模式只管理文件列表；Base64
      和文本模式直接读取本地内容。所有上传接口均为本地模拟，文件不会发送到服务器。
    </div>
    <div class="demo-actions">
      <button class="demo-control primary" @click="run('表单提交', form.submit)">提交表单</button
      ><button class="demo-control" @click="run('重置文件表单', () => form.resetFields())">重置</button>
    </div>
    <SuperForm :schema="schema" @register="register" />
    <p class="demo-status" role="status">{{ status }}</p>
    <Teleport to="#demo-test-content"
      ><div class="dev-tools">
        <h2 class="demo-test-title">开发与测试 · 上传卸载、等待与失败重试</h2>
        <div class="dev-controls">
          <label class="demo-control-label"
            ><input class="demo-control-input" v-model="showUpload" type="checkbox" />挂载提交上传字段</label
          ><label class="demo-control-label"
            ><input class="demo-control-input" v-model="failUpload" type="checkbox" />模拟上传失败</label
          ><button class="demo-control" @click="run('只校验名称', () => form.validateField(['name']))">局部校验</button
          ><button
            class="demo-control"
            @click="run('原生实例', async () => ({ available: !!(await form.getNativeInstance()) }))"
          >
            读取原生实例
          </button>
        </div>
        <ol>
          <li>先在提交上传中选择文件，关闭字段挂载，再提交；已卸载字段不应继续上传或阻塞提交。</li>
          <li>开启失败后提交，再关闭失败重试，检查文件状态、调用次数和等待提示。</li>
          <li>名称为空时提交，应先产生统一校验错误。上传调用数：{{ uploadCalls }}。</li>
        </ol>
      </div></Teleport
    >
  </section>
  <section class="demo-section">
    <h2>弹窗协作</h2>
    <div class="demo-guide">
      弹窗表单使用独立草稿，保存后更新下方结果，取消不写回。弹窗表格演示选择与批量填充；普通弹窗支持动态标题和确认/取消事件。
    </div>
    <div class="demo-actions">
      <button class="demo-control primary" @click="openForm">编辑任务</button
      ><button class="demo-control" @click="rename.openModal({ title: '新增任务', data: { title: '', note: '' } })">
        新建任务</button
      ><button class="demo-control" @click="openTable">打开弹窗表格</button
      ><button class="demo-control" @click="notice.openModal({ title: '当前任务：' + saved.title })">
        动态标题弹窗</button
      ><button
        class="demo-control"
        @click="
          modalRows = Array.from({ length: 20 }, (_, index) => ({ id: index + 1, name: `候选成员 ${index + 1}` }))
        "
      >
        表格填入 20 条
      </button>
    </div>
    <div class="demo-summary">
      <div>
        <small>最近保存任务</small><strong>{{ saved.title }}</strong>
      </div>
      <div>
        <small>备注</small><span>{{ saved.note || '尚未填写' }}</span>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { h, onBeforeUnmount, reactive, ref } from 'vue'
import { SuperForm, useForm, useTable, useModal, useModalForm, type ExtFormOption } from '@demo/product'
import { useDemo } from '../context'
const model = reactive({ name: '附件演示', auto: [], submit: [], custom: [], base64: [], text: [] })
const saved = reactive({ title: '完善项目资料', note: '取消编辑时这里保持不变' })
const modalRows = ref([
  { id: 1, name: '陈清禾' },
  { id: 2, name: '林小满' },
])
const showUpload = ref(true),
  failUpload = ref(false),
  uploadCalls = ref(0)
const { event, run, status } = useDemo(() => ({
  model,
  saved,
  modalRows: modalRows.value,
  uploadCalls: uploadCalls.value,
  mounted: showUpload.value,
}))
const urls = new Set<string>()
onBeforeUnmount(() => urls.forEach((url) => URL.revokeObjectURL(url)))
async function upload(data: FormData) {
  uploadCalls.value++
  const file = data.get('file') as File
  event('上传开始', { name: file.name, calls: uploadCalls.value })
  await new Promise((resolve) => setTimeout(resolve, 650))
  if (failUpload.value) {
    event('上传失败', file.name)
    throw new Error('模拟上传失败，请关闭失败开关后重试')
  }
  const url = URL.createObjectURL(file)
  urls.add(url)
  event('上传完成', file.name)
  return { uid: `${uploadCalls.value}`, name: file.name, url }
}
const apis = {
  upload,
  delete: async (file) => {
    event('文件删除', file.name)
  },
}
const schema: ExtFormOption = {
  dataSource: model,
  subSpan: 12,
  subItems: [
    { type: 'Input', field: 'name', label: '名称', required: true, span: 24 },
    { type: 'Upload', field: 'auto', label: '自动上传', attrs: { uploadMode: 'auto', apis } },
    {
      type: 'Upload',
      field: 'submit',
      label: '提交时上传',
      hidden: () => !showUpload.value,
      attrs: { uploadMode: 'submit', apis },
    },
    { type: 'Upload', field: 'custom', label: '自定义文件列表', attrs: { uploadMode: 'custom' } },
    { type: 'Upload', field: 'base64', label: 'Base64 内容', attrs: { uploadMode: 'base64', isSingle: true } },
    {
      type: 'Upload',
      field: 'text',
      label: '文本内容',
      attrs: { uploadMode: 'text', isSingle: true, accept: '.txt,.csv,.json' },
    },
  ],
}
const [register, form] = useForm(schema)
const rename = useModalForm(
  {
    subSpan: 24,
    subItems: [
      { type: 'Input', field: 'title', label: '任务名称', required: true },
      {
        type: 'TextArea',
        field: 'note',
        label: '备注',
      },
    ],
  },
  {
    title: '编辑任务',
    width: 600,
    onOk: (data) => {
      Object.assign(saved, data)
      event('弹窗表单保存', data)
    },
    onCancel: () => event('弹窗表单取消'),
  }
)
function openForm() {
  return rename.openModal({ data: { ...saved } })
}
const [registerTable] = useTable({
  title: '候选成员',
  dataSource: modalRows,
  pagination: { pageSize: 5 },
  attrs: { rowKey: 'id', rowSelection: { onChange: (keys, rows) => event('弹窗表格选择', { keys, rows }) } },
  columns: [{ type: 'Text', field: 'name', label: '姓名' }],
})
const tableModal = useModal(registerTable(), {
  title: '选择成员',
  width: 780,
  onOk: () => event('弹窗表格确认'),
  onCancel: () => event('弹窗表格取消'),
})
function openTable() {
  return tableModal.openModal()
}
const notice = useModal(() => h('p', '这个弹窗使用当前任务名称作为标题，确认与取消都可以在事件面板观察。'), {
  onOk: () => event('普通弹窗确认'),
  onCancel: () => event('普通弹窗取消'),
})
</script>
