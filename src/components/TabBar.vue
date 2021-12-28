<template>
  <div id="tab-bar">
    <van-tabbar class="tabbar" v-model="active" active-color="#FF5151" safe-area-inset-bottom route>
      <van-tabbar-item icon="wap-home-o" to="/home">主页</van-tabbar-item>
      <van-tabbar-item icon="guide-o" to="/publish">发布</van-tabbar-item>
      <!-- <van-tabbar-item icon="shopping-cart-o" :badge="cartList.length" to="/cart">购物车</van-tabbar-item> -->
      <van-tabbar-item icon="friends-o" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// import { mapState } from "vuex";

export default {
  data() {
    return {
      active: 0,
    };
  },

  computed: {
    // ...mapState("m_cart", ["cartList"]),
  },
};
</script>

<style lang="scss" scoped>
#tab-bar {
  width: 100%;
  .tabbar {
    box-sizing: border-box;
    border-top: 1px solid #eaeaea;
  }
}
</style>
