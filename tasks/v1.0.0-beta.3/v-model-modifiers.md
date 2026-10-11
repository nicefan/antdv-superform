# v-model 修饰符

日期：2026-10-11。状态：已整合到 next-dev，已同步手册并通过回归。

## 实施前

字段写回没有统一的 trim/number 转换配置。work/v-model-modifiers 提供转换函数、绑定接入、类型与初步测试；它基于 next-dev 身份修正前的旧提交。审查时发现模块增强 ExtBaseOption 的写法能通过源码类型检查，但会阻塞生产声明打包。

## 关键变更

- Core 字段 Schema 顶层新增 modelModifiers，不支持 lazy。trim 去除字符串两端空白；number 使用 parseFloat，无法转换时保留原值；非字符串保持原值，数组值逐项转换，按声明顺序执行。
- 数组配置仅作用于主 value；具名对象按 value、labelValue 和 vModelFields 的 binding 名配置，主键不随 UI 的 modelValue/checked 等属性映射改变。
- useVModel 在主值、labelField、字符串字段映射及 Ref 绑定的组件写回前转换；外部模型、回填/重置和 computed 写回不主动转换。范围拆分与 stringifyValue 序列化在转换之后执行。
- src/modelModifiers.ts 保留类型及内部转换函数，将 modelModifiers 直接声明在 ExtBaseOption 并导入对应类型，解决声明打包问题；不再用内部模块增强。根入口仅新增 ModelModifier、ModelModifiers 类型导出，不新增公共转换函数。
- 将六个功能提交移植到当前 next-dev，保留此前修复及提交身份；未重新合并源分支携带的旧修复提交。
- 手册“字段与数据模型”补充 modelModifiers 的顺序、空值、具名绑定及转换边界；API 索引、数据绑定导航、AI_GUIDE 和架构总览同步。正式文档描述当前 API，不记录迁移过程。

## 验证

- 全量 Vitest：20 文件、57 用例全部通过；修饰符专题 6 项覆盖解析、主值/标签/附加字符串及 Ref 写回、无 field 的 Ref、空值/非字符串、范围拆分/字符串序列化及外部同步。
- Core、AntDV、Element Plus 类型检查及生产构建通过，使用 Node 6 GB 堆。
- 三套生产声明 strict 消费检查：ModelModifier/ModelModifiers 导出、readonly 配置、Schema 属性提示及具名对象可用；lazy 被类型拒绝，转换辅助函数未从根入口导出。既有表格回调推导及旧配置拒绝样本一并验证。
- 两套示例 vue-tsc 通过。
- Chromium 双 UI 浏览器 8 项通过：初值保持；实际输入 trim/number 和 onUpdate 读取转换后的模型；空字符串/纯空白保留；外部赋值、setFieldsValue、resetFields 不触发修饰符。临时浏览器夹具曾因渲染函数内重复创建注册组件导致回调丢失，稳定组件身份后通过，不据此修改产品代码。
- docs:check-types 通过：217 个公开属性、17 个既有未公开属性；git diff --check 通过。未执行文档站整体构建或 build:repl。

日志及样本保存在 /workspace/test-results/antdv-superform/modifiers-*.log 和 modifiers-browser/。生产声明样本复跑需恢复到仓库根下临时目录以保持相对导入；浏览器需恢复夹具并启动 5173/5174，绝对路径随工作区调整。未覆盖的复合字段实际交互见 Checklist。
