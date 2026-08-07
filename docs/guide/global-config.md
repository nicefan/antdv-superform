# 全局配置

插件安装用于配置字典、权限、默认属性与底层组件替换，不会代替组件导入。

```ts
import { createApp } from 'vue'
import AntdvSuperForm from 'antdv-superform'
import App from './App.vue'

createApp(App)
  .use(AntdvSuperForm, {
    schemaDiagnostics: import.meta.env.DEV,
    dictApi: (name) => api.getDictionary(name),
    buttonRoles: () => permissionStore.roles,
    tableApiSetting: {
      currentField: 'current',
      sizeField: 'size',
      resultTransform: (result) => result.data,
    },
  })
  .mount('#app')
```

`dictApi(name)` 应返回 `Promise<{ label, value }[]>`。不需要全局能力时，可以直接导入组件与组合函数。

## 扩展字段

```ts
AntdvSuperForm.registerComponent('UserPicker', UserPicker)
```

schema 中使用 `ExtUserPicker`：

```ts
{ type: 'ExtUserPicker', field: 'userId', label: '用户' }
```
