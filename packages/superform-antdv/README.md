# superform-antdv

SuperForm 的 AntDV Next 官方产品包，已经内置 Core。业务项目不需要另外安装或导入 `superform`。

```bash
pnpm add superform-antdv antdv-next
```

```ts
import superForm from 'superform-antdv'

superForm.initialize()
```

推荐使用 Vite 插件按 Schema 自动导入字段组件：

```ts
import SuperFormComponents from 'superform-antdv/unplugin'

SuperFormComponents({
  dirs: ['src'],
  entry: 'src/main.ts',
  dts: 'src/superform-components.d.ts',
})
```

不使用插件时，可以在 `initialize({ components })` 中提供实际使用的 AntDV 字段组件。需要快速全量登记时：

```ts
import superForm from 'superform-antdv'
import { fieldComponents } from 'superform-antdv/components'

superForm.initialize({ components: fieldComponents })
```

完整说明见[项目 README](https://github.com/nicefan/antdv-superform)。

内置按钮及内部交互图标由 Core SVG 提供，不需要直接安装图标库。业务 `icon` 配置使用 `() => VNodeChild`，例如 `icon: () => h(MyIcon)`。
