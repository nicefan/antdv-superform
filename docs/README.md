# SuperForm 在线文档

这是主项目 `next-doc` 分支中的文档站，使用 VitePress 与 `@vue/repl`。

在线 REPL 示例源码按分类存放在 `repl-examples/`，目录元数据位于 `.vitepress/components/exampleCatalog.json`；不要再把 Vue 源码内嵌到目录 TypeScript 文件中。

`/playground` 与 `/playground-element-plus` 分别使用 AntDV 和 Element Plus 产品资源；执行 `pnpm build:repl` 会同步生成两个产品的 REPL bundle。

## 本地开发

```bash
pnpm --dir docs install
pnpm build:repl
pnpm docs:dev
```

`pnpm build:repl` 会先在根目录 `.repl-dist/` 生成临时 bundle，再把同源依赖写入 `docs/public/repl/<version>/`，并更新带 SHA-256 的版本清单。各版本目录分别保存，演练场可选择组件版本。

## 发布前检查

```bash
pnpm build:repl
pnpm docs:build
```

## 示例与源码联调

根目录 `pnpm dev:antdv` / `pnpm dev:element-plus` 分别启动两套源码 example，各一个入口，按基础表单、字段联动、容器、表格、上传弹窗、扩展和综合示例分组。右侧观察区和底部测试区可收缩，承载开发、演示与人工验证。

文档 REPL 使用 public/repl 内的版本产物，不会随源码自动更新。修改组件能力后需在发布流程中重新生成 REPL 产物再验收；修改 Markdown 不等于在线资源已同步。依赖已有时无需重复 install。
