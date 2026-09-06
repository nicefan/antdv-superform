import { createApp } from "vue";
import "element-plus/dist/index.css";
import superform from "superform-element-plus";
import App from "./App.vue";

superform.initialize();
createApp(App).mount("#app");
