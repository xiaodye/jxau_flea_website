<template>
  <div class="my-collect">
    <van-nav-bar title="我的收藏" left-text="返回" fixed left-arrow @click-left="onClickLeft" />
    <goodsList
      class="goods-list"
      :goodsList="goodsList"
      :showDelbtn="true"
      btnText="取消收藏"
      @delGoods="cancelCollect"
    ></goodsList>
  </div>
</template>

<script>
import { mapState } from "vuex";
import goodsList from "components/goodsList";
export default {
  components: {
    goodsList,
  },
  data() {
    return {
      goodsList: [
        {
          uuid: "01",
          userid: "u1",
          userName: "jxau_flea_market",
          userImg: require("assets/img/user.jpg"),
          quantity: 1,
          price: 2999.9,
          goodsName: "素湃气凝胶抗寒高帮保暖童鞋A397",
          type: "鞋子",
          description: "气凝胶复合保暖、超轻柔软回弹、内里亲肤透气、抗菌鞋垫,商品限购20件，超出限购数量不可购买",
          checked: false,
          time: "2021-11-27",
          imgUrls: [require("assets/img/home/goods-3.jpg")],
        },
      ],
    };
  },
  computed: {
    ...mapState("m_user", ["userInfo"]),
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },

    getCollectList() {
      this.$http
        .get("/goods/get/collection", {
          params: {
            userId: this.userInfo.userId,
          },
        })
        .then(({ data: res }) => {
          console.log(res.data);
          this.goodsList = res.data;
        });
    },

    cancelCollect(goodsId) {
      // console.log(uuid);
      this.$http
        .post("/goods/delete/collection", {
          goodsId: goodsId,
          userId: this.userInfo.userId,
        })
        .then(({ data: res }) => {
          console.log(res);
          this.getCollectList();
        });
    },
  },

  created() {
    this.getCollectList();
  },
};
</script>

<style lang="scss" scoped>
.my-collect {
  height: 100vh;
  background-color: #f7f8fa;
  .goods-list {
    padding-top: 50px;
  }
}
</style>
