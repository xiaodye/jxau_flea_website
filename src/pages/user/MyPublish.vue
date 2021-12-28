<template>
  <div class="my-publish">
    <van-nav-bar title="我的发布" left-text="返回" left-arrow @click-left="onClickLeft" />

    <!-- 商品列表 -->
    <mygoodsList :mygoodsList="mygoodsList" @delGoods="delGoods"></mygoodsList>
  </div>
</template>

<script>
import mygoodsList from "components/user/mygoodsList";
import { nanoid } from "nanoid";
import { mapState } from "vuex";
export default {
  components: {
    mygoodsList,
  },
  data() {
    return {
      active: 0,
      goodsType: false,
      mygoodsList: [
        {
          uuid: nanoid(),
          userName: "jxau_flea_market",
          goodsName: "素湃气凝胶抗寒高帮保暖童鞋A397 27码 黑色",
          userName: require("assets/img/user.jpg"),
          imgUrls: [require("assets/img/home/goods-5.jpg")],
          description: "气凝胶复合保暖、超轻柔软回弹、内里亲肤透气、抗菌鞋垫,商品限购20件，超出限购数量不可购买",
          price: 99.9,
          userid: "u1",
          type: "鞋子",
          time: "2021-11-05",
          state: 1,
          quanity: 7,
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

    // go发布
    goPublish() {
      this.$router.push({
        path: "/gopublish",
      });
    },

    // 下架商品
    delGoods(goodsId) {
      // console.log(goods_id);
      this.$http
        .post("/sold/out/user/good", {
          userId: this.userInfo.userId,
          goodsId: goodsId,
        })
        .then(({ data: res }) => {
          console.log(res);
          this.mygoodsList = this.mygoodsList.filter((goods) => {
            return goods.uuid !== goodsId;
          });
          this.$toast("下架成功");
        });
    },

    getPublishList() {
      this.$http
        .post("/goods/get/user/publish", {
          userId: this.userInfo.userId,
        })
        .then(({ data: res }) => {
          console.log(res.data);
          this.mygoodsList = res.data;
        });
    },
  },

  created() {
    this.getPublishList();
  },
};
</script>

<style lang="scss" scoped>
.my-publish {
  background-color: #f7f8fa;
  position: relative;
  min-height: 100vh;
  padding-bottom: 50px;

  .mygoods-list {
    padding-bottom: 50px;
    .goods {
      height: 150px;
      padding: 15px;
      margin: 10px;
      border-radius: 10px;
      background-color: #fff;
      display: flex;
      flex-direction: column;

      .goods-main {
        display: flex;
        height: 75%;

        .goods-lf {
          width: 30%;
          height: 100%;
          border-radius: 5px;
          overflow: hidden;
          .van-image {
            width: 100%;
            height: 100%;
          }
        }
        .goods-rg {
          width: 70%;
          margin-left: 10px;
          .goods-title {
            font-size: 14px;
            margin-bottom: 5px;
          }
          .goods-dsc {
            font-size: 13px;
            color: #999;
          }
          .goods-state {
            display: flex;
            margin-top: 5px;
            justify-content: space-between;
            align-items: center;
            .num {
              margin-right: 10px;
              font-size: 14px;
              color: #999;
            }
          }
        }
      }

      .goods-footer {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .pub-date {
          color: #999;
          margin-top: 0.625rem;
        }
        .goods-handle {
          display: flex;
          width: 30%;
          justify-content: space-around;
          .van-icon {
            font-size: 24px;
            color: #666;
            &:nth-of-type(2) {
              color: #ff7171;
            }
          }
        }
      }
    }
  }

  .go-pub {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 30px;
    bottom: 90px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    background-color: #beaee2;
    .icon {
      width: 25px;
      height: 25px;
    }
  }
}
</style>

