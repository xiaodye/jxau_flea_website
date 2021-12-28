import Vue from "vue";
import App from "./App.vue";

import store from "./store";
import router from "./router";

// 引入normalize.css
import "normalize.css/normalize.css";

// 引入iconfont图标
import "assets/fonts/iconfont.js";

// 全局引入axios
import axios from "axios";
// axios.defaults.baseURL = "http://192.168.137.98:8080";
// axios.defaults.baseURL = "http://192.168.137.180:8080";
// axios.defaults.baseURL = "http://192.168.137.157:8080";
axios.defaults.baseURL = "http://192.168.137.231:8080";
// axios.defaults.baseURL = "";
Vue.prototype.$http = axios;

// 全局引入vant
import Vant from "vant";
import "vant/lib/index.css";

Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  store,
  router,
  beforeCreate() {
    // 事件总线
    Vue.prototype.$bus = this;
  },
}).$mount("#app");
