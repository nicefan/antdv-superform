# Schema 组件自动导入

官方 Vite 插件在构建期扫描静态 Schema，按实际使用情况导入字段组件，并把注册代码注入应用入口。产品根入口因此不需要全量依赖所有输入组件。

## 官方产品配置

AntDV Next：

```ts
// vite.config.ts
import { defineConfig } from "vite";
import SuperFormComponents from "superform-antdv/unplugin";

export default defineConfig({
  plugins: [
    SuperFormComponents({
      dirs: ["src"],
      entry: "src/main.ts",
      dts: "src/superform-components.d.ts",
    }),
  ],
});
```

Element Plus 只需把插件入口换成：

```ts
import SuperFormComponents from "superform-element-plus/unplugin";
```

官方入口已经固定以下内容，通常无需配置：

- 运行时注册函数来自当前产品包。
- 声明合并目标与类型导入来自当前产品包。
- 官方 resolver 识别 Adapter 已声明的字段。
- Element Plus 会把 `Input` 解析为 `ElInput`，Schema 中不写 `El` 前缀。

应用入口仍要显式初始化 Adapter：

```ts
import superform from "superform-antdv";

superform.initialize();
```

插件注入的注册模块与 `initialize()` 分工不同：前者提供实际字段组件，后者绑定 UI Adapter。

## 生成的类型声明

插件默认生成 `superform-components.d.ts`，并把扫描到的字段 Props 合并到产品包类型中。应确保该文件被消费项目的 `tsconfig.json` 包含。

自动生成的声明只服务 TypeScript，不会引入运行时代码；运行时组件由同一次插件转换生成的虚拟模块登记。

## 本地业务组件

可以在官方 resolver 之后补充自定义 resolver：

```ts
SuperFormComponents({
  resolvers: [
    (type) => {
      if (type === "UserPicker") {
        return {
          from: "@/components/UserPicker.vue",
          importName: "default",
        };
      }
    },
  ],
});
```

本地路径交给 Vite 解析，可以使用项目已有 alias。需要组件读取 Schema 上下文时，应改用 `superform.registerComponent(s)` 注册项目组件，而不是把它作为普通 UI 字段自动导入。

## 动态 Schema

接口返回或运行时拼装的 `type` 无法在构建期识别，通过 `types` 明确声明：

```ts
SuperFormComponents({
  types: ["Rate", "Slider"],
});
```

`types` 与扫描结果合并。名称仍必须能被官方或自定义 resolver 解析。

## 常用选项

| 选项 | 默认值 | 作用 |
| --- | --- | --- |
| `dirs` | `["src"]` | Schema 扫描目录 |
| `entry` | `src/main.*` | 注入虚拟注册模块的应用入口 |
| `dts` | `superform-components.d.ts` | 声明文件路径；设为 `false` 可关闭 |
| `extensions` | Vue/TS/JS 常用扩展名 | 参与扫描的文件类型 |
| `types` | `[]` | 无法静态扫描的字段名称 |
| `resolvers` | `[]` | 追加第三方或本地组件解析规则 |
| `virtualId` | 默认虚拟模块名 | 多应用构建时隔离注册模块 |

Core 的底层插件还支持 `superFormImport`、`dtsModule`、`typesImport` 等 Adapter 开发参数；官方产品入口已经提供正确值，业务项目不应重复配置。

## 扫描边界

插件识别对象中的静态 PascalCase 字面量，例如 `type: "Rate"`。变量、函数返回值、字符串拼接和服务端 Schema 无法推断，应使用 `types`。

插件只提供 Vite 入口。Rollup 与 Webpack 子入口已经移除；这类工程需要自行生成注册代码或在 `initialize({ components })` 中手动提供组件。
