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
          components: {},
          fields: { Input: { component: "Input" } },
          fieldComponents: components,
        })
    );

    expect(() => getUIAdapter()).toThrow("尚未初始化 UIAdapter");
    expect(product.initialize({ components: { Input } })).toBe(product);
    expect(getUIAdapter().name).toBe("test-ui");
    expect(product.initialize()).toBe(product);
    expect(() => product.initialize({ components: { Input } })).toThrow(
      "不能再追加字段组件"
    );

    const otherProduct = createOfficialProduct<"Input">(
      "other-official-product",
      (components) =>
        defineUIAdapter({
          name: "other-ui",
          components: {},
          fields: { Input: { component: "Input" } },
          fieldComponents: components,
        })
    );
    expect(() => otherProduct.initialize()).toThrow(
      "不能再初始化 'other-official-product'"
    );
  });
});
