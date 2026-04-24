# 代码与 API 优化清单

这份清单独立于正式文档，目标是记录当前代码中命名不清、注释不足、API 设计不一致和可优化点，便于后续重构时有明确抓手。

## 1. 编码与注释可读性问题

### 1.1 源码与示例中存在大量乱码注释

涉及文件：

- `src/plugin.ts`
- `src/exaTypes.d.ts`
- `src/components/Upload.vue`
- `example/*`
- `doc/upload.md`

问题：

- 中文注释和示例文案出现明显编码异常，直接影响维护者和 AI 对语义的理解
- 很多接口说明虽然存在，但当前实际上不可读

建议：

- 统一把仓库文本文件编码校正为 UTF-8
- 优先修复 `src/exaTypes.d.ts`、`src/plugin.ts`、`doc/upload.md`

## 2. 命名不清与 API 一致性问题

### 2.1 `registComponent` 命名错误

涉及文件：

- `src/plugin.ts`
- 各示例中对应调用

问题：

- 常见英文应为 `registerComponent`
- 对外 API 一旦公开，错误拼写会长期污染使用方式

建议：

- 新增 `registerComponent` 作为正式 API
- `registComponent` 保留兼容，但标记 deprecated

### 2.2 `defineDetail` 类型过窄

涉及文件：

- `src/superDetail/index.ts`
- `src/superDetail/useDetail.ts`

问题：

- `defineDetail` 仅接受 `ExtDescriptionsOption`
- 但 `useDetail` 实际允许 `ExtDescriptionsOption | ExtFormOption`
- 对外 API 不一致，容易让类型提示误导使用者

建议：

- 让 `defineDetail` 与 `useDetail` 保持一致

### 2.3 `useButtons` 默认导出与主入口导出风格不一致

涉及文件：

- `src/superButtons/useButtons.ts`
- `src/superButtons/index.ts`

问题：

- `useButtons` 文件是默认导出，主入口再命名导出
- 风格与其他 hooks 不一致，增加阅读成本

建议：

- 改成命名导出

### 2.4 `setData` / `setPageData` / `setFieldsValue` 命名语义混乱

涉及文件：

- `src/superForm/useForm.ts`
- `src/superTable/useTable.ts`
- `src/superTable/SuperTable.vue`

问题：

- 表单和表格都存在“设置数据”的方法，但命名和行为不同
- `useForm.setData` 已废弃但仍保留，容易误用
- `useTable.setData` 实际内部调的是 `setPageData`

建议：

- 统一成清晰的公开命名，例如：
  - 表单：`setFieldsValue`
  - 表格：`setRows`
  - 查询结果：`setQueryResult`

## 3. 类型系统设计问题

### 3.1 `Obj` / `Fn` / `any` 使用过多

涉及文件：

- `types/index.d.ts`
- `src/exaTypes.d.ts`
- 几乎所有 hooks 与组件

问题：

- 当前类型系统虽然覆盖面广，但精度很低
- 大量 `Obj<any>`、`Fn<any>`、`PropType<any>` 让 IDE 提示价值下降
- AI 也难以稳定推断正确用法

建议：

- 优先为公开 API 建立强类型边界
- 从 hooks 返回值、插件配置、表格查询协议开始收敛

### 3.2 `src/exaTypes.d.ts` 过于庞大且职责混杂

问题：

- 一个文件同时承担字段类型、容器类型、按钮类型、全局泛型、模型结构
- 维护成本高，难以局部理解

建议：

- 拆分为：
  - `form-options`
  - `table-options`
  - `buttons`
  - `shared-types`
  - `model-types`

## 4. 废弃 API 清理不彻底

### 4.1 多个 deprecated 字段仍在主流程中兼容

典型项：

- `hideInForm`
- `hideInDescription`
- `hideInTable`
- `edit`
- `editMode`
- `addMode`
- `editForm`
- `searchSchema`
- `useForm.setData`

问题：

- 兼容层太厚，抬高维护复杂度
- 文档和代码需要同时解释“新写法”和“旧写法”

建议：

- 制定版本化清理计划
- 至少在文档中明确“仅保留兼容，不推荐新代码使用”

## 5. 插件与全局配置设计问题

### 5.1 `install` 声明为 `async` 但没有实际异步流程

涉及文件：

- `src/plugin.ts`

问题：

- 这会给使用者一个错误暗示：插件安装涉及异步初始化

建议：

- 移除 `async`

### 5.2 `globalConfig` 与 `globalProps` 都是可变全局单例

涉及文件：

- `src/plugin.ts`

问题：

- 多应用实例或测试环境下可能互相污染
- 配置更新没有明确生命周期

建议：

- 至少在文档中声明其为全局共享状态
- 长期建议改为基于 app context 的配置隔离

## 6. 表格 API 可优化点

### 6.1 `useQuery` 的并发控制与返回值语义不够清晰

涉及文件：

- `src/superTable/useQuery.ts`

问题：

- 重复请求时直接 `Promise.reject(() => console.warn(...)).finally()`，返回值不合理
- `reload()` 实际绑定 `throttleRequest`
- `query(true)` 被用作“强制刷新”的特殊语义，不直观

建议：

- 显式区分：
  - `reloadCurrent()`
  - `query(params)`
  - `forceReload()`
- 让重复请求返回一致的错误对象或可取消信号

### 6.2 查询结果只识别数组和 `{ records }` 两种结构

问题：

- 实际项目里常见字段差异很多
- 目前虽有 `resultTransform`，但文档和类型没有形成强约束

建议：

- 增加正式类型定义和示例
- 在文档中把“推荐协议”和“适配方式”分开说明

## 7. Upload 组件职责过重

涉及文件：

- `src/components/Upload.vue`

问题：

- 一个组件同时处理：
  - 上传
  - 删除
  - 下载
  - 预览
  - base64/text 读取
  - 提交期同步
  - 文件列表映射
- 逻辑高度集中，测试和维护成本高

建议：

- 拆分为：
  - 文件映射层
  - 上传任务层
  - 预览下载层
  - 视图层

### 7.1 `value` 与 `fileList` 双数据源容易冲突

问题：

- 当前组件同时支持 `value` 和 `fileList`
- 两者 watch 互相影响，边界复杂

建议：

- 明确单一主数据源
- 或在文档中定义优先级与推荐用法

## 8. 组件实例暴露方式不够稳

### 8.1 `register` 模式依赖可变对象拼装

涉及文件：

- `src/superForm/useForm.ts`
- `src/superTable/useTable.ts`
- `src/superTable/SuperTable.vue`

问题：

- 通过 `Object.assign`、`toRefs`、`emit('register', ...)` 动态拼接实例
- 很难形成稳定的实例类型

建议：

- 为公开实例定义显式接口
- 让 `register` 只暴露固定 shape

## 9. 文档与源码结构脱节

### 9.1 旧文档在 `doc/`，新站点在 `docs/`

问题：

- 文档源分散
- `doc/upload.md` 仍有价值，但没有正式并入站点体系

建议：

- 逐步把 `doc/` 中仍然有效的内容迁入 `docs/reference`
- 最终保留一个文档入口

## 10. 目录与示例命名问题

### 10.1 `fristTable` 拼写错误

涉及文件：

- `example/fristTable/*`

问题：

- 应为 `firstTable`

建议：

- 修正目录和引用

## 优先级建议

建议按这个顺序处理：

1. 修复编码乱码与公开 API 命名问题
2. 收敛公开类型定义与文档
3. 清理 deprecated 兼容层
4. 重构 `Upload` 与表格查询层
5. 再处理目录与内部实现风格统一
