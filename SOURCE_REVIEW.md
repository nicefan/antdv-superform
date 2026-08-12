# 文档同步源码审核清单

本文记录重写文档时发现的源码问题、类型偏差和后续改进建议。根据项目协作约束，本次仅记录，不修改与文档站无关的组件源码。

## 明确问题

- [ ] **`dictApi` 返回类型无法表达标准选项的布尔属性**

  - 位置：`src/plugin.ts` 的 `Dict` 与 `InstallConfig.dictApi`
  - 现状：`Dict` 的索引签名只允许 `string | number`，但运行时会把结果作为标准 options 使用，实际需要支持 `disabled: boolean` 等选项属性。
  - 影响：业务字典接口返回 `{ label, value, disabled }[]` 时运行正常，但插件安装配置会产生 TypeScript 类型错误，与字段 options 的公开能力不一致。
  - 建议：复用标准选项类型，或至少让附加属性支持 `unknown`，并补充带 `disabled` 的 dictApi 类型测试。

- [ ] **`searchForm.advanced` 只有类型声明，运行时未实现**

  - 位置：`src/exaTypes.d.ts`、`src/superTable/useSearchForm.ts`
  - 现状：类型声明了 `advanced?: boolean`，但 `useSearchForm` 没有读取该属性；它会落入 `formOption` 并透传给 Form，最终不产生高级查询行为。
  - 影响：编辑器允许配置且旧手册曾将其描述为有效能力，但运行时静默无效。
  - 建议：若高级查询等同于条件折叠，应删除 `advanced` 并统一使用 `limit`；若语义不同，需要先定义交互与状态契约再实现。

- [ ] **`ButtonItem.dropdownProps` 只有类型声明，运行时字段名不一致**

  - 位置：`src/exaTypes.d.ts`、`src/components/buttons/ButtonGroup.vue`
  - 现状：公开类型声明 `dropdownProps`，模板实际绑定的是内部结果字段 `dropdownProp`；构建按钮结果时没有从前者映射到后者。
  - 影响：业务配置 `dropdownProps` 不会传给 Ant Design Vue Dropdown，位置、触发方式等设置静默无效。
  - 建议：统一公开和内部字段名，构建按钮结果时显式传递，并增加 Dropdown 属性透传测试。

- [ ] **`useTable().goPage()` 没有返回请求 Promise**

  - 位置：`src/superTable/useTable.ts`
  - 现状：包装动作调用 `tableRef.value?.goPage(page)`，但缺少 `return`。
  - 影响：底层 `useQuery.goPage()` 已返回请求 Promise，公开包装层却无法 `await`，与 `query`、`reload` 的一致性及既定公开契约不符。
  - 建议：返回内部调用结果，并补充公开动作测试。

- [ ] **Switch 的 `options` 运行时 prop 类型与公开能力不一致**

  - 位置：`src/components/Switch.vue`
  - 现状：运行时声明为 `Object`，但 `useOptions` 和 Schema 类型允许数组、Ref 与函数。
  - 影响：传入最常用的 `{ label, value }[]` 时可能产生 Vue prop 校验警告。
  - 建议：取消过窄的运行时校验，或声明与 `SelectOptions` 一致的联合类型。

- [ ] **InputList 的 `$index` 只读分支未读取当前数组项**

  - 位置：`src/components/InputList.vue`
  - 现状：遍历行时输出 `effectData.value`，没有使用当前行的 `refData` 或模型值。
  - 影响：原始值数组进入详情模式时，多项内容可能显示为空或重复值。
  - 建议：从每个 `children` 对应的模型读取当前值，并增加多项、重复值和重排后的只读测试。

- [ ] **List / ListGroup 的容器级数组规则没有独立校验入口**

  - 位置：`src/components/List.vue`、`src/components/ListGroup.vue`、`src/utils/buildModel.ts`
  - 现状：容器可以声明数组级 `rules`，但渲染时没有为容器模型建立独立 FormItem，规则不会形成可见的校验状态。
  - 影响：业务可能配置“数组至少一项”等容器级规则，但提交时不会按预期阻止表单。
  - 建议：明确数组容器是否支持整体规则；若支持，为容器模型建立校验项并覆盖空数组、最少项和动态删除测试；否则收窄公开类型。

