<template>
  <div class="my-sale">
    <van-nav-bar title="我卖出的" left-text="返回" fixed left-arrow @click-left="onClickLeft" />
    <goodsList class="goods-list" :goodsList="goodsList" :showSuccess="true"></goodsList>
  </div>
</template>

<script>
import goodsList from "components/goodsList";
import { nanoid } from "nanoid";
export default {
  components: {
    goodsList,
  },
  data() {
    return {
      goodsList: [
        // {
        //   uuid: nanoid(),
        //   userid: "u1",
        //   userName: "jxau_flea_market",
        //   userImg: require("assets/img/user.jpg"),
        //   quantity: 1,
        //   tag: "标签",
        //   price: "2999.00",
        //   goodsName: "素湃气凝胶抗寒高帮保暖童鞋A397",
        //   type: "鞋子",
        //   description: "气凝胶复合保暖、超轻柔软回弹、内里亲肤透气、抗菌鞋垫,商品限购20件，超出限购数量不可购买",
        //   state: 1,
        //   checked: false,
        //   time: "2021-11-27",
        //   imgUrl: [require("assets/img/home/goods-3.jpg")],
        // },
      ],
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.my-sale {
  height: 100vh;
  background-color: #f7f8fa;
  .goods-list {
    padding-top: 50px;
  }
}
</style>
