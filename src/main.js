import Vue from "vue";
import App from "./app.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import Transitions from "vue2-transitions";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Transitions);

Vue.config.productionTip = false;

console.log("store", store);
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
