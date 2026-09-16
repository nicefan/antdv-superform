# 迁移到 superform-antdv 1.0

1.0 同时完成包拆分、AntDV Next 升级和 UI Adapter 解耦。本页列出 AntDV 项目最直接的迁移顺序。

## 版本与安装

- Vue `>= 3.5.0`
- AntDV Next `>= 1.5.0`

```bash
pnpm remove antdv-superform ant-design-vue @ant-design/icons-vue
pnpm add superform-antdv antdv-next
```

业务运行时不再单独安装 Core `superform`。需要 CLI 时才把 `superform` 添加为开发依赖。

## 初始化迁移

旧写法：

```ts
app.use(superform, options);
```

新写法：

```ts
import superform from "superform-antdv";

superform.initialize();
superform.configure(options);
```

`locale` 不再属于 SuperForm 配置，应通过 AntDV `ConfigProvider` 设置。字段组件使用 Vite 自动导入、手动 `initialize({ components })` 或 `/components` 全量入口，详见[安装](/manual/installation)。

## Schema 字段名称

UI 字段使用 AntDV 的真实组件名，不保留旧 SuperForm 别名：

| 旧名称 | 1.0 名称 |
| --- | --- |
| `Textarea` | `TextArea` |
| `DateRange` | `DateRangePicker` |
| `TimeRange` | `TimeRangePicker` |
| `Radio` 组选项 | `RadioGroup` |
| `Checkbox` 组选项 | `CheckboxGroup` |

`Radio` 和 `Checkbox` 仍可表示 AntDV 的单控件，但不再承担 options 增强。范围字段的 `endField`、`stringifyValue` 语义保持不变。

## AntDV Next 属性变化

旧底层组件属性不会由兼容层转换，Schema 的 `attrs` 应直接使用 AntDV Next Props：

| 场景 | 删除的旧属性 | 当前写法 |
| --- | --- | --- |
| 输入、选择、日期、时间 | `bordered` | `variant` |
| AutoComplete | `dataSource` | `options` |
| AutoComplete、Select、TreeSelect | `dropdownMatchSelectWidth` | `popupMatchSelectWidth` |
| AutoComplete、Select、TreeSelect | `dropdownRender` | `popupRender` |
| 弹层样式 | `dropdownStyle` / `popupStyle` | 对应组件的 `styles` |
| 弹层类名 | `dropdownClassName` / `popupClassName` | 对应组件的 `classes` |
| 打开状态事件 | `onDropdownVisibleChange` | `onOpenChange` |
| TimePicker | `addon` | `renderExtraFooter` |
| RadioGroup | `vertical` | `orientation` |
| Upload 图标 | `removeIcon` / `downloadIcon` / `previewIcon` | `showUploadList` 对象 |
| Upload 转换 | `transformFile` | `beforeUpload` |

```ts
const schema = {
  type: "Form",
  subItems: [
    {
      type: "Select",
      field: "status",
      label: "状态",
      options: ["启用", "停用"],
      attrs: {
        variant: "filled",
        popupMatchSelectWidth: true,
        onOpenChange: (open) => console.log(open),
      },
    },
    {
      type: "DateRangePicker",
      field: "startedAt",
      endField: "endedAt",
      attrs: { valueFormat: "YYYY-MM-DD" },
    },
    {
      type: "RadioGroup",
      field: "direction",
      options: ["横向", "纵向"],
      attrs: { orientation: "vertical" },
    },
  ],
};
```

## 自定义组件迁移

- `components.UserPicker` → `superform.registerComponent("UserPicker", UserPicker)`。
- 批量业务组件使用 `registerComponents()`。
- 删除 `ExtUserPicker` 前缀，Schema 直接使用 `UserPicker`。
- `registComponent`、`registerFormComponents`、`configureComponents` 已移除。
- `components.Input/Table/Modal` 等底层替换不再支持；默认属性迁到 `defaultProps`，协议级替换迁到自定义 Adapter。

## 构建插件迁移

```ts
import SuperFormComponents from "superform-antdv/unplugin";

SuperFormComponents({
  dirs: ["src"],
  entry: "src/main.ts",
  dts: "src/superform-components.d.ts",
});
```

官方插件已内置 AntDV resolver 和类型模块。Rollup、Webpack 子入口已经删除。

## 其他旧属性

以下旧属性只用于识别迁移代码，新 Schema 不应继续使用：

| 旧属性 | 当前写法 |
| --- | --- |
| `blocked` | `block` |
| `wrapping` | `breakAfter` |
| `hideInTable` / `hideInForm` / `hideInDescription` | `exclude` |
| `validOn` | `visibleIn` |
| `invalidDisabled` / `roleMode` | `unauthorized` |
| `forSlot` | `targetSlot` |
| `valueToLabel` | `labelAsValue` |
| `valueToString` | `stringifyValue` |
| `keepField` | `endField` |
| `searchSchema` | `searchForm` |
| `editForm` | `rowEditor.form` |
| TreeSelect `data` | `treeData` |

## 图标配置

图标配置使用渲染函数，例如 `icon: () => h(MyIcon)`。覆盖和移除方式见[按钮配置](/manual/super-buttons#按钮配置)。

## 检查清单

1. 全局替换包入口与五个旧字段别名。
2. 删除 `app.use(superform, options)`，在挂载前调用 `initialize()` 和 `configure()`。
3. 确认每个 Adapter 字段由自动导入或手动组件表提供。
4. 将业务组件迁到 `registerComponent(s)`。
5. 按 AntDV Next Props 修正 `attrs`。
6. 运行项目类型检查、生产构建和关键表单、弹窗、上传、表格回归。

完整的不兼容变化记录位于仓库 `upgrade/migration/BREAKING-CHANGES.md`。
