import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

const workspace = process.cwd();

describe("发布声明", () => {
  it("官方 UI 产品使用独立包并内置 Core 声明", async () => {
    const packageJson = JSON.parse(
      await readFile(path.join(workspace, "package.json"), "utf8")
    );
    const antdvPackage = JSON.parse(
      await readFile(
        path.join(workspace, "packages/superform-antdv/package.json"),
        "utf8"
      )
    );
    const elementPlusPackage = JSON.parse(
      await readFile(
        path.join(workspace, "packages/superform-element-plus/package.json"),
        "utf8"
      )
    );

    expect(packageJson.name).toBe("superform");
    expect(packageJson.exports).not.toHaveProperty("./adapter/antdv");
    expect(packageJson.exports).not.toHaveProperty("./adapter/element-plus");
    for (const adapterPackage of [antdvPackage, elementPlusPackage]) {
      expect(adapterPackage.exports["."]).toEqual({
        types: "./lib/index.d.ts",
        import: "./lib/index.js",
      });
      expect(adapterPackage.exports).not.toHaveProperty("./full");
      expect(adapterPackage.exports["./components"]).toEqual({
        types: "./lib/components.d.ts",
        import: "./lib/components.js",
      });
      expect(adapterPackage.exports["./unplugin"]).toEqual({
        types: "./lib/unplugin.d.ts",
        import: "./lib/unplugin.js",
      });
      expect(adapterPackage.license).toBe("MIT");
      expect(adapterPackage.sideEffects).toEqual(["./lib/style.css"]);
      expect(adapterPackage.peerDependencies).not.toHaveProperty("superform");
      expect(adapterPackage.devDependencies.superform).toBe("workspace:*");
      expect(adapterPackage.dependencies.unplugin).toBe("^3.3.0");
    }

    const rootDeclaration = await readFile(
      path.join(workspace, "lib/index.d.ts"),
      "utf8"
    );
    const antdvDeclaration = await readFile(
      path.join(workspace, "packages/superform-antdv/lib/index.d.ts"),
      "utf8"
    );
    const elementPlusDeclaration = await readFile(
      path.join(workspace, "packages/superform-element-plus/lib/index.d.ts"),
      "utf8"
    );
    const antdvComponentsDeclaration = await readFile(
      path.join(
        workspace,
        "packages/superform-antdv/lib/components.d.ts"
      ),
      "utf8"
    );
    const elementPlusComponentsDeclaration = await readFile(
      path.join(
        workspace,
        "packages/superform-element-plus/lib/components.d.ts"
      ),
      "utf8"
    );
    expect(rootDeclaration).not.toContain("antdvAdapter");
    expect(rootDeclaration).not.toContain("elementPlusAdapter");
    expect(antdvDeclaration).toContain("antdvAdapter");
    expect(antdvDeclaration).not.toContain("fieldComponents");
    expect(antdvComponentsDeclaration).toContain("fieldComponents");
    expect(antdvDeclaration).toContain("initialize");
    expect(antdvDeclaration).toContain("SuperForm");
    expect(antdvDeclaration).not.toContain("element-plus");
    expect(antdvDeclaration).not.toMatch(/from ['"]superform(?:\/|['"])/);
    expect(elementPlusDeclaration).toContain("elementPlusAdapter");
    expect(elementPlusDeclaration).not.toContain("fieldComponents");
    expect(elementPlusComponentsDeclaration).toContain("fieldComponents");
    expect(elementPlusDeclaration).toContain("initialize");
    expect(elementPlusDeclaration).toContain("SuperForm");
    expect(elementPlusDeclaration).not.toContain("antdv-next");
    expect(elementPlusDeclaration).not.toMatch(/from ['"]superform(?:\/|['"])/);
  });

  it("unplugin 子路径指向汇总后的独立声明", async () => {
    const packageJson = JSON.parse(
      await readFile(path.join(workspace, "package.json"), "utf8")
    );
    expect(packageJson.exports["./unplugin/vite"].types).toBe(
      "./lib/vite.d.ts"
    );
    expect(packageJson.exports).not.toHaveProperty("./unplugin/rollup");
    expect(packageJson.exports).not.toHaveProperty("./unplugin/webpack");
    await expect(
      access(path.join(workspace, "lib/unplugin/rollup.js"))
    ).rejects.toThrow();
    await expect(
      access(path.join(workspace, "lib/unplugin/webpack.js"))
    ).rejects.toThrow();

    const declaration = await readFile(
      path.join(workspace, "lib/vite.d.ts"),
      "utf8"
    );
    expect(declaration).not.toContain("../src");
    expect(declaration).not.toContain("node_modules");
  });

  it("主声明不包含开发环境的类型扩展或内部依赖路径", async () => {
    const declaration = await readFile(
      path.join(workspace, "lib/index.d.ts"),
      "utf8"
    );

    expect(declaration).toContain("export declare interface UIAdapter");
    expect(declaration).toContain("export declare type UIFormComponentProps");
    expect(declaration).toContain(
      "export declare type UIContainerComponentProps"
    );
    expect(declaration).toContain("export declare type UIActionComponentProps");
    expect(declaration).toContain("export declare type UITableComponentProps");
    expect(declaration).toContain("export declare type UIModalComponentProps");
    expect(declaration).toContain("export declare type UIUploadComponentProps");
    expect(declaration).toContain("export declare interface FormSchemaProps");
    expect(declaration).toContain("export declare interface LayoutColProps");
    expect(declaration).toContain("export declare interface SuperFormConfig");
    expect(declaration).not.toContain("export declare function getUIAdapter");
    expect(declaration).not.toContain("export declare function renderUI");
    expect(declaration).not.toContain("export declare function resolveUI");
    expect(declaration).not.toContain("export declare function mapUI");
    expect(declaration).not.toContain('declare module "../src/exaTypes"');
    expect(declaration).not.toContain("declare module '../../exaTypes'");
    expect(declaration).not.toContain("from './compat/antdv'");
    expect(declaration).not.toContain("src/compat/antdv");
    expect(declaration).not.toContain("InternalFormItemProps");
    expect(declaration).not.toContain("node_modules");
  });
});
