# SuperButtons

SuperButtons 根据配置生成业务操作区，可用于表单、表格工具栏和行操作。

```ts
const buttons = {
  actions: [
    'submit',
    'reset',
    { text: '导出', type: 'primary', onClick: () => exportData() },
  ],
}
```

全局 `buttonRoles` 可提供权限集合。按钮配置可以结合 effectData 判断隐藏、禁用或动态文案。
