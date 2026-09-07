import { createApp } from "vue";
import "antdv-next/dist/antd.css";
import superForm from "superform-antdv";
import App from "./App.vue";

superForm.initialize();
createApp(App).mount("#app");
