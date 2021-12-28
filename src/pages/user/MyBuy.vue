<template>
  <div class="my-buy">
    <van-nav-bar title="我买到的" left-text="返回" fixed left-arrow @click-left="onClickLeft" />
    <orderList :orderList="orderList" @delOrder="delOrder"></orderList>
  </div>
</template>

<script>
import orderList from "components/user/orderList";
import { nanoid } from "nanoid";
import { mapState } from "vuex";
export default {
  components: {
    orderList,
  },
  data() {
    return {
      orderList: [
        {
          trade_no: "19213010",
          userImg: require("assets/img/user.jpg"),
          userName: "江农跳蚤",
          time: "2021-12-18",
          imgUrls: [require("assets/img/home/goods-1.jpg")],
          goodsName: "素湃气凝胶抗寒高帮保暖童鞋A397",
          description: "气凝胶复合保暖、超轻柔软回弹、内里亲肤透气、抗菌鞋垫,商品限购20件，超出限购数量不可购买",
          total_amount: "69.9",
          trade_no: "993300djakdk1023flafadl2",
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

    getOrderList() {
      this.$http
        .post("/pay/get/userorder", {
          userId: this.userInfo.userId,
        })
        .then(({ data: res }) => {
          console.log(res.data);
          this.orderList = res.data;
        });
    },

    delOrder(trade_no) {
      // console.log(trade_no);
      this.orderList = this.orderList.filter((item) => item.trade_no !== trade_no);
    },
  },
  created() {
    this.getOrderList();
    // console.log(this.userInfo.userId);
  },
};
</script>

<style lang="scss" scoped>
.my-buy {
  height: 100vh;
  background-color: #f7f8fa;
  padding-top: 50px;
}
</style>
