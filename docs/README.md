# Antdv SuperForm 在线文档

这是主项目 `docs` 分支中的全新文档站，使用 VitePress 与 `@vue/repl`。

## 本地开发

```bash
pnpm --dir docs install
pnpm build:dist
pnpm docs:dev
```

`pnpm build:dist` 会在构建组件后，把同源依赖写入 `docs/public/repl/<version>/`，并更新带 SHA-256 的版本清单。旧版本目录会保留，演练场可选择组件版本。

## 发布前检查

```bash
pnpm build:dist
pnpm docs:build
```
