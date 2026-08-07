# Schema 诊断

安装包附带 CLI：

```bash
npx antdv-superform diagnose-schema schema.json --type table
npx antdv-superform diagnose-schema schema.json --type form --json
```

也可以调用公共 API：

```ts
import { diagnoseSchema } from 'antdv-superform'

const diagnostics = diagnoseSchema(schema, 'table')
```

诊断级别分为 `error`、`warning` 和 `suggestion`。CLI 检测到 error 时返回非零退出码。

## AI 项目指令

```bash
npx antdv-superform init-ai
```

命令会检测已有的 AGENTS.md、CLAUDE.md、GEMINI.md、Copilot 或 Cursor 指令入口，并幂等更新组件库使用指引。
