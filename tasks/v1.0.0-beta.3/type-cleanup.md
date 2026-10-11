# 类型冗余与废弃 API 清理

日期：2026-10-10。状态：已实现，待类型及人工验证。

## 实施前

`src/exaTypes.d.ts` 存在未使用的导入、HelpMessage、注释掉的旧定义及重复继承属性；废弃 Schema 配置仍在类型和运行时保留兼容。用户明确要求本轮只清理冗余、不拆分类型文件，并删除全部标记为 `@deprecated` 的旧配置及对应兼容代码。

## 关键变更

- 删除未使用的 VNodeChild、HelpMessage 和旧定义注释；DeepReadonly、RuleConfig 改为类型导入。删除 ExtFormOption.descriptionsProps、CollapseItem.buttons 的重复声明，由基类提供；SwitchFieldOption 改为 SelectFieldOption 的类型别名，保留公开名称，不再提供接口声明合并。
- 删除 hideInForm/hideInDescription/hideInTable，统一使用 exclude；删除 blocked/wrapping，统一使用 block/breakAfter。表单、详情、InputList、表格列及弹窗编辑表单同步移除旧属性读取。
- 删除按钮 invalidDisabled/roleMode/validOn/forSlot，统一使用 unauthorized/visibleIn/targetSlot；清理 SuperButtons 旧 Props 及权限、场景、插槽兼容分支。
- 删除表格 edit、根级 editMode/addMode、editForm、searchSchema；使用 editable、rowEditor.editMode/addMode/form、searchForm。弹窗编辑表单同时移除已被 rowEditor.form 取代的旧 formSchema 回退。
- 删除 useForm.setData 别名，表单赋值重置使用 resetFields；保留 useTable/useDetail 的现行 setData。现有示例同步迁移旧配置，清理相关过期注释。
- 保留 Schema 诊断器中的旧名称迁移提示、Adapter 类型注册与扩展入口，以及现有内部类型存放方式。本轮未同步正式文档，也未修改测试文件。

## 验证

已静态核对声明与运行时消费点、旧名称残留和源码差异，git diff --check 通过；旧配置名称仅保留在诊断器迁移提示及其既有测试中。exaTypes.d.ts 从本轮开始时的 904 行减少至 835 行。2026-10-11 已运行 Core、两套产品及示例类型检查、生产构建和单元测试，并检查生产声明及部分浏览器交互；Core、两套产品及示例通过，已修正 AntDV 示例分页/响应式 loading 类型及三项旧测试；新增两项详情注册测试后全量 51 项通过。详见 [测试结果](./validation-2026-10-11.md)。综合人工验证及正式文档同步仍见 CHECKLIST.md。
