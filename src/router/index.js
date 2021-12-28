import Vue from "vue";
import VueRouter from "vue-router";

import Home from "pages/Home.vue";
import Publish from "pages/Publish.vue";
// import Cart from "pages/Cart.vue";
import User from "pages/User.vue";

import Login from "pages/Login";
import Register from "pages/Register";

import SearPage from "pages/home/SearPage.vue";
import DetailPage from "pages/home/DetailPage.vue";
import ResPage from "pages/home/ResPage.vue";

import MyPublish from "pages/user/MyPublish";
import MyCollect from "pages/user/MyCollect";
import MySale from "pages/user/MySale";
import MyBuy from "pages/user/MyBuy";
import AddressPage from "pages/user/AddressPage";
import HistoryPage from "pages/user/HistoryPage";
import ProfilePage from "pages/user/ProfilePage";
import PsdPage from "pages/user/PsdPage";
// import ManagerPage from "pages/user/ManagerPage";
import MsgPage from "pages/user/MsgPage";
import FindPsd from "pages/user/FindPsd";

import store from "../store/index";
import { Toast } from "vant";
Vue.use(Toast);

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "hash",
  routes: [
    {
      path: "/",
      redirect: "/login",
    },

    // 导航栏
    {
      name: "home",
      path: "/home",
      component: Home,
      meta: {
        showTabBar: true,
        keepAlive: true,
      },
    },
    {
      path: "/publish",
      component: Publish,
      meta: {
        showTabBar: true,
      },
      beforeEnter(to, from, next) {
        if (!store.state.m_user.userInfo.state) {
          Toast("游客不能发布商品，请登录！");
        } else {
          next();
        }
      },
    },

    // {
    //   path: "/cart",
    //   component: Cart,
    //   meta: {
    //     showTabBar: true,
    //   },
    //   beforeEnter(to, from, next) {
    //     if (!store.state.m_user.userInfo.state) {
    //       Toast("请登录查看购物车！");
    //     } else {
    //       next();
    //     }
    //   },
    // },

    {
      path: "/user",
      component: User,
      meta: {
        showTabBar: true,
        keepAlive: true,
      },
    },

    // home
    {
      path: "/searpage",
      component: SearPage,
    },
    {
      path: "/detailpage",
      component: DetailPage,
    },
    {
      path: "/respage",
      component: ResPage,
    },

    // user page
    {
      path: "/addresspage",
      component: AddressPage,
      beforeEnter(to, from, next) {
        if (!store.state.m_user.userInfo.state) {
          Toast("请登录！");
        } else {
          next();
        }
      },
    },
    {
      path: "/mypublish",
      component: MyPublish,
      beforeEnter(to, from, next) {
        if (!store.state.m_user.userInfo.state) {
          Toast("请登录！");
        } else {
          next();
        }
      },
    },
    {
      path: "/mycollect",
      component: MyCollect,
      beforeEnter(to, from, next) {
        if (!store.state.m_user.userInfo.state) {
          Toast("请登录！");
        } else {
          next();
        }
      },
    },
    {
      path: "/mysale",
      component: MySale,
      beforeEnter(to, from, next) {
        if (!store.state.m_user.userInfo.state) {
          Toast("请登录！");
        } else {
          next();
        }
      },
    },
    {
      path: "/mybuy",
      component: MyBuy,
      // beforeEnter(to, from, next) {
      //   if (!store.state.m_user.userInfo.state) {
      //     Toast("请登录！");
      //   } else {
      //     next();
      //   }
      // },
    },

    {
      path: "/historypage",
      component: HistoryPage,
      beforeEnter(to, from, next) {
        if (!store.state.m_user.userInfo.state) {
          Toast("请登录！");
        } else {
          next();
        }
      },
    },
    {
      path: "/profilepage",
      component: ProfilePage,
      beforeEnter(to, from, next) {
        if (!store.state.m_user.userInfo.state) {
          Toast("请登录！");
        } else {
          next();
        }
      },
    },
    {
      path: "/psdpage",
      component: PsdPage,
      beforeEnter(to, from, next) {
        if (!store.state.m_user.userInfo.state) {
          Toast("请登录！");
        } else {
          next();
        }
      },
    },

    // {
    //   path: "/managerpage",
    //   component: ManagerPage,
    //   beforeEnter(to, from, next) {
    //     if (store.state.m_user.userInfo.state == 4) {
    //       next();
    //     } else {
    //       Toast("你还不是管理员！");
    //     }
    //   },
    // },

    {
      path: "/msgpage",
      component: MsgPage,
    },
    {
      path: "/findpsd",
      component: FindPsd,
    },

    // 登录
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/register",
      component: Register,
    },
  ],
});

// 全局前置路由守卫
router.beforeEach((to, from, next) => {
  // console.log(store.state.m_user.userInfo.state);
  next();
});

// 全局后置路由守卫
router.afterEach((to, from) => {});

export default router;
