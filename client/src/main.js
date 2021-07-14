import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "remixicon/fonts/remixicon.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/responsive.css";
createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
