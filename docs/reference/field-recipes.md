# 常用字段配方

这一页给出常见字段写法，便于直接复制修改。

## 文本输入

```ts
{
  type: 'Input',
  field: 'name',
  label: '姓名',
  rules: { required: true },
  attrs: {
    placeholder: '请输入姓名',
  },
  formItemProps: {
    extra: '最多 20 个字符',
  },
}
```

## 单选下拉

```ts
{
  type: 'Select',
  field: 'status',
  label: '状态',
  options: [
    { label: '启用', value: 1 },
    { label: '停用', value: 0 },
  ],
  valueToNumber: true,
  attrs: {
    placeholder: '请选择状态',
    allowClear: true,
  },
  columnProps: {
    width: 120,
    align: 'center',
  },
  descriptionsProps: {
    span: 1,
  },
}
```

## 远程选项

```ts
{
  type: 'Select',
  field: 'deptId',
  label: '部门',
  options: async () => {
    const list = await api.queryDeptList()
    return list.map((item) => ({
      label: item.name,
      value: item.id,
    }))
  },
}
```

## id 与名称同步

```ts
{
  type: 'Select',
  field: 'deptId',
  labelField: 'deptName',
  label: '部门',
  options: async () => {
    const list = await api.queryDeptList()
    return list.map((item) => ({
      label: item.name,
      value: item.id,
    }))
  },
  columnProps: {
    width: 180,
  },
}
```

这个配置适合：

- 编辑时渲染成选择框
- 提交时保存 `deptId`
- 同时把显示名称同步到 `deptName`
- 表格和详情展示时优先显示 `deptName`

## 区间日期

```ts
{
  type: 'DateRange',
  field: 'startDate',
  keepField: 'endDate',
  label: '有效期',
}
```

## 联动禁用

```ts
{
  type: 'Input',
  field: 'memo',
  label: '备注',
  disabled: ({ formData }) => !formData.status,
}
```

## 文件上传

```ts
{
  type: 'Upload',
  field: 'files',
  label: '附件',
  attrs: {
    uploadMode: 'submit',
    maxSize: 5,
    apis: {
      upload: (formData, config) => api.upload(formData, config),
      delete: (file) => api.remove(file.id),
      download: (file) => api.download(file.id),
    },
  },
}
```

## 查看态自定义

```ts
{
  type: 'Select',
  field: 'status',
  label: '状态',
  options: [
    { label: '启用', value: 1, color: 'green' },
    { label: '停用', value: 0, color: 'red' },
  ],
  viewRender: ({ value }) => value === 1 ? '启用' : '停用',
}
```

## 容器继承宽度

```ts
{
  type: 'Group',
  title: '基础信息',
  subSpan: 12,
  subItems: [
    {
      type: 'Input',
      field: 'name',
      label: '姓名',
    },
    {
      type: 'Input',
      field: 'memo',
      label: '备注',
      span: 24,
    },
  ],
}
```

这里 `name` 默认继承容器的 `subSpan: 12`，而 `memo` 自己声明了 `span: 24`，因此以 `24` 为准。
