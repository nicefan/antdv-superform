# antdv-next 升级支持

本文记录 antdv-superform 1.0 切换到 [antdv-next](https://github.com/antdv-next/antdv-next) 时采用的 API 基线、字段属性变化和迁移检查项。

## 版本基线与兼容策略

- `antdv-superform 1.0` 以 `antdv-next >= 1.5.0`、`Vue >= 3.5.0` 为运行基线。
- 1.0 是破坏性版本，不兼容 `ant-design-vue 3.x`；本兼容层也不会在运行时转换下表所列的旧底层组件属性。
- 项目运行时组件、类型和可覆盖的底层组件注册表统一放在 `src/compat/antdv.ts`，图标统一从 `src/compat/icons.ts` 导入。以后上游再调整导出时，应只修改这两个边界。
- 字段名称仍使用 SuperForm schema 的名称，例如 `Textarea`、`DateRange`、`InputGroup`；它们不是上游组件导出名。

安装基线：

```bash
pnpm add vue@^3.5 antdv-next@^1.5 @antdv-next/icons@^1.1 antdv-superform@^1
```

```ts
import Antdv from 'antdv-next'
import zhCN from 'antdv-next/locale/zh_CN'
import 'antdv-next/dist/antd.css'
```

## 导出归一化

| 0.x / 旧上游导出 | 1.0 内部导出 | 处理方式 |
| --- | --- | --- |
| `Textarea` | `TextArea` | 字段 `Textarea` 改用 next 标准组件 |
| `RangePicker` | `DateRangePicker` | 字段 `DateRange` 改用 next 标准组件 |
| `InputGroup` | `SpaceCompact` | `InputGroup` 字段以 `SpaceCompact` 实现；`compact: false` 时使用 `Space` |
| `FormItemRest` | 无 | 已移除，不再生成兼容包装层 |
| `List` / `ListItem` | `SuperList` / `SuperListItem` | 上游已无旧 List，列表容器改为项目内实现 |
| `@ant-design/icons-vue` | `@antdv-next/icons` | 所有图标经 `src/compat/icons.ts` 导出 |
| `TableColumnProps` | `TableColumnType` | 表格列类型使用 next 标准名称 |

底层组件覆盖配置也使用 1.0 名称：`SpaceCompact`、`DateRangePicker`、`SuperList`、`SuperListItem`。旧名称不会被识别。

## 字段属性归一化

下表中的旧属性已从 1.0 规范中移除。迁移 schema 时必须直接改成新属性；兼容层不会代为转换。

| 字段 | 删除的旧属性 | 1.0 规范属性 |
| --- | --- | --- |
| Input、Textarea、InputNumber、选择、日期、时间 | `bordered` | `variant: 'outlined' \| 'borderless' \| 'filled' \| 'underlined'` |
| AutoComplete | `dataSource` | `options` |
| AutoComplete、Select、TreeSelect | `dropdownMatchSelectWidth` | `popupMatchSelectWidth` |
| AutoComplete、Select、TreeSelect | `dropdownRender` | `popupRender` |
| AutoComplete、Select、TreeSelect | `dropdownStyle` | `styles.popup.root` |
| AutoComplete、Select、TreeSelect | `dropdownClassName` / `popupClassName` | `classes.popup.root` |
| AutoComplete、Select、TreeSelect | `onDropdownVisibleChange` | `onOpenChange` |
| DatePicker、DateRange | `popupStyle` | `styles.popup.root` |
| DatePicker、DateRange | `dropdownClassName` / `popupClassName` | `classes.popup.root` |
| DatePicker、DateRange | `onSelect` | `onCalendarChange` |
| TimePicker、TimeRange | `popupStyle` / `popupClassName` | `styles.popup` / `classes.popup` |
| TimePicker、TimeRange | `addon` | `renderExtraFooter` |
| Radio | `vertical` | `orientation: 'vertical' \| 'horizontal'` |
| Upload | `removeIcon` / `downloadIcon` / `previewIcon` | 放入 `showUploadList` 对象 |
| Upload | `transformFile` | `beforeUpload` |
| Upload | `remove` | `onRemove` |
| Dropdown 插槽 | `overlay` | `popupRender` |
| ButtonGroup | `buttonType: 'ghost'` | 使用受支持的 `buttonType`，需要幽灵样式时通过 Button 的独立属性配置 |

### 新规范示例

```ts
const schema = {
  type: 'Form',
  subItems: [
    {
      type: 'Select',
      field: 'status',
      label: '状态',
      options: ['启用', '停用'],
      attrs: {
        variant: 'filled',
        popupMatchSelectWidth: true,
        classes: { popup: { root: 'status-popup' } },
        styles: { popup: { root: { minWidth: '240px' } } },
        onOpenChange: (open) => console.log(open),
      },
    },
    {
      type: 'DateRange',
      field: 'startedAt',
      endField: 'endedAt',
      attrs: {
        variant: 'underlined',
        needConfirm: true,
      },
    },
    {
      type: 'Radio',
      field: 'direction',
      options: ['横向', '纵向'],
      attrs: { orientation: 'vertical' },
    },
  ],
}
```

## 新增的字段类型覆盖

1.0 不再让以下字段退化为通用 `Obj`，`attrs` 会直接提示对应的 antdv-next 属性：

- `Textarea` → `TextAreaProps`
- `InputNumber` → `InputNumberProps`
- `DatePicker` → `DatePickerProps`
- `DateRange` → `RangePickerProps`
- `TimePicker` → `TimePickerProps`
- `TimeRange` → `TimeRangePickerProps`
- `Radio` → `RadioGroupProps`
- `Checkbox` → `CheckboxGroupProps`

因此 `variant`、`classes`、`styles`、`needConfirm`、`orientation`、`renderExtraFooter` 等 next 属性可以在 schema 中获得类型检查和编辑器提示。

## 工程侧变化

- 表格行内编辑不再使用已移除的 `Form.useForm(model, rules)`。每个编辑单元建立 next Form 实例，保存前汇总执行 `validate()`。
- Table 行选择的 `onChange` 现在转发第三个 `info` 参数。
- Vitest 必须内联转换 `antdv-next` 和 `@v-c/*`。否则 Node ESM 会因 Day.js 插件的无扩展名引用而加载失败；项目已在 `vite.config.ts` 固化该配置。
- Vite/Rollup 的 external、manual chunk 和 REPL 资源同步路径必须使用 `antdv-next` / `@antdv-next`。

## 迁移检查清单

1. 全局搜索旧依赖导入：

   ```bash
   rg "ant-design-vue|@ant-design/icons-vue" src docs
   ```

2. 全局搜索旧字段属性：

   ```bash
   rg "bordered|dropdownMatchSelectWidth|dropdownRender|dropdownStyle|dropdownClassName|popupClassName|onDropdownVisibleChange|transformFile|removeIcon|downloadIcon|previewIcon" src tests docs
   ```

3. 运行字段兼容测试和类型检查：

   ```bash
   pnpm vitest run tests/field-compat.test.ts
   pnpm exec vue-tsc --noEmit
   ```

4. 完整升级阶段还需要更新全部示例文档、REPL 依赖映射和 1.0 静态资源，并执行表单、弹窗、表格行内编辑、日期时间及上传的浏览器回归测试。

## 当前支持状态

本阶段已经完成源代码依赖边界、新导出、字段属性类型、字段测试与基础工程配置。以下工作明确留给后续 1.0 升级阶段：

- 迁移现有手册中仍展示 0.x 属性的示例；
- 生成新的 REPL / CSS 构建产物；
- 对 antdv-next 的样式变化进行浏览器视觉回归；
- 根据回归结果调整 Modal、Table、Upload 等复杂组件行为。
