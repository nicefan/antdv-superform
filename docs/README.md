# SuperForm 在线文档

这是主项目 `next-doc` 分支中的文档站，使用 VitePress 与 `@vue/repl`。

在线 REPL 示例源码按分类存放在 `repl-examples/`，目录元数据位于 `.vitepress/components/exampleCatalog.json`；不要再把 Vue 源码内嵌到目录 TypeScript 文件中。

`/playground` 与 `/playground-element-plus` 分别使用 AntDV 和 Element Plus 产品资源；执行 `pnpm build:dist` 会同步生成两个产品的 REPL bundle。

## 本地开发

```bash
pnpm --dir docs install
pnpm build:dist
pnpm docs:dev
```

`pnpm build:dist` 会在构建组件后，把同源依赖写入 `docs/public/repl/<version>/`，并更新带 SHA-256 的版本清单。各版本目录分别保存，演练场可选择组件版本。

## 发布前检查

```bash
pnpm build:dist
pnpm docs:build
```
