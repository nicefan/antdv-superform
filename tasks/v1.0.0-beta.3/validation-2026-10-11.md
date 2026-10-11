# 2026-10-11 测试及修复结果

分支：`next-dev`；基线提交：`ff912d3`，最终验证包含本次未提交修复。依据本阶段 CHECKLIST 执行。已发现的运行时、声明、示例类型及既有测试失败均已修复并复验；完整 Checklist 仍包含未覆盖项。运行时修复与阶段记录已提交；其后按用户要求补充手册属性说明及覆盖检查。

## 修复内容

| 问题与修复前复现 | 当前处理及回归 |
| --- | --- |
| 两套 UI 的异步 useDetail 注册前 setData 被 Schema 初值覆盖；Schema 延迟 80ms 返回时显示 schema，而不是 before-register | Hook 保存加载期间最后一次显式写入，在 Schema 数据源监听完成后恢复；注册前和注册后加载期间写入的两项单测、双 UI 浏览器复现均通过 |
| Form 的业务 onSubmit 与注册上传任务并发，回调读取到 waiting 文件 | 提交先等待注册任务，再调用 onSubmit；两套 UI 调用顺序为 upload → onSubmit-order → submit（夹具业务日志）→ submit-resolved，回调读取 status=done；上传失败不调用业务回调，恢复后重试成功 |
| Element Plus 默认树形子行无法展开，点击两次仍 aria-expanded=false、Child 为 display:none | 原生受控展开键转为字符串，与原生树形状态键一致；默认展开、手动折叠/展开、子行隐藏规则阻止保存及取消保持原数据通过 |
| Element Plus 查询及 ignoreRules 的 FormItem 上下间距为 0px，要求 6px | 恢复 scoped margin 与嵌套 FormItem 变量；实际计算样式上下均为 6px，普通行编辑回归通过；完整 size/嵌套/普通表单隔离组合仍待验收 |
| Element Plus 清除 maxHeight 后仍残留 max-height:281px | Adapter 无高度约束时传空字符串，让原生表格重置内联高度；清除后恢复自然高度 840px，大小/空数据切换、重新启用及卸载/挂载通过；同样处理 height 清除 |
| Core/AntDV 生产声明 onTableChange(change) 参数报 TS7006 | 映射类型移除再显式合入 TableSchemaProps，保留标准事件属性；Core、AntDV、Element Plus 三套生产声明 strict 消费均通过，并用预期类型错误确认回调参数未退化为 any |
| AntDV 示例旧根级 pagination、InputSearch loading 传 Ref<boolean> | pagination 移入 attrs；loading 经动态 attrs 返回 boolean，保留响应式更新；两套示例 vue-tsc 均通过 |
| 既有 useQuery、InputGroup、ElementActionGroup 三项单测失败 | 迁移旧分页位置；InputGroup setup 在 app.runWithContext 的有效注入上下文中调用；修正直接 VNode 插槽访问。原有 49 项全部通过，新增异步详情注册回归 2 项 |

## 自动检查

| 检查 | 结果 |
| --- | --- |
| pnpm 8.15.9 冻结安装 | 通过，锁文件未变；默认 pnpm 11 不支持 lockfile v6 |
| Core、AntDV、Element Plus 类型检查及生产构建 | 通过，构建使用 Node 6 GB 堆；默认 2 GB 堆曾在 AntDV 声明生成时 OOM |
| 两套示例 vue-tsc | 均通过 |
| 最终全量 Vitest | **19 文件、51 用例全部通过** |
| 三套生产声明 strict 消费 | 均通过：语言导出及部分配置、SwitchFieldOption/SelectFieldOption 别名、查询转换器、分页回调、resetFields、onTableChange 推导；确认根级 pagination、tableApiSetting、嵌套默认 attrs、useForm.setData 被拒绝 |
| git diff --check | 通过 |

按 Core → AntDV → Element Plus 顺序构建后验证生产声明。未执行 build:repl、全量废弃配置文档清理或真实后端联调。

## 浏览器辅助人工验收

Chromium 151；主交互视口 1500/1600×1000/1100。通过可见按钮、输入、分页、文件选择和弹窗操作，对演示未覆盖配置使用临时 Vue 页面接入当前产品源码、原生 UI 样式及模拟 API。它不替代真人视觉审查、操作系统输入法或真实后端联调。

**最终主验收 63/63 通过**，四组结果为 round2-stable 26/26、round3-complete 18/18、round4-verified 8/8、round5-verified 11/11。原修复前主结果为 59/63；原始失败证据仍保存在产物目录。独立提交顺序、失败重试、树形展开、ignoreRules/布局和高度检查均通过，不重复计入 63 项。AntDV 树形回归中按行号定位误读动态测量行，改为稳定 data-row-key 后通过；该脚本定位问题不计为产品缺陷。

已覆盖：

