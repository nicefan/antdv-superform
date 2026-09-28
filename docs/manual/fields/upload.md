# 文件上传

Upload 管理文件选择、大小校验、上传、删除、下载和只读预览，并可把等待中的上传任务接入 SuperForm 提交流程。先确定上传时机，再确定字段值形态。

## 五种 uploadMode

| `attrs.uploadMode` | 行为                               | 适合场景                 |
| ------------------ | ---------------------------------- | ------------------------ |
| `auto`             | 选择后立即调用 `apis.upload`，默认 | 普通附件上传             |
| `submit`           | 选择时暂存，表单提交时统一上传     | 希望保存按钮统一控制     |
| `custom`           | 不调用上传接口，保留原始 File      | 导入 Excel、业务自行上传 |
| `base64`           | FileReader 保存 Data URL           | 小图片、本地预览         |
| `text`             | FileReader 保存文本                | 文本文件解析             |

```ts
// 自动上传
{
  type: 'Upload',
  field: 'attachments',
  label: '附件',
  attrs: {
    uploadMode: 'auto',
    apis: { upload: api.upload },
  },
}

// 业务导入：提交时自行读取 File
{
  type: 'Upload',
  field: 'file',
  label: '导入文件',
  attrs: {
    uploadMode: 'custom',
    isSingle: true,
    accept: '.xlsx',
  },
}
```

`auto`、`submit` 必须提供当前字段 `attrs.apis.upload`，或全局 `defaultProps.Upload.apis.upload`。

通过 `vModelFields.fileList` 可指定附加文件列表字段。

## 字段值形态

| 配置                  | 模型值       |
| --------------------- | ------------ |
| 多文件，无 `valueKey` | 文件对象数组 |
| `isSingle: true`      | 单个文件对象 |
| `valueKey: 'fileId'`  | fileId 数组  |
| `isSingle + valueKey` | 单个 fileId  |

```ts
{
  type: 'Upload',
  field: 'attachmentIds',
  vModelFields: {
    fileList: 'attachments',
  },
  attrs: {
    valueKey: 'fileId',
    infoNames: {
      uid: 'fileId',
      name: 'fileName',
      url: 'downloadUrl',
    },
  },
}
```

结果同时保留：

```ts
{
  attachmentIds: ['f-1', 'f-2'],
  attachments: [
    { fileId: 'f-1', fileName: '合同.pdf', downloadUrl: '/file/f-1' },
  ],
}
```

`vModelFields.fileList` 可以是同级字段名，也可以直接传 Ref/对象；字符串映射最适合随表单一起提交。

## apis 契约

```ts
attrs: {
  apis: {
    upload(formData, { onUploadProgress }) {
      return http.upload('/files', formData, { onUploadProgress })
    },
    delete(file) {
      return api.deleteFile(file.fileId)
    },
    download(file) {
      return api.downloadFile(file.fileId)
    },
  },
}
```

| 接口       | 参数与返回                               |
| ---------- | ---------------------------------------- |
| `upload`   | FormData 与进度回调；返回文件信息        |
| `delete`   | 当前业务文件对象；返回 Promise           |
| `download` | 当前业务文件对象；返回可构造 Blob 的数据 |

上传结果会合并进当前文件项。删除接口收到的是按 `infoNames` 映射回业务字段名的对象。

## infoNames 映射

组件内部需要 `uid`、`name`、`url`，业务接口可以使用自己的字段：

```ts
infoNames: {
  uid: 'id',
  name: 'originalName',
  url: 'previewUrl',
}
```

映射只服务内部展示，对外模型仍保持业务字段名。未提供 `url` 时可以通过 `apis.download` 下载。

## 限制与提示属性

| attrs 属性     | 类型            | 默认值       | 说明                                 |
| -------------- | --------------- | ------------ | ------------------------------------ |
| `minSize`      | number          | —            | 文件最小大小，单位 MB                |
| `maxSize`      | number          | —            | 文件最大大小，单位 MB                |
| `isSingle`     | boolean         | `false`      | 单文件模式，并限制最大数量为 1       |
| `hideOnMax`    | boolean         | `false`      | 达到 `maxCount` 后隐藏上传入口       |
| `repeatable`   | boolean         | `false`      | 是否允许同名文件                     |
| `tip`          | string          | 自动生成     | 上传区辅助提示                       |
| `title`        | string/function | `'上传文件'` | 上传按钮内容                         |
| `accept`       | string          | —            | 扩展名或 MIME 类型                   |
| `maxCount`     | number          | `Infinity`   | 最大文件数量                         |
| `beforeSelect` | function        | —            | 接收原始 File，支持异步选入校验       |
| `isView`       | boolean         | `false`      | 强制只读查看模式，通常由详情自动传入 |

```ts
attrs: {
  accept: '.pdf,.doc,.docx',
  minSize: 0.01,
  maxSize: 20,
  maxCount: 5,
  hideOnMax: true,
  repeatable: false,
  tip: '最多 5 个文件，单个不超过 20MB',
  title: '选择附件',
}
```

`beforeSelect(file: File)` 返回 `false` 或抛错会拒绝选入，异步校验完成后才加入列表。大小、数量及重名限制使用专属属性。`accept` 按扩展名或 MIME 匹配，忽略大小写和规则两端空白。

## 提交时机与错误

- `auto` 会等待仍在上传的任务，上传错误会阻止表单提交。
- `submit` 在表单提交时启动等待文件，并延后处理待删除的远程文件。
- `custom` 不自动上传，业务从文件对象的 `file` 属性读取原始 File。
- `base64` / `text` 的读取纳入提交等待，失败保留文件及错误状态并阻止提交。

```ts
const modal = useModalForm(schema, {
  onOk: async ({ file }) => {
    const body = new FormData();
    body.append("file", file.file);
    return api.import(body);
  },
});
```

## 预览与只读

`listType` 支持 text、picture、picture-card 三种列表样式；隐藏选择入口后仍显示文件列表。上传接口通过 `apis.upload` 配置。

| attrs 属性 | 类型 / 默认值 | 说明 |
| --- | --- | --- |
| `showList` | boolean / true | 是否显示列表 |
| `removable` | boolean / true | 是否显示删除操作，只读或禁用时不能删除 |
| `downloadable` | boolean / 按配置决定 | 配置下载接口或回调时默认启用，可显式关闭 |
| `previewable` | boolean / true | 是否允许预览 |
| `beforeRemove` | function | 接收 UIUploadFile，返回 false 或拒绝 Promise 时保留文件 |
| `isImage` | function | 接收 UIUploadFile，返回是否为图片 |
| `onChange` | function | 接收 `{ file, fileList }` |
| `onDownload` | function | 接收 UIUploadFile，自定义下载 |
| `onPreview` | function | 接收映射后的业务文件，可异步返回预览地址 |

`UIUploadFile` 包含 uid、name、可选的 file（原始 File）、url、type、size、percent 和 status；status 为 waiting、uploading、done 或 error，并允许业务扩展字段。`slots.file` 可自定义文件项。

详情模式隐藏上传和删除入口，下载仍由配置决定；无附件显示“暂无附件”。

不依赖后端的模式可在[文件上传示例](/examples?example=upload)中运行。
