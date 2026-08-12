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

// 这些属性存在于类型声明中，但运行时尚未形成公开能力，只在 SOURCE_REVIEW.md 跟踪，
// 不应为了通过覆盖校验而出现在面向使用者的手册正文中。
const reviewOnlyProperties = new Set([
  "advanced",
  "defaultHidden",
  "dropdownProps",
  "forceRender",
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

const reviewSource = readFileSync(join(docsRoot, "SOURCE_REVIEW.md"), "utf8");
const missingReviewRecords = [...reviewOnlyProperties]
  .filter((name) => !reviewSource.includes(`\`${name}\``))
  .sort();
const missing = [...propertyNames]
  .filter(
    (name) =>
      !reviewOnlyProperties.has(name) && !manualSource.includes(`\`${name}\``)
  )
  .sort();

if (missingReviewRecords.length) {
  console.error(
    "以下非运行时属性既未进入公开手册，也未记录在 SOURCE_REVIEW.md："
  );
  console.error(missingReviewRecords.join("\n"));
  process.exitCode = 1;
} else if (missing.length) {
  console.error(
    `exaTypes.d.ts 中有 ${missing.length} 个属性未在手册中以配置名出现：`
  );
  console.error(missing.join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `类型属性覆盖校验通过，共 ${
      propertyNames.size - reviewOnlyProperties.size
    } 个公开属性、${reviewOnlyProperties.size} 个源码审核属性`
  );
}
