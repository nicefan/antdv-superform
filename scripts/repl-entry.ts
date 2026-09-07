// REPL 静态包内的 Ant Design Vue 与此入口共享同一个 Day.js 实例。
// ConfigProvider 负责组件文案，注册 locale 负责日期面板的月份和星期名称。
import "dayjs/locale/zh-cn";

export { default } from "../packages/superform-antdv/src/index";
export * from "../packages/superform-antdv/src/index";
export { fieldComponents } from "../packages/superform-antdv/src/fieldComponents";
