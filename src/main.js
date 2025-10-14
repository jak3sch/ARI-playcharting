import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import router from "@/js/router.js";

const app = createApp(App);

app.use(VueAxios, axios);
app.use(router);
app.mount("#app");
