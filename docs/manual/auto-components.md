# unplugin 自动导入

Vite 插件扫描 Schema 中的字段名称，按需引入组件并生成类型声明。项目组件的手动登记见[自定义字段](/manual/custom-fields)。

<span id="插件接入"></span>

## 配置产品插件 {#官方产品配置}

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

## dts：生成类型声明 {#生成的类型声明}

插件默认生成 `superform-components.d.ts`，并把扫描到的字段 Props 合并到产品包类型中。应确保该文件被消费项目的 `tsconfig.json` 包含。

自动生成的声明只服务 TypeScript，不会引入运行时代码；运行时组件由同一次插件转换生成的虚拟模块登记。

<span id="字段解析与扫描"></span>

## resolvers：业务组件 {#本地业务组件}

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

本地路径交给 Vite 解析，可以使用项目已有 alias。需要显式登记组件或声明受控值协议时，使用下方的[项目组件注册](/manual/custom-fields#注册项目组件)。业务上下文通过明确的 props 和事件传递。

## types：动态字段 {#动态-schema}

接口返回或运行时拼装的 `type` 无法在构建期识别，通过 `types` 明确声明：

```ts
SuperFormComponents({
  types: ["Rate", "Slider"],
});
```

`types` 与扫描结果合并。名称仍必须能被官方或自定义 resolver 解析。

<span id="插件选项与使用范围"></span>

## 插件配置项 {#常用选项}

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

## 扫描与构建工具支持 {#扫描边界}

插件识别对象中的静态 PascalCase 字面量，例如 `type: "Rate"`。变量、函数返回值、字符串拼接和服务端 Schema 无法推断，应使用 `types`。

插件提供 Vite 入口。其他构建工具可自行生成注册代码，或通过 `initialize({ components })` 手动提供组件。



<span id="官方字段按需导入"></span>
<span id="schema-组件自动导入"></span>

<span id="项目组件注册"></span>

<span id="注册项目组件"></span>

[注册项目组件](/manual/custom-fields#注册项目组件)

<span id="补充-schema-类型"></span>

[补充 Schema 类型](/manual/custom-fields#补充-schema-类型)

<span id="与-adapter-字段的边界"></span>

[与 Adapter 字段的边界](/manual/custom-fields#与-adapter-字段的边界)

<span id="选择合适的入口"></span>

[选择合适的入口](/manual/custom-fields#选择合适的入口)


<span id="组件注册与按需导入"></span>
