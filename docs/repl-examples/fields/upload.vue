<template>
  <SuperForm @register="register" />
  <pre class="demo-model">{{ model }}</pre>
</template>

<script setup>
import { SuperForm, useForm } from 'superform-antdv'

const [register, form] = useForm({
  subItems: [
    {
      type: 'Upload',
      field: 'avatarBase64',
      label: 'Base64 单图',
      attrs: {
        uploadMode: 'base64',
        isSingle: true,
        accept: '.png,.jpg,.jpeg',
        maxSize: 2,
        listType: 'picture',
      },
    },
    {
      type: 'Upload',
      field: 'importFile',
      label: 'Custom 单文件',
      attrs: {
        uploadMode: 'custom',
        isSingle: true,
        accept: '.xlsx',
        tip: '保留 originFileObj，由业务上传',
      },
    },
    {
      type: 'Upload',
      field: 'attachments',
      label: 'Custom 多附件',
      attrs: { uploadMode: 'custom', maxCount: 3, hideOnMax: true, repeatable: false },
    },
    {
      type: 'Upload',
      field: 'attachmentNames',
      label: '值 + 完整列表',
      vModelFields: { fileList: 'attachmentFiles' },
      attrs: { uploadMode: 'custom', valueKey: 'name', maxCount: 2 },
    },
    {
      type: 'Upload',
      field: 'textContent',
      label: '读取文本',
      attrs: { uploadMode: 'text', isSingle: true, accept: '.txt,.json' },
    },
  ],
})
const model = form.dataSource
</script>
