<template>
  <div class="history-page">
    <van-nav-bar title="浏览记录" left-text="返回" fixed left-arrow @click-left="onClickLeft" />

    <van-cell center title="开启浏览记录">
      <template #right-icon>
        <van-switch v-model="userInfo.historyOpenBool" @change="openHistory" size="24" />
      </template>
    </van-cell>

    <!-- 记录列表 -->
    <goodsList class="goods-list" :goodsList="goodsList" :showDelbtn="true" btnText="删除记录" @delGoods="delHistory"></goodsList>
  </div>
</template>

<script>
import goodsList from "components/goodsList";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    goodsList,
  },
  data() {
    return {
      checked: false,
      goodsList: [
        // {
        //   uuid: "01",
        //   userid: "u1",
        //   userName: "jxau_flea_market",
        //   userImg: require("assets/img/user.jpg"),
        //   quantity: 1,
        //   price: 2999.9,
        //   goodsName: "素湃气凝胶抗寒高帮保暖童鞋A397",
        //   type: "鞋子",
        //   description: "气凝胶复合保暖、超轻柔软回弹、内里亲肤透气、抗菌鞋垫,商品限购20件，超出限购数量不可购买",
        //   checked: false,
        //   time: "2021-11-27",
        //   imgUrls: [require("assets/img/home/goods-3.jpg")],
        // },
      ],
    };
  },
  computed: {
    ...mapState("m_user", ["userInfo"]),
  },
  methods: {
    ...mapActions("m_user", ["changeHistory"]),
    onClickLeft() {
      this.$router.back();
    },

    openHistory() {
      if (this.userInfo.historyOpenBool) {
        console.log(this.userInfo.historyOpenBool);
        this.changeHistory(true);
      } else {
        console.log(this.userInfo.historyOpenBool);
        this.changeHistory(false);
      }
    },

    getHistory() {
      this.$http
        .get("/get/user/view/history/goods", {
          params: {
            userId: this.userInfo.userId,
          },
        })
        .then(({ data: res }) => {
          console.log(res.data);
          this.goodsList = res.data;
        });
    },

    delHistory(goodsId) {
      console.log(goodsId);
      this.$http
        .post("/delete/user/view/history/goods", {
          userId: this.userInfo.userId,
          goodsId: goodsId,
        })
        .then(({ data: res }) => {
          console.log(res.data);
          this.goodsList = res.data;
        });
    },
  },

  created() {
    this.getHistory();
  },
};
</script>

<style lang="scss" scoped>
.history-page {
  height: 100vh;
  background-color: #f7f8fa;
  .van-cell {
    padding-top: 50px;
  }
  .goods-list {
    margin-top: 10px;
  }
}
</style>