- [ ] **ListGroup 的渲染 key 混入当前下标**

  - 位置：`src/components/ListGroup.vue`
  - 现状：已按业务主键或对象身份生成稳定 key，但渲染时使用 `key + idx`。
  - 影响：数组重排后 key 仍会改变，可能导致子组件状态和校验状态重建。
  - 建议：直接使用已生成的稳定 key；对重复业务主键单独给出诊断或回退策略。

- [ ] **校验类型推断读取了 Ref 对象本身的类型**

  - 位置：`src/utils/buildModel.ts`
  - 现状：`typeof subModel.refData` 得到的是响应式 Ref/ComputedRef 的 `object`，并非字段实际值类型。
  - 影响：未显式指定 `rules.type` 的 `min`、`max`、`len` 等规则可能生成错误的校验类型。
  - 建议：基于 `toValue(subModel.refData)` 推断，并覆盖字符串、数字、数组和空初始值测试。

- [ ] **动态属性删除后可能残留旧值**

  - 位置：`src/utils/reactivity.ts` 的 `getComputedAttr`
  - 现状：每次只用 `Object.assign` 合并函数结果，不清理新结果中已经不存在的键。
  - 影响：`dynamicAttrs` 条件性返回某个属性后，再省略该属性时旧值仍可能保留。
  - 建议：更新前删除旧键，或让计算结果整体替换，并增加条件属性回收测试。

- [ ] **Text 与 HTML 字段忽略公开的 `viewRender`**

  - 位置：`src/components/Collections.ts`
  - 现状：`ExtBaseOption` 让所有字段类型都可配置 `viewRender`，但 Text 与 HTML 分支直接输出 `model.refData`，没有进入 `getViewNode`。
  - 影响：类型允许且编辑器会提示的自定义只读格式在这两类字段中静默失效，例如金额格式仍显示原始数字。
  - 建议：明确 Text/HTML 是否支持 `viewRender`；若支持，应与其他不可编辑字段统一走 `getViewNode`，并补充优先级测试。

- [ ] **SuperTable 高度默认值与预期公共契约存在差异**

  - 位置：`src/superTable/SuperTable.vue`、`src/superTable/useTableScroll.ts`、`src/plugin.ts`
  - 现状：`isScanHeight` 运行时默认 `true`，但 `isFixedHeight` 未设置默认值（实际为 `false`），`resizeHeightOffset` 计算时未配置按 `0` 处理；业务预期默认值分别为 `true` 和 `36`。
  - 影响：按业务预期省略后两项时，数据较少不会固定表格区域，也不会额外保留 36px 页面底部距离。
  - 建议：确认这两个值是库默认还是项目默认。若属于库契约，在 `globalProps.Table` 或 Schema 归一化阶段显式设置并补充高度计算测试；若属于项目策略，仅通过安装配置统一注入。

- [ ] **`maxHeight` 当前不是整个 SuperTable 的总高度**

  - 位置：`src/superTable/useTableScroll.ts`
  - 现状：`maxHeight` 直接赋给内部表格行滚动高度；查询表单、表头和分页不包含在该数值中。开启 `isFixedHeight` 后也只据此计算 `.ant-table` 高度。
  - 影响：如果公开语义定义为“包含查询区与分页的整个表格组件高度”，实际页面会高于配置值。
  - 建议：明确属性应表示滚动体高度还是 SuperTable 总高度；若采用后者，需要从总高度中扣除查询区、分页、标题与表头，并覆盖有无搜索、分页和标题的组合测试。

- [ ] **SuperTable 的分页运行时默认值与 AI 指南不一致**

  - 位置：`src/superTable/useQuery.ts`、`AI_GUIDE.md`
  - 现状：分页 watcher 在 `pagination` 未配置时仍进入启用分支，生成 `current: 1`、`size: 10` 的标准分页；AI 指南声明“默认不分页”。
  - 影响：业务按指南省略配置时，页面会出现分页并向接口发送分页参数。
  - 建议：确认公共契约。若默认不分页，watcher 应把 `undefined` 与 `false` 一并视为关闭；若默认分页，应同步 AI 指南、类型说明和测试。契约明确前，业务代码显式写 `pagination: false` 或分页对象。

## 边界风险

- [ ] **Table 的业务 rowKey 为 `0` 或空字符串时会被当作缺失**

  - 位置：`src/components/Table/Table.vue`
  - 现状：通过 `if (key)` 判断主键是否存在。
  - 建议：改为仅把 `null` / `undefined` 视为缺失。

