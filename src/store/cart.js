// cart

export default {
  namespaced: true,
  state: {
    cartList: sessionStorage.getItem("cartList") || [],
    //   [
    //   {
    //     uuid: "01",
    //     userid: "u1",
    //     userName: "jxau_flea_market",
    //     userImg: require("assets/img/user.jpg"),
    //     quantity: 1,
    //     price: 2999.9,
    //     goodsName: "素湃气凝胶抗寒高帮保暖童鞋A397",
    //     type: "鞋子",
    //     description:
    //       "气凝胶复合保暖、超轻柔软回弹、内里亲肤透气、抗菌鞋垫,商品限购20件，超出限购数量不可购买",
    //     checked: false,
    //     time: "2021-11-27",
    //     imgUrls: [require("assets/img/home/goods-3.jpg")],
    //   },
    // ],
  },
  getters: {
    // 已勾选商品的总价格
    totalPrice(state) {
      return state.cartList
        .filter((goods) => goods.checked)
        .reduce((total, goods) => (total += goods.price * goods.quantity), 0)
        .toFixed(2);
    },
  },
  actions: {},
  mutations: {
    // 获取购物车列表
    getCartList(state, cartList) {
      state.cartList = cartList;
      sessionStorage.setItem("cartList", cartList);
    },

    // 更新购物车中所有商品的勾选状态
    updateAllGoodsState(state, newState) {
      state.cartList.forEach((goods) => (goods.checked = newState));
    },

    // 添加商品至购物车
    addGoods(state, goods) {
      // console.log(goods);
      state.cartList.push(goods);
    },

    // 根据 Id 删除对应的商品
    removeGoods(state, uuid) {
      state.cartList = state.cartList.filter((goods) => goods.uuid !== uuid);
    },
  },
};