- 两套 UI 的对象/同步/异步 Schema 初始数据、详情/表格 Ref 替换及 setData、注册前写入；默认/独立详情字段，当前记录及 API 数据优先级，切换记录与销毁重开，分区样式开关。
- destroyOnClose 多次打开的数据/标题及 afterClose 隔离；校验/onSubmit/onOk 原始失败通知一次、弹窗保留及重试，打开参数覆盖通知回调；打开弹窗语言切换保持值和显式标题。
- 原生单列排序/取消及一次请求、筛选保持/清空、转换器关闭无额外请求；params 替换/删除、导出副本隔离、结果钩子顺序、快速翻页取消及过期响应、失败保留数据、临时条件不进入 getter。
- Element Plus 分页六种位置/none、默认位置及 16px 间距、上下双分页同步、条数变更回第一页、受控回写无重复请求；双 UI viewport/parent 随视口/真实父容器变化及隐藏表头配置。
- 普通行独立校验/保存/取消、失败草稿保留及重试、singleEdit 刷新成功退出；双 UI 树形子行隐藏字段规则阻止保存，取消保持原数据。
- 五种上传模式、连续完成提交不重复上传/删除、不触发原生 POST；异步选入拒绝、自动失败保留及原异常、数量/重名限制、单文件替换、accept 空白及大写扩展名、取消删除；提交成功及失败时业务回调顺序。
- colProps.span 优先级、ignoreRules 必填标记/自动与显式校验、Element Plus span:auto 剩余空间、查询及简化表单 6px 实际间距。
- 部分按钮全局/局部覆盖、权限隐藏/禁用、菜单值及 tooltip；多实例确认/信息框 update/destroy、异步失败重试；标签聚焦/失焦/Enter、合成 composing 保护及原节点保持、单选重点击保持。

两套 UI 各 10 个演示页面加载检查及此前 12 项查询/表单交互也通过。favicon 404 单独记录，不计业务失败。部分失败/取消场景主动注入异常，结果需结合预期判断，不能据日志出现 error 判为失败。

仍需验收：复杂多列/嵌套字段及回调共存、转换器/全局默认完整组合、远程索引全部失败与末页修正；行编辑并发/只读/动态规则、保存成功但刷新失败及本地页草稿；上传图片/下载/file 插槽、读取失败、迟到结果及批量删除部分失败；完整语言/pending/草稿/已有错误切换、真实中文输入法及窄容器；按钮权限/插槽/冒泡、取消/销毁 pending、详情插槽/布局/打开配置覆盖、高度及双分页组合、subSpan:auto、各 size/嵌套表单间距隔离。综合项保留待办，不据局部通过宣称整份清单通过。

## 命令与证据

```sh
NODE_OPTIONS=--max-old-space-size=6144 npx --yes pnpm@8.15.9 build
node node_modules/vitest/vitest.mjs run --threads false
node node_modules/vue-tsc/bin/vue-tsc.js --noEmit -p example-antdv/tsconfig.json
node node_modules/vue-tsc/bin/vue-tsc.js --noEmit -p example-element-plus/tsconfig.json
```

示例首次 dev 启动需在各示例 node_modules 添加本地 superform 链接才能解析配置期依赖；未改 package.json/锁文件，此环境设置仍保留，不能据此判定全新安装开箱启动通过。

[最终单测日志](/workspace/test-results/antdv-superform/fix-tests-final.log)、[构建日志](/workspace/test-results/antdv-superform/fix-build.log)、[63 项回归结果](/workspace/test-results/antdv-superform/fix-regression/results.json)、[提交顺序](/workspace/test-results/antdv-superform/fix-regression/submit-order.json)、[提交失败重试](/workspace/test-results/antdv-superform/fix-regression/submit-failure.json)、[树形展开](/workspace/test-results/antdv-superform/fix-regression/tree-probe.json)、[间距及 ignoreRules](/workspace/test-results/antdv-superform/fix-regression/ignore-layout.json)、[高度回归](/workspace/test-results/antdv-superform/fix-regression/height-results.json)。

修复后脚本、日志、声明消费样本及截图在 /workspace/test-results/antdv-superform/fix-regression；修复前脚本和夹具在 manual-acceptance 目录。复跑需恢复夹具到仓库根、HTML 到对应 example，使用 5173/5174；绝对工作区路径需随迁移调整。声明样本需放回仓库根下临时目录以保持相对导入。临时夹具验收结束后移除。源码及阶段记录一并提交。

## 文档属性覆盖补查

用户确认处理推送前检查发现的 20 项缺漏后，按源码与现有手册核对并完成调整：

- 8 项已在行内代码的配置路径、复合写法或回调签名中出现：children、fileList、labelIndex、onShowSizeChange、onSubmitError、pageSize、singleEdit、uploadMode。检查脚本现在按完整标识符识别，而非要求属性名独占一对反引号；不会把普通正文、代码示例或相似名称视为覆盖。
- 7 个公开组件名称已有说明但未使用行内代码标记：CardList、CollapseList、GroupList、InputList、TabList、Table、Upload。统一选型表及介绍中的配置名称格式。
- 补充 afterClose、maskClosable、records、total、validateTrigger 的作用和配置位置；同时完善上传 fileList 两种用途及 onSubmitError 的错误阶段、通知与重试语义。未新增豁免属性。

最终 docs:check-types 通过：216 个公开属性、17 个既有未公开属性。覆盖规则的五个隔离检查通过：路径/签名可识别，普通正文/代码示例/相似名称不误报通过，更长闭合围栏不影响后续正文。node --check 与 git diff --check 通过。此轮只修改手册、检查脚本及本记录，未重跑业务构建和浏览器交互，也未执行完整文档站构建。

[文档覆盖日志](/workspace/test-results/antdv-superform/docs-coverage-fixed.log)、[检查规则验证](/workspace/test-results/antdv-superform/docs-coverage-probes.json)。基线原有 20 项检查结果仍保存在 push-docs-check-types.log 与 push-docs-check-baseline.log。当前仓库未启用 core.hooksPath，未修改或跳过任何 Git hook。
