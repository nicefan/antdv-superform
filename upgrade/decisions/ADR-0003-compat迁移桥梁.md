# ADR-0003：保留 compat 作为迁移桥梁

状态：已接受
日期：2026-09-01

## 背景

`src/compat/antdv.ts` 已经集中当前 UI 运行时依赖。若在 Adapter 基础能力尚未覆盖 Form、Table、Upload、Modal 等模块前删除该文件，会迫使工程一次性重写全部 UI 边界。

## 决策

在迁移期间保留 `compat/antdv.ts` 和 `compat/icons.ts`，由 AntDV Adapter 逐步接管其职责。只有在 P008 的依赖扫描、兼容验证和迁移记录完成后，才评估删除或缩小 compat。

## 后果

- 中间阶段允许 AntDV Adapter 继续读取 compat。
- 新增 Core 代码不得继续扩大 compat 依赖。
- compat 中剩余导出需要在每个阶段后记录，避免临时桥梁永久化。
