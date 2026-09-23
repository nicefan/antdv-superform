# AntDV 接入配置

业务项目使用 `superform-antdv` 和 `antdv-next`，Vue 版本需满足包的 peerDependencies。产品包已内置 Core，业务运行时无需另行安装 superform。

## 初始化 {#初始化迁移}

```ts
import superForm from 'superform-antdv'

superForm.initialize()
superForm.configure({ schemaDiagnostics: true })
```

字段组件由 Vite 自动导入插件或 `initialize({ components })` 提供。只选择一个产品包，同一应用不混用 Element Plus 产品。语言由 UI 的 ConfigProvider 管理。

## 字段名称 {#schema-字段名称}

使用 Adapter 声明的名称，如 TextArea、InputPassword、InputSearch、DateRangePicker、TimeRangePicker、RadioGroup、CheckboxGroup。完整目录见[UI 输入组件](/manual/fields/basic-inputs)。

选项字段使用 `options: { source }` 或 `options: { dictName }`；值转换配置放在 options 内。范围双字段使用 endField，逗号字符串使用 stringifyValue。

## 原生属性 {#antdv-next-属性变化}

attrs 采用 AntDV Next 原生 Props，事件参数也遵循原生组件。需要表单上下文时用顶层事件，动态属性使用 dynamicAttrs。InputSearch 的异步 loading 由业务管理。

日期格式、树选择标签、输入与选项见对应[字段指南](/manual/fields/basic-inputs)。表单校验错误使用[统一错误结构](/manual/validation#统一校验错误)。

## 项目组件 {#自定义组件迁移}

通过 `registerComponent(s)` 注册业务组件；项目组件不能覆盖 Core 或 Adapter 保留字段。固定 UI 的项目级覆盖使用首次初始化的 overrides，见[Adapter](/manual/ui-decoupling)。

## 自动导入 {#构建插件迁移}

```ts
import SuperFormComponents from 'superform-antdv/unplugin'

SuperFormComponents({
  dirs: ['src'],
  entry: 'src/main.ts',
  dts: 'src/superform-components.d.ts',
})
```

动态 Schema 名称通过插件 types 补充，完整配置见[自动导入](/manual/auto-components)。

## 图标配置

图标使用 `() => VNodeChild`，例如 `icon: () => h(UserIcon)`。动作默认图标可在全局 defaultButtons、按钮组或单项覆盖。

## 接入检查 {#检查清单}

- 字段组件已自动或手动登记。
- UI 原生属性与目标产品匹配。
- 表格 rowKey 稳定唯一。
- API 数据和字段名一致，回填记录使用 resetFields。
- 详情单独配置 attrs，仅与表单共享字段及布局。

<span id="版本与安装"></span>
<span id="其他旧属性"></span>
