# AI 编码指引

SuperForm Core 包随版本发布 `AI_GUIDE.md` 和项目指令初始化 CLI。AI 应读取当前安装版本附带的指南，而不是复制一份容易过期的 API 摘要。

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

## 当前初始化模型

官方产品导入时不会自动执行：

```ts
import superform from "superform-antdv";

superform.initialize();
superform.configure({
  schemaDiagnostics: import.meta.env.DEV,
  dictApi,
  defaultProps,
});
superform.registerComponents({ UserPicker });
```

字段组件通过 Vite 插件、`initialize({ components })` 或 `/components` 全量入口提供。项目业务组件只使用 `registerComponent(s)`。

## 公共导入

运行时 API 和类型都从所选产品包根入口导入：

```ts
import {
  SuperButtons,
  SuperDetail,
  SuperForm,
  SuperTable,
  defineDetail,
  defineForm,
  defineTable,
  diagnoseSchema,
  useButtons,
  useDetail,
  useForm,
  useModal,
  useModalForm,
  useTable,
} from "superform-antdv";
```

Element Plus 项目改用 `superform-element-plus`。第三方 Adapter 开发才直接导入 `superform` 和 `superform/sdk`。

## 生成 Schema 的顺序

1. 确认页面是 Form、Table、Detail 还是 ModalForm。
2. 从业务接口类型确定 `field`、`rowKey` 和请求参数。
3. 只使用当前 Core 或 Adapter 已声明的 `type`。
4. 复用项目字典、权限、上传和默认配置。
5. 只添加覆盖默认行为所需的 `attrs`。
6. 明确动态回调在当前场景可读取的 effectData。
7. 对 CRUD、并发查询和 Upload 补充失败路径。
8. 运行 Schema 诊断、TypeScript 和相关测试。

## 重要边界

- UI 字段使用真实组件名：`TextArea`、`DateRangePicker`、`TimeRangePicker`、`RadioGroup`、`CheckboxGroup`。
- Element Plus Schema 名称去掉 `El` 前缀。
- `useForm` 只接收 Schema；外部对象通过 `dataSource` 绑定。
- `query()` 回第一页，`reload()` 保留分页，`goPage()` 更新页码后请求。
- `apis.query` 第二参数为 `{ signal }`，连续查询只有最后一次响应生效。
- 项目组件不会收到 Core 内部 `option`、`model`、`effectData`。
- `Ext*` 前缀和旧组件注册方法不再兼容。

完整且可机读的版本规则以安装包中的 `AI_GUIDE.md` 为准；本页只说明如何把它接入项目。
