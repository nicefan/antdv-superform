# superform-element-plus

SuperForm 的 Element Plus 官方产品包，已经内置 Core。业务项目不需要另外安装或导入 `superform`。

```bash
pnpm add superform-element-plus element-plus
```

```ts
import superForm from 'superform-element-plus'

superForm.initialize()
```

推荐使用 Vite 插件按 Schema 自动导入字段组件：

```ts
import SuperFormComponents from 'superform-element-plus/unplugin'

SuperFormComponents({
  dirs: ['src'],
  entry: 'src/main.ts',
  dts: 'src/superform-components.d.ts',
})
```

Element Plus Schema 字段名统一移除 `El` 前缀。不使用插件时，可以在 `initialize({ components })` 中提供实际使用的字段组件；需要快速全量登记时：

```ts
import superForm from 'superform-element-plus'
import { fieldComponents } from 'superform-element-plus/components'

superForm.initialize({ components: fieldComponents })
```

完整说明见[项目 README](https://github.com/nicefan/antdv-superform)。
