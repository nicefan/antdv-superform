<template>
  <section class="test-page">
    <h2>Form / Upload 生命周期验证 · AntDV</h2>
    <ol>
      <li>清空名称，分别执行整表校验、名称校验和提交，观察 FormValidationError.fields 的 path/messages 与 cause。</li>
      <li>填入名称后校验应返回 void；原生实例按钮只读取实例是否存在。</li>
      <li>在“提交时上传”选择文件，先关闭上传挂载，再提交；上传调用数不应增加，提交不应被已卸载字段阻塞。</li>
      <li>重新挂载并选文件，开启模拟失败后提交，再关闭失败重试；观察等待状态和调用数。</li>
    </ol>
    <div class="controls">
      <label><input v-model="showUpload" type="checkbox" />挂载提交上传</label>
      <label><input v-model="failUpload" type="checkbox" />模拟上传失败</label>
      <button @click="run('validate')">整表校验</button>
      <button @click="run('validateField')">名称校验</button>
      <button @click="run('submit')">提交</button>
      <button @click="run('clearValidate')">清除校验</button>
      <button @click="run('getNativeInstance')">读取原生实例</button>
      <button @click="modal.openModal()">打开弹窗</button>
      <button @click="reset">重置本页</button>
    </div>
    <SuperForm :key="revision" :schema="formSchema" @register="register" />
    <pre role="status">{{ result }}</pre>
    <pre>上传调用：{{ uploadCalls }}；挂载：{{ showUpload }}；模型：{{ model }}</pre>
  </section>
</template>

<script setup lang="ts">
import { h, reactive, ref } from 'vue'
import { FormValidationError, SuperForm, useModal, type ExtFormOption } from 'superform-antdv'

type FormHandle = {
  submit: () => Promise<unknown>
  validate: () => Promise<void>
  validateField: (path: string[]) => Promise<void>
  clearValidate: () => void
  getNativeInstance: () => unknown
}
let form: FormHandle | undefined
const result = ref('尚未操作')
const revision = ref(0)
const showUpload = ref(true)
const failUpload = ref(false)
const uploadCalls = ref(0)
const initial = () => ({
  name: '',
  auto: [],
  submit: [],
  custom: [],
  base64: [],
  text: [],
})
const model = reactive(initial())
const modal = useModal(() => h('p', '关闭或取消后，表单仍应可以继续操作。'), {
  title: 'Modal 验证',
})
function register(_actions: unknown, instance?: FormHandle) {
  form = instance
}
async function run(action: keyof FormHandle) {
  if (!form) {
    result.value = '表单尚未就绪'
    return
  }
  try {
    const value = action === 'validateField' ? await form.validateField(['name']) : await form[action]()
    result.value =
      action === 'getNativeInstance'
        ? `原生实例存在：${!!value}`
        : `${action} 成功：${value === undefined ? 'void' : JSON.stringify(value)}`
  } catch (error) {
    result.value =
      error instanceof FormValidationError
        ? JSON.stringify(
            {
              name: error.name,
              fields: error.fields,
              hasCause: error.cause != null,
            },
            null,
            2
          )
        : `普通异常：${String(error)}`
  }
}
function reset() {
  Object.assign(model, initial())
  showUpload.value = true
  failUpload.value = false
  uploadCalls.value = 0
  revision.value++
  result.value = '数据已重置'
}
// 上传仅使用本地模拟，文件内容不发送到服务器。
const uploadApi = async (data: FormData) => {
  uploadCalls.value++
  await new Promise((resolve) => setTimeout(resolve, 700))
  if (failUpload.value) throw new Error('模拟上传失败')
  return {
    uid: String(uploadCalls.value),
    name: (data.get('file') as File).name,
    url: 'data:text/plain,probe',
  }
}
const formSchema: ExtFormOption = {
  dataSource: model,
  subItems: [
    { type: 'Input', field: 'name', label: '名称', required: true },
    {
      type: 'Upload',
      field: 'submit',
      label: '提交时上传',
      hidden: () => !showUpload.value,
      attrs: { uploadMode: 'submit', apis: { upload: uploadApi } },
    },
    {
      type: 'Upload',
      field: 'auto',
      label: '自动上传',
      attrs: { uploadMode: 'auto', apis: { upload: uploadApi } },
    },
    {
      type: 'Upload',
      field: 'custom',
      label: '自定义文件',
      attrs: { uploadMode: 'custom' },
    },
    {
      type: 'Upload',
      field: 'base64',
      label: 'Base64',
      attrs: { uploadMode: 'base64', isSingle: true },
    },
    {
      type: 'Upload',
      field: 'text',
      label: '文本内容',
      attrs: { uploadMode: 'text', isSingle: true },
    },
  ],
}
</script>

<style scoped>
.test-page {
  display: grid;
  gap: 16px;
  padding: 24px;
  background: white;
}
.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
pre {
  margin: 0;
  padding: 12px;
  background: #f4f6fa;
  overflow: auto;
  max-height: 360px;
}
</style>
