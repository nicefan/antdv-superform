> 最终状态：已完成（2026-09-16 用户明确确认）。正式文档已同步，见 [完成归档](../ACCEPTED-2026-09-16.md)。以下保留当时的实施过程与待办表述作为历史，不再代表活动状态；本次未执行测试或构建。

# T004：SuperDetail动态schema

创建日期：2026-09-12
状态：已实现，待人工验收
人工验收：待确认

## 需求与授权

移植 main 的动态 Schema 替换与旧模型清理。
用户已明确授权“好的先拆成三个任务并执行”。来源为 origin/main 的相关修复，目标为当前 next-doc；采用逻辑移植，不整批合并提交。

## 范围与设计影响

监听 schema prop 整体替换并重建模型；无 subItems 时清理模型；通过选中数据源的整体 unref 保持 props.dataSource 优先于 Schema dataSource。

保留命令式 setOption/setData；不改变 Form 模型初始化，不回退诊断导入路径，不引入 UI 依赖。

## 实施进度

- [x] 完成范围内代码调整。

仅调整 SuperDetail.vue：监听 schema 整体替换，统一选中数据源监听，无 subItems 时清空模型；setOption 同样经过数据源优先级选择。

- [ ] 人工确认完成。
- [ ] 人工验收后同步必要正式文档。

## 建议验证（未编写、未执行）

替换 schema 后仅显示新字段；移除 schema/subItems 后不残留旧详情；props.dataSource 与 schema.dataSource 同时存在时 props 优先；对象/Ref 数据源切换正确；setOption/setData 仍可用。

按全局约定，本轮不主动新增或修改单元测试、不运行测试、typecheck、install 或 build。建议后续执行类型检查 `pnpm run type-check`，并按上述场景人工验证；如需单元测试，先由用户授权补充相应场景用例后再运行。

## 待同步文档

SuperDetail 动态配置与数据源说明（人工验收后再同步）。

实施授权不等于任务完成验收；确认前仅维护本任务记录。
