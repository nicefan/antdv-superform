import { createHash } from "node:crypto";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const docsRoot = join(projectRoot, "docs");
const packageJson = JSON.parse(
  await readFile(join(projectRoot, "package.json"), "utf8")
);
const version = packageJson.version;

if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(version)) {
  throw new Error(`无法为非法版本号生成演练场依赖：${version}`);
}

const files = {
  "antd.js": join(projectRoot, "dist", "antd.js"),
  "antd.css": join(
    projectRoot,
    "node_modules",
    "antdv-next",
    "dist",
    "antd.css"
  ),
  "antdv-superform.js": join(projectRoot, "dist", "antdv-superform.js"),
  "style.css": join(projectRoot, "dist", "style.css"),
  "vue.runtime.esm-browser.js": join(
    projectRoot,
    "node_modules",
    "vue",
    "dist",
    "vue.runtime.esm-browser.js"
  ),
  "vue.runtime.esm-browser.prod.js": join(
    projectRoot,
    "node_modules",
    "vue",
    "dist",
    "vue.runtime.esm-browser.prod.js"
  ),
};

const localeMarker = "星期日_星期一_星期二";
const localeRegistered = await Promise.all(
  ["antd.js", "antdv-superform.js"].map((filename) =>
    readFile(files[filename], "utf8")
  )
).then((contents) =>
  contents.some((content) => content.includes(localeMarker))
);
if (!localeRegistered) {
  throw new Error("REPL 构建未包含 Day.js zh-cn locale，日期面板将回退为英文");
}

const relativePath = `repl/${version}`;
const outputDir = join(docsRoot, "public", relativePath);
await mkdir(outputDir, { recursive: true });

const hashes = {};
for (const [filename, source] of Object.entries(files)) {
  const content = await readFile(source);
  await copyFile(source, join(outputDir, filename));
  hashes[filename] = `sha256-${createHash("sha256")
    .update(content)
    .digest("base64")}`;
}

const manifestPath = join(docsRoot, "public", "repl", "versions.json");
let manifest = { latest: version, versions: [] };
try {
  manifest = JSON.parse(await readFile(manifestPath, "utf8"));
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const entry = {
  version,
  vue: packageJson.devDependencies.vue.replace(/^[^\d]*/, ""),
  path: relativePath,
  createdAt: new Date().toISOString(),
  hashes,
};
manifest.latest = version;
manifest.versions = [
  entry,
  ...manifest.versions.filter((item) => item.version !== version),
];
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`演练场依赖已生成：antdv-superform ${version}`);
