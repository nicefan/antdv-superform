import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const docsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const manifest = JSON.parse(await readFile(join(docsRoot, 'public/repl/versions.json'), 'utf8'))

if (!manifest.versions.some((item) => item.version === manifest.latest)) {
  throw new Error(`版本清单的 latest 不存在：${manifest.latest}`)
}

for (const entry of manifest.versions) {
  for (const [filename, expected] of Object.entries(entry.hashes)) {
    const content = await readFile(join(docsRoot, 'public', entry.path, filename))
    const actual = `sha256-${createHash('sha256').update(content).digest('base64')}`
    if (actual !== expected) throw new Error(`${entry.version}/${filename} 的 SHA-256 不匹配`)
  }
}

console.log(`演练场依赖校验通过，共 ${manifest.versions.length} 个版本`)
