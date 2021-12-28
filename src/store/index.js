import Vue from "vue";
import Vuex from "vuex";

import moudleUser from "./user";
import moudleCart from "./cart";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    m_user: moudleUser,
    m_cart: moudleCart,
  },
});
