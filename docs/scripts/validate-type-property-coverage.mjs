import { readFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const docsRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(docsRoot, "..");
const typeSource = readFileSync(join(repoRoot, "src/exaTypes.d.ts"), "utf8");

const typeFile = ts.createSourceFile(
  "exaTypes.d.ts",
  typeSource,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TS
);
const propertyNames = new Set();

// 这些属性存在于类型声明中，但运行时尚未形成公开能力，
// 不应为了通过覆盖校验而出现在面向使用者的手册正文中。
const reviewOnlyProperties = new Set([
  "advanced",
  "Card",
  "Collapse",
  "Descriptions",
  "defaultHidden",
  "dropdownProps",
  "fieldName",
  "forceRender",
  "HTML",
  "InputGroup",
  "listData",
  "modelsMap",
  "propChain",
  "refData",
  "refName",
  "Tabs",
  "TagInput",
  "TagSelect",
]);

function collectPropertyNames(node) {
  if (ts.isPropertySignature(node) && node.name) {
    const name = node.name.getText(typeFile).replace(/^['"]|['"]$/g, "");
    if (/^[A-Za-z_$][\w$]*$/.test(name)) propertyNames.add(name);
  }
  ts.forEachChild(node, collectPropertyNames);
}

collectPropertyNames(typeFile);

let manualSource = "";
function collectMarkdown(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) collectMarkdown(file);
    else if (entry.name.endsWith(".md"))
      manualSource += `\n${readFileSync(file, "utf8")}`;
  }
}

collectMarkdown(join(docsRoot, "manual"));

// 配置路径、回调签名与复合写法同样记录属性名，例如
// `attrs.labelIndex`、`onSubmitError(error: unknown)`、`current/pageSize`。
// 只读取行内代码，不把普通正文或代码示例当作属性说明。
const documentedNames = new Set();
let fence;
const proseSource = manualSource
  .split("\n")
  .filter((line) => {
    const marker = line.match(/^\s*(`{3,}|~{3,})(.*)$/);
    if (marker) {
      if (!fence) fence = marker[1];
      else if (
        marker[1][0] === fence[0] &&
        marker[1].length >= fence.length &&
        !marker[2].trim()
      )
        fence = undefined;
      return false;
    }
    return !fence;
  })
  .join("\n");
for (const match of proseSource.matchAll(/(?<!`)`([^`\n]+)`(?!`)/g)) {
  for (const name of match[1].match(/[A-Za-z_$][\w$]*/g) || []) {
    documentedNames.add(name);
  }
}
const publicProperties = [...propertyNames].filter(
  (name) => !reviewOnlyProperties.has(name)
);
const missing = publicProperties
  .filter((name) => !documentedNames.has(name))
  .sort();

if (missing.length) {
  console.error(
    `exaTypes.d.ts 中有 ${missing.length} 个属性未在手册中以配置名出现：`
  );
  console.error(missing.join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `类型属性覆盖校验通过，共 ${publicProperties.length} 个公开属性、${
      propertyNames.size - publicProperties.length
    } 个未公开属性`
  );
}