- [ ] **Table 删除不在当前列表中的记录时存在误删最后一行风险**

  - 位置：`src/components/Table/Table.vue`
  - 现状：直接执行 `splice(list.value.indexOf(item), 1)`；索引为 `-1` 时会删除末项。
  - 建议：删除前判断索引，或统一按稳定 rowKey 查找。

- [ ] **`SuperDetail` 不响应 `schema` prop 的整体替换**

  - 位置：`src/superDetail/SuperDetail.vue`
  - 现状：只在 setup 时读取 `props.schema`，后续没有 watcher；命令式 `setOption` 不受影响。
  - 建议：明确声明 Schema 是否支持运行时整体替换；若支持，监听并重建模型映射。

- [ ] **`required` 合并过程会修改调用方传入的 rules 对象**

  - 位置：`src/utils/buildModel.ts`
  - 现状：字段同时配置 `required` 和 `rules` 时直接给首个规则对象写入 `required`。
  - 影响：复用同一规则对象的多个 Schema 可能相互影响。
  - 建议：合并前复制规则对象。

- [ ] **函数或 VNode 标签可能生成异常默认 placeholder**

  - 位置：`src/components/Textarea.vue`、`src/components/InputNumber.vue`、`src/components/AutoComplete.vue`、`src/components/TreeSelect.vue`
  - 现状：部分组件直接把 `option.label` 拼接到字符串；Input 已仅在字符串标签时拼接。
  - 建议：统一默认占位符生成逻辑，非字符串标签只使用“请输入”或“请选择”。

- [ ] **Tabs 的 `forceRender` 只存在于类型声明，运行时未消费**

  - 位置：`src/exaTypes.d.ts`、`src/components/Tabs.vue`
  - 现状：`ExtTabsOption` 声明了根级 `forceRender`，Tabs 实现没有读取或转交该配置。
  - 建议：若需要该能力，应明确它属于根 Tabs 还是各 TabPane，并补齐实现；否则从公开类型移除。

- [ ] **列属性 `defaultHidden` 只有类型声明，没有公开运行时实现**

  - 位置：`src/exaTypes.d.ts` 的 `VColumnProps`
  - 现状：声明了 `defaultHidden`，但当前列构建和显隐逻辑均未读取该属性，且 `VColumnProps` 没有作为公开列配置类型导出。
  - 建议：若需要默认隐藏列，应定义列显隐状态与命令式切换契约后实现；否则删除未使用声明。

- [ ] **List 运行时支持 `attrs.rowKey`，公开类型未声明**

  - 位置：`src/components/List.vue`、`src/exaTypes.d.ts` 的 `ExtListOption`
  - 现状：List 从 `attrs.rowKey` 读取业务主键，但 `attrs` 只声明为 `ListProps | Obj`，没有像 ListGroup 一样明确公开 `rowKey`。
  - 建议：为 List 的 attrs 补充 `rowKey?: string`，并统一数组容器的主键说明与测试。

- [ ] **SuperTable 高度属性在根级与 `attrs` 中的处理不一致**

  - 位置：`src/exaTypes.d.ts` 的 `RootTableOption.attrs`、`src/superTable/SuperTable.vue`
  - 现状：类型允许在 `attrs` 中配置完整 `TableScanHight`，运行时只从 attrs 提升 `isScanHeight`、`inheritHeight`、`isFixedHeight`；`maxHeight`、`resizeHeightOffset` 的消费路径读取根级 option。
  - 影响：按类型把后两项写入 attrs 时可能不生效。
  - 建议：统一所有高度属性的规范层级，并让类型、归一化和文档保持一致。

## API 与类型整理建议

- [ ] `TableApis.export` 仍出现在公开类型中，但运行时没有自动消费；建议下一次破坏性版本删除，或补齐明确的导出动作契约。
- [ ] `useTable().resetSearchForm()` 当前不返回内部执行结果；可与其他命令式动作统一返回值策略。
- [ ] 为字段组件补充导出的专属配置类型，减少业务项目依赖全局 `GetOption<'...'>` 类型。
- [ ] 为每个内置字段建立“公开类型—运行时 props—默认值—只读渲染”一致性测试，防止文档与实现再次漂移。
