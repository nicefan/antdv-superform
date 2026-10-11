# v-model 修饰符

状态：已实现，待仓库完整回归。

## 范围

- Core Schema 新增 `modelModifiers`，不支持 `lazy`。
- 支持 `trim`、`number` 两个写回修饰符。
- 数组配置仅作用于主 `value`；对象配置可按 `value`、`labelValue` 及 `vModelFields` 的具名 binding 分别配置。
- 修饰符只处理组件 `onUpdate:*` 写回，不主动转换外部 model → 组件的同步值。
- `number` 使用 `parseFloat` 语义，无法转换时保留原值；数组值逐项处理。

## 实现

- 新增 `src/modelModifiers.ts`，集中定义类型、解析与值转换逻辑，并扩展 `ExtBaseOption.modelModifiers`。
- `src/utils/useVModel.ts` 在主值、`labelField`、字符串路径及 Ref 形式的 `vModelFields` 写回前统一执行修饰符。
- UI Adapter 不参与值转换，不新增事件协议或 `lazyEvent`。
- 根入口导出 `ModelModifier`、`ModelModifiers` 类型。

## 验证

- 新增 `tests/modelModifiers.test.ts`，覆盖 `trim`、`number`、数组值、主值/具名 binding 写回以及外部赋值不主动转换。
- 已做独立 TypeScript 编译检查，确认模块增强和改动代码的类型关系可成立。
- 当前执行环境没有仓库依赖，尚未执行完整 `pnpm test`、`pnpm type-check`；后续在完整工作区回归。
