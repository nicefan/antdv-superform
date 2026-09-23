import { describe, expect, it, vi } from 'vitest'
import { defineComponent } from 'vue'

describe('Adapter 字段注册', () => {
  it("手动字段组件始终优先于自动导入", async () => {
    vi.resetModules();
    const {
      defineUIAdapter,
      initializeUIAdapter,
      registerUIComponents,
      resolveUIComponent,
    } = await import("../src/adapter");
    const ManualInput = defineComponent(() => () => null);
    const AutoInput = defineComponent(() => () => null);
    const ManualRate = defineComponent(() => () => null);
    const AutoRate = defineComponent(() => () => null);

    registerUIComponents({ Input: AutoInput, Rate: AutoRate }, "auto");
    initializeUIAdapter(
      defineUIAdapter({
        name: "priority-ui",
        uiComponents: {},
        supportedFields: ["Input", "Rate"],
        fieldComponents: { Input: ManualInput },
      })
    );
    registerUIComponents({ Input: AutoInput }, "auto");
    registerUIComponents({ Rate: ManualRate }, "manual");

    expect(resolveUIComponent("Input")).toBe(ManualInput);
    expect(resolveUIComponent("Rate")).toBe(ManualRate);
  });
})
