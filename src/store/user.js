// user

import axios from "axios";

const state = {
  userInfo: JSON.parse(sessionStorage.getItem("userInfo")) || {},
  // userInfo: {
  //   userName: "籽沐",
  //   imgUrl: require("assets/img/user.jpg"),
  //   userId: "10230102301234",
  //   state: 4,
  //   phone: "18070597763",
  //   addressInfo: {
  //     name: "蓝森",
  //     tel: "18070597763",
  //     addressDetail: "江西农业大学(东区) 13栋",
  //   },
  // },
};

const getters = {};

const actions = {
  changeHistory(content, newState) {
    // console.log(content);
    axios
      .post("/user/update/historyOpen", {
        userId: content.state.userInfo.userId,
        historyOpen: newState,
      })
      .then(({ data: res }) => {
        console.log(res);
        content.commit("ChangeHistory");
      });
  },
};

const mutations = {
  getUserInfo(state, userInfo) {
    state.userInfo = userInfo;
    sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
  },

  // 清除用户数据
  clearUserInfo(state) {
    state.userInfo = {};
    sessionStorage.setItem("userInfo", JSON.stringify({}));
  },

  // 打开历史记录
  ChangeHistory(state) {
    sessionStorage.setItem("userInfo", JSON.stringify(state.userInfo));
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
