# Upload 扩展

`Upload` 是项目里扩展最重的字段之一，在 Ant Design Vue 的基础上补了不少业务能力。

## 额外能力

- `apis.upload(formData, { onUploadProgress })`
- `apis.delete(file)`
- `apis.download(file)`
- `infoNames`
- `valueKey`
- `minSize`
- `maxSize`
- `isSingle`
- `hideOnMax`
- `repeatable`
- `uploadMode`
- `tip`
- `isView`

## `uploadMode`

- `auto`: 选择后立即上传
- `submit`: 表单提交时统一上传
- `custom`: 只维护文件列表，不自动上传
- `base64`: 读成 base64 存值
- `text`: 读成文本存值

## 最小示例

```ts
{
  type: 'Upload',
  field: 'files',
  label: '附件',
  attrs: {
    uploadMode: 'submit',
    valueKey: 'id',
    apis: {
      upload: (formData, config) => api.upload(formData, config),
      delete: (file) => api.remove(file.id),
      download: (file) => api.download(file.id),
    },
  },
}
```

## 说明

- 查看态下会自动收敛为文件列表展示
- `value` 和 `fileList` 同时存在时，需要明确哪个是主数据源
- 若你需要统一上传协议，建议在业务层再包一层适配
