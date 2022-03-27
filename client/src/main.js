import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "remixicon/fonts/remixicon.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/responsive.css";
import { createHead } from '@vueuse/head'
const head = createHead()
createApp(App)
  .use(store)
  .use(router)
  .use(head)
  .mount("#app");
