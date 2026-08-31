# Schema 组件自动导入

`unplugin-superform-components` 在构建期扫描静态 Schema，根据 resolver 按需导入 UI 组件，并自动注册到 SuperForm。业务入口不需要手动 import 或维护 `components`。

## Vite 配置

```ts
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import SuperFormComponents, {
  createLibraryResolver,
} from "antdv-superform/unplugin/vite";

export default defineConfig({
  plugins: [
    SuperFormComponents({
      resolvers: [
        createLibraryResolver({
          from: "antdv-next",
          components: ["Rate", "Slider"],
        }),
      ],
    }),
    vue(),
  ],
});
```

业务代码只保留 Schema：

```ts
const schema = {
  subItems: [
    {
      type: "Rate",
      field: "score",
      attrs: { allowHalf: true },
    },
  ],
};
```

默认扫描 `src`，并向 `src/main.ts`、`src/main.tsx` 等常见入口注入虚拟注册模块。扫描结果只包含 resolver 能解析的名称，普通对象中的其他 `type` 不会产生导入。

## 自动生成 attrs 类型

默认在项目根目录生成 `superform-components.d.ts`：

```ts
declare module "antdv-superform" {
  interface CustomFormComponentProps {
    Rate: FormComponentProps<
      typeof import("antdv-next")["Rate"]
    >;
  }
}
```

Props 默认从组件导出自动提取。应确保声明文件被 `tsconfig.json` 包含；通常位于项目根目录时无需额外配置。

## 本地组件

自定义 resolver 可以返回命名导出或默认导出：

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

路径交给当前构建器解析，因此可以使用项目已有 alias。

## 动态 Schema

接口返回或运行时拼装的 `type` 无法在构建期识别，需要通过 `types` 声明允许列表：

```ts
SuperFormComponents({
  types: ["Rate", "Slider"],
  resolvers: [uiResolver],
});
```

`types` 与扫描结果会合并，仍然只有 resolver 成功解析的组件才会被导入。

## 其他选项

| 选项 | 默认值 | 作用 |
| --- | --- | --- |
| `dirs` | `["src"]` | Schema 扫描目录 |
| `entry` | `src/main.*` | 注入虚拟模块的入口 |
| `dts` | `superform-components.d.ts` | 声明文件路径；设为 `false` 可关闭 |
| `extensions` | Vue/TS/JS 常用扩展名 | 参与扫描的文件类型 |
| `superFormImport` | `antdv-superform` | 运行时注册函数来源 |
| `dtsModule` | `antdv-superform` | 需要扩展的类型模块 |

Rollup 和 Webpack 分别使用 `antdv-superform/unplugin/rollup` 与 `antdv-superform/unplugin/webpack`，配置结构保持一致。

## 扫描边界

插件识别对象中的静态 PascalCase 字面量，例如 `type: "Rate"`。变量、函数返回值、字符串拼接以及服务端 Schema 不会被推断，应使用 `types` 明确声明。resolver 同时承担允许列表职责，避免把按钮的 `type: "primary"` 等普通属性误识别为组件。
