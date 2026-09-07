import { promises } from "node:fs";
import path from "node:path";
import { createUnplugin } from "unplugin";
import { c as coreTypes } from "./schemaTypes.js";
const DEFAULT_VIRTUAL_ID = "virtual:superform/components";
const DEFAULT_EXTENSIONS = [".vue", ".ts", ".tsx", ".js", ".jsx", ".mts", ".mjs"];
const TYPE_PATTERN = /\btype\s*:\s*(['"`])([A-Z][\w$]*)\1/g;
function createLibraryResolver({ from, components, prefix = "" }) {
  const componentMap = Array.isArray(components) ? Object.fromEntries(components.map((name) => [`${prefix}${name}`, name])) : components;
  return (type) => {
    const importName = componentMap[type];
    return importName ? { from, importName } : void 0;
  };
}
function normalizePath(file) {
  return file.replace(/\\/g, "/");
}
function scanSchemaTypes(code) {
  const types = /* @__PURE__ */ new Set();
  for (const match of code.matchAll(TYPE_PATTERN))
    types.add(match[2]);
  return types;
}
function filterAutoImportTypes(types, adapterEnhancedTypes = []) {
  const reservedTypes = new Set(coreTypes);
  const collected = new Set(types);
  if (collected.has("TagInput"))
    collected.add("Input");
  return new Set([...collected].filter((type) => !reservedTypes.has(type)));
}
function matchesEntry(id, entry, root) {
  const relativeId = normalizePath(path.relative(root, id.split("?")[0]));
  const entries = Array.isArray(entry) ? entry : [entry || /(^|\/)src\/main\.[cm]?[jt]sx?$/];
  return entries.some((item) => {
    if (typeof item === "string")
      return relativeId === normalizePath(item);
    item.lastIndex = 0;
    return item.test(relativeId);
  });
}
async function collectFiles(directory, extensions, files) {
  let entries;
  try {
    entries = await promises.readdir(directory, { withFileTypes: true });
  } catch (error) {
    if ((error == null ? void 0 : error.code) === "ENOENT")
      return;
    throw error;
  }
  await Promise.all(
    entries.map(async (entry) => {
      if (entry.name === "node_modules" || entry.name.startsWith("."))
        return;
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        await collectFiles(file, extensions, files);
      } else if (!entry.name.endsWith(".d.ts") && extensions.has(path.extname(entry.name))) {
        files.push(file);
      }
    })
  );
}
function resolveComponents(types, resolvers) {
  const resolved = /* @__PURE__ */ new Map();
  for (const type of types) {
    for (const resolver of resolvers) {
      const result = resolver(type);
      if (result) {
        resolved.set(type, { ...result, importName: result.importName || type });
        break;
      }
    }
  }
  return resolved;
}
function identifier(type, index) {
  return `__superform_${type.replace(/\W/g, "_")}_${index}`;
}
function generateRuntimeModule(components, superFormImport = "superform") {
  const imports = [];
  const fields2 = [];
  const adapterFields = [];
  const registeredNames = /* @__PURE__ */ new Set();
  let index = 0;
  for (const [type, result] of components) {
    const registrationName = result.registrationName || type;
    if (registeredNames.has(registrationName))
      continue;
    registeredNames.add(registrationName);
    const local = identifier(type, index++);
    imports.push(
      result.importName === "default" ? `import ${local} from ${JSON.stringify(result.from)}` : `import { ${result.importName} as ${local} } from ${JSON.stringify(result.from)}`
    );
    fields2.push(
      result.model ? `${JSON.stringify(registrationName)}: { component: ${local}, model: ${JSON.stringify(result.model)} }` : `${JSON.stringify(registrationName)}: ${local}`
    );
    if (result.adapterField)
      adapterFields.push(JSON.stringify(registrationName));
  }
  return [
    `import { registerAutoImportedComponents as __registerAutoImportedComponents } from ${JSON.stringify(
      superFormImport
    )}`,
    ...imports,
    `export const components = { ${fields2.join(", ")} }`,
    `__registerAutoImportedComponents(components, [${adapterFields.join(", ")}])`
  ].join("\n");
}
function generateDts(components, dtsModule = "superform", typesImport = dtsModule) {
  const fields2 = [...components].map(([type, result]) => {
    const props = result.props ? `import(${JSON.stringify(result.props.from || result.from)})[${JSON.stringify(result.props.name)}]` : `FormComponentProps<typeof import(${JSON.stringify(result.from)})[${JSON.stringify(result.importName)}]>`;
    return `    ${JSON.stringify(type)}: ${props}`;
  });
  return [
    "/* 此文件由 unplugin-superform-components 自动生成，请勿手动修改。 */",
    `import type { FormComponentProps } from ${JSON.stringify(typesImport)}`,
    `import ${JSON.stringify(dtsModule)}`,
    "",
    `declare module ${JSON.stringify(dtsModule)} {`,
    "  interface CustomFormComponentProps {",
    ...fields2,
    "  }",
    "}",
    "",
    "export {}",
    ""
  ].join("\n");
}
async function writeIfChanged(file, content) {
  let current;
  try {
    current = await promises.readFile(file, "utf8");
  } catch {
    current = void 0;
  }
  if (current === content)
    return;
  await promises.mkdir(path.dirname(file), { recursive: true });
  await promises.writeFile(file, content, "utf8");
}
const unplugin = createUnplugin((options, meta) => {
  let root = path.resolve(options.root || process.cwd());
  let resolved = /* @__PURE__ */ new Map();
  const extensions = new Set(options.extensions || DEFAULT_EXTENSIONS);
  const dtsFile = options.dts === false ? void 0 : options.dts || "superform-components.d.ts";
  const virtualId = options.virtualId || DEFAULT_VIRTUAL_ID;
  const resolvedVirtualId = `\0${virtualId}`;
  const scan = async () => {
    const files = [];
    for (const dir of options.dirs || ["src"]) {
      await collectFiles(path.resolve(root, dir), extensions, files);
    }
    const types = new Set(options.types || []);
    await Promise.all(
      files.map(async (file) => {
        const code = await promises.readFile(file, "utf8");
        scanSchemaTypes(code).forEach((type) => types.add(type));
      })
    );
    resolved = resolveComponents(filterAutoImportTypes(types, options.enhancedTypes), options.resolvers);
    if (dtsFile) {
      const adapterFields = /* @__PURE__ */ new Set([
        ...options.enhancedTypes || [],
        ...options.resolvers.flatMap((resolver) => resolver.adapterFields || [])
      ]);
      const customComponents = new Map([...resolved].filter(([type]) => !adapterFields.has(type)));
      await writeIfChanged(
        path.resolve(root, dtsFile),
        generateDts(customComponents, options.dtsModule, options.typesImport)
      );
    }
  };
  return {
    name: "unplugin-superform-components",
    enforce: "pre",
    async buildStart() {
      await scan();
    },
    resolveId(id) {
      if (id === virtualId)
        return resolvedVirtualId;
    },
    load(id) {
      if (id === resolvedVirtualId)
        return generateRuntimeModule(resolved, options.superFormImport);
    },
    transform(code, id) {
      if (!matchesEntry(id, options.entry, root) || code.includes(virtualId))
        return;
      return `import ${JSON.stringify(virtualId)}
${code}`;
    },
    watchChange: meta.framework === "vite" ? void 0 : scan,
    vite: {
      configResolved(config) {
        root = path.resolve(options.root || config.root);
      },
      async handleHotUpdate(ctx) {
        if (!extensions.has(path.extname(ctx.file)) || ctx.file.endsWith(".d.ts"))
          return;
        await scan();
        const virtualModule = ctx.server.moduleGraph.getModuleById(resolvedVirtualId);
        if (virtualModule) {
          ctx.server.moduleGraph.invalidateModule(virtualModule);
          return [...ctx.modules, virtualModule];
        }
      }
    }
  };
});
const createSuperFormComponents = unplugin.vite;
const fields = [
  "Input",
  "TextArea",
  "InputNumber",
  "InputOTP",
  "InputPassword",
  "InputSearch",
  "AutoComplete",
  "Cascader",
  "ColorPicker",
  "Select",
  "Radio",
  "RadioGroup",
  "Checkbox",
  "CheckboxGroup",
  "DatePicker",
  "DateRangePicker",
  "DateMonthPicker",
  "DateQuarterPicker",
  "DateWeekPicker",
  "DateYearPicker",
  "TimePicker",
  "TimeRangePicker",
  "TreeSelect",
  "Switch",
  "Rate",
  "Mentions",
  "Segmented",
  "Slider",
  "Transfer"
];
function createAntdvResolver() {
  const resolver = (type) => fields.includes(type) ? {
    from: "antdv-next",
    importName: type,
    adapterField: true,
    registrationName: type
  } : void 0;
  resolver.adapterFields = [...fields];
  return resolver;
}
const antdvResolver = createAntdvResolver();
function SuperFormComponents(options = {}) {
  return createSuperFormComponents({
    ...options,
    superFormImport: options.superFormImport || "superform-antdv",
    dtsModule: options.dtsModule || "superform-antdv",
    typesImport: options.typesImport || "superform-antdv",
    resolvers: [createAntdvResolver(), ...options.resolvers || []]
  });
}
export {
  antdvResolver,
  createAntdvResolver,
  createLibraryResolver,
  SuperFormComponents as default
};
