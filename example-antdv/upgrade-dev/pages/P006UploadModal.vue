<template>
  <section class="test-page">
    <header>
      <div>
        <p>P006 · Upload、Modal 与服务能力</p>
        <h2>复杂 UI 协议由 Adapter 承接</h2>
      </div>
      <strong>{{ capabilitiesReady ? 'Capability 检查通过' : 'Capability 配置缺失' }}</strong>
    </header>

    <article>
      <p>覆盖 auto、submit、custom、base64、text 五种上传模式，以及受控命令式 Modal。</p>
      <button type="button" @click="modal.openModal()">打开测试弹窗</button>
      <SuperForm :schema="formSchema" />
    </article>
  </section>
</template>

<script setup lang="ts">
import { computed, h, reactive } from 'vue'
import { SuperForm, useModal, type ExtFormOption } from 'superform-antdv'
import { antdvAdapter } from 'superform-antdv'

const capabilitiesReady = computed(
  () =>
    !!antdvAdapter.services &&
    !!antdvAdapter.modal &&
    !!antdvAdapter.upload &&
    !!antdvAdapter.preview &&
    ['upload', 'attachment', 'loading', 'sync', 'error'].every((name) => !!antdvAdapter.icons?.semantic?.[name])
)

const modal = useModal(() => h('p', '弹窗由 Core 状态控制，由 AntDV Adapter 渲染。'), {
  title: 'P006 Modal 验证',
})

const model = reactive({ auto: [], submit: [], custom: [], base64: [], text: [] })
const uploadApi = async (data: FormData) => {
  const file = data.get('file') as File
  return { uid: `${Date.now()}-${file.name}`, name: file.name, url: URL.createObjectURL(file) }
}

const formSchema: ExtFormOption = {
  dataSource: model,
  buttons: { actions: ['submit', 'reset'] },
  subItems: [
    { type: 'Upload', field: 'auto', label: '自动上传', attrs: { uploadMode: 'auto', apis: { upload: uploadApi } } },
    { type: 'Upload', field: 'submit', label: '提交时上传', attrs: { uploadMode: 'submit', apis: { upload: uploadApi } } },
    { type: 'Upload', field: 'custom', label: '自定义文件', attrs: { uploadMode: 'custom' } },
    { type: 'Upload', field: 'base64', label: 'Base64', attrs: { uploadMode: 'base64', isSingle: true } },
    { type: 'Upload', field: 'text', label: '文本内容', attrs: { uploadMode: 'text', isSingle: true } },
  ],
}
</script>
