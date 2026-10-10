# AI 编码指引

SuperForm Core 包提供 `AI_GUIDE.md` 和项目指令初始化 CLI。让 AI 读取当前安装版本附带的指南，并补充项目业务上下文。

## 初始化项目指令

官方产品包用户按需安装 Core 开发依赖：

```bash
pnpm add -D superform
npx superform init-ai
```

命令会检测并更新已有的 `AGENTS.md`、`CLAUDE.md`、`GEMINI.md`、Copilot 或 Cursor 指令入口。

- 不覆盖既有项目约束，只维护 SuperForm 自己的标记区。
- 没有检测到入口时不创建文件，而是输出可手工添加的提示词。
- 重复运行只更新现有标记区，不重复追加。
- 生成的指引要求 AI 读取 `node_modules/superform/AI_GUIDE.md`。

## 给 AI 的项目上下文

除了初始化命令，项目自身还应明确这些业务事实：

- 使用 `superform-antdv` 还是 `superform-element-plus`。
- 字典、权限、上传和分页接口的实际契约。
- 项目注册了哪些业务字段及对应 Props。
- 是否启用 Vite Schema 组件自动导入。
- 业务命名、目录、测试与代码风格约束。

不要把密钥、生产地址或内部账号写入 AI 指令。





## 生成 Schema 的顺序

1. 确认页面是 Form、Table、Detail 还是 ModalForm。
2. 从业务接口类型确定 `field`、`rowKey` 和请求参数。
3. 只使用当前 Core 或 Adapter 已声明的 `type`。
4. 复用项目字典、权限、上传和默认配置。
5. 只添加覆盖默认行为所需的 `attrs`。
6. 明确动态回调在当前场景可读取的 effectData。
7. 对 CRUD、并发查询和 Upload 补充失败路径。
8. 按项目约定和授权执行 Schema 诊断、TypeScript 或相关测试，不将未执行的检查描述为通过。

## 查询页面生成约定

- 分页及查询转换器放在 SuperTable 的 `attrs`，全局默认值放在 `defaultProps.SuperTable` 的同名扁平属性中；`beforeQuery/afterQuery` 保留在根 Schema。
- 列筛选排序默认不传给查询。需要远程处理时配置 `attrs.filterSortTransform` 函数，局部 `false` 关闭全局默认；保存的转换结果由查询和导出共用。
- 请求分页使用 `attrs.pageTransform`，结果结构使用 `attrs.resultTransform`；响应先转换，再交给 `afterQuery` 处理业务。两套 UI 的远程排序列使用各自的原生配置。
- `getQueryParams()` 返回当前搜索、tabs、动态参数及保存的筛选排序条件的副本，不含分页、临时参数或 `beforeQuery` 加工。导出时直接读取，无需重新转换。
- 统一 `onTableChange` 已驱动分页和远程筛选排序查询，事件及分页通知回调不要重复调用 `query/reload`。

## 配套参考

- [安装与初始化](/manual/installation)
- [API 索引](/api)
- [unplugin 自动导入](/manual/auto-components)
- [Schema 诊断](/manual/schema-diagnostics)
- [SuperTable 查询与转换](/manual/super-table#查询参数与转换)
- [SuperTable 全局默认属性](/manual/global-config#supertable-默认属性)
- [筛选排序与接口转换示例](/examples?example=table-query-transform)

具体 API 与规则以安装包附带的 `AI_GUIDE.md` 和对应手册章节为准。

<!-- 章节定位标识。 -->
<span id="当前初始化模型"></span>
<span id="公共导入"></span>
<span id="重要边界"></span>
