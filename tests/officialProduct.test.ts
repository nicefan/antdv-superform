import { describe, expect, it, vi } from "vitest";
import { defineComponent } from "vue";

describe("官方产品初始化", () => {
  it("创建产品时不初始化 Adapter，仅由 initialize 显式锁定", async () => {
    vi.resetModules();
    const { createOfficialProduct } = await import("../src/officialProduct");
    const { defineUIAdapter, getUIAdapter } = await import("../src/adapter");
    const Input = defineComponent(() => () => null);
    const product = createOfficialProduct<"Input">(
      "test-official-product",
      (components) =>
        defineUIAdapter({
          name: "test-ui",
          uiComponents: {},
          supportedFields: ["Input"],
          fieldComponents: components,
        })
    );

    expect(() => getUIAdapter()).toThrow("尚未初始化 UIAdapter");
    expect(product.initialize({ components: { Input } })).toBe(product);
    expect(getUIAdapter().name).toBe("test-ui");
    expect(product.initialize()).toBe(product);
  });
});
