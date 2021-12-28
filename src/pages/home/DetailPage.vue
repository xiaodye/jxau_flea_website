<template>
  <div class="goods-detail">
    <van-nav-bar left-arrow left-text="返回" title="商品详情" fixed placeholder @click-left="onClickLeft"></van-nav-bar>

    <van-skeleton title avatar :row="18" :loading="isloading" />

    <div class="goods-data" v-if="!isloading">
      <!-- 商家 -->
      <div class="seller">
        <div class="seller-avatar">
          <van-image :src="goodsData.userImg" round></van-image>
        </div>
        <div class="seller-name">{{ goodsData.userName }}</div>
      </div>

      <!-- 商品价格 -->
      <div class="goods-price">
        ￥
        <span>{{ goodsData.price }}</span>
        <van-tag size="medium" color="#ffe1e1" text-color="#ad0000">包邮</van-tag>
      </div>

      <!-- 商品名字 -->
      <div class="goods-name">{{ goodsData.goodsName }}</div>

      <!-- 商品描述 -->
      <div class="goods-dsc">
        {{ goodsData.description }}
      </div>

      <!-- 商品图片 -->
      <ul class="goods-imgs">
        <li v-for="(img, i) in goodsData.imgUrls" :key="i" @click="showGoodsImgs(goodsData.imgUrls, i)">
          <van-image :src="img" fit="cover"></van-image>
        </li>
      </ul>

      <!-- 商品状态 -->
      <div class="goods-state">
        <div class="pub-date">
          发布于
          <span>{{ goodsData.time }}</span>
        </div>
        <div class="goods-num">
          商品剩余：
          <span>{{ goodsData.quantity }}</span>
        </div>
      </div>

      <!-- 电话号码 -->
      <!-- <div class="phone">
      电话号码：
      <span>{{ 12342577 }}</span>
    </div> -->
    </div>

    <!-- 菜单 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="评论" @click="showChat" :badge="commentList.length" />
      <!-- <van-goods-action-icon icon="cart-o" text="购物车" @click="gotoCart" :badge="cartList.length" /> -->
      <van-goods-action-icon
        icon="star-o"
        :text="goodsData.isCollected ? '已收藏' : '收藏'"
        :color="goodsData.isCollected ? '#F05454' : '#333'"
        @click="addCollect"
      />
      <!-- <van-goods-action-button type="warning" :text="hasCarted ? '已加入' : '加入购物车'" @click="addGoodsToCart" /> -->
      <van-goods-action-button type="danger" @click="onSubmit" text="立即购买" />
    </van-goods-action>

    <!-- 评论面板 -->
    <van-action-sheet class="action-sheet" title="评论" :closeable="false" v-model="showActionSheet">
      <commentList :commentList="commentList" :goodsId="goodsData.uuid" @refresh="showChat"></commentList>
    </van-action-sheet>
  </div>
</template>

<script>
import { nanoid } from "nanoid";

import commentList from "components/home/commentList.vue";

import { mapState, mapMutations } from "vuex";

import { ImagePreview } from "vant";
export default {
  components: {
    commentList,
  },
  data() {
    return {
      value: "",
      isloading: true,
      // collectText: "收藏",

      goodsData: {
        uuid: nanoid(),
        userName: "jxau_flea_market",
        goodsName: "电脑显示器144hz低价处理24寸超薄无边框直面曲面显示屏2k超大27寸显示器",
        userImg: require("assets/img/user.jpg"),
        imgUrls: [
          require("assets/img/home/goods-5.jpg"),
          require("assets/img/home/goods-1.jpg"),
          require("assets/img/home/goods-3.jpg"),
        ],
        description:
          "处理店内显示屏！货不多出完下架本人芝麻分700+,诚信交易,质量保证！非诚勿扰诚信出！先到先得，价格好商量照片均为实拍,所见即所得,放心购买！都是现货！拍下后联系快递上门取货给免费邮递",
        price: 69.9,
        userid: "u1",
        type: "鞋子",
        time: "2021-11-27",
        state: 1,
        quantity: 7,
        checked: false,
      },

      commentList: [
        // {
        // uuid: "02191210",
        // goodsId: "skdkak",
        // seller: true,
        // userName: "江农跳蚤",
        // userImg: "https://img01.yzcdn.cn/vant/cat.jpeg",
        // content: "非诚勿扰诚信出！先到先得，价格好商量照片均为实拍,所见即所得,放心购买！都是现货！感兴趣的小伙伴可以来购买哦。",
        // parent_uuid: "-1",
        // userId: "dkwdwad",
        // time: "2021-11-29",
        // activeNames: ["1"], //固定
        // called_userName: null,
        // replyComment: [
        //   {
        //     uuid: "skdkwvv",
        //     goodsId: "dkkadwk",
        //     userId: "943040",
        //     userName: "杠精1号",
        //     userImg: "https://img01.yzcdn.cn/vant/cat.jpeg",
        //     called_userName: "江农跳蚤",
        //     content: "穿了会得脚气吗？",
        //     parent_uuid: "02191210",
        //     createTime: "2021-11-29",
        //   },
        //   {
        //     uuid: "skdvv",
        //     goodsId: "dkkadwk",
        //     userId: "dkwdwad",
        //     userName: "江农跳蚤",
        //     userImg: "https://img01.yzcdn.cn/vant/cat.jpeg",
        //     called_userName: "杠精1号",
        //     content: "。。你有脚气就会得脚气，没有就不会得脚气",
        //     parent_uuid: "02191210",
        //     createTime: "2021-11-29",
        //   },
        // ],
        // },
        // {
        //   uuid: "091210",
        //   goodsId: "skdkak",
        //   isSeller: false,
        //   userName: "杠精2号",
        //   userImg: "https://img01.yzcdn.cn/vant/cat.jpeg",
        //   content: "隔壁才卖10块",
        //   parent_uuid: "-1",
        //   userId: "dkwdwad",
        //   time: "2021-11-29",
        //   activeNames: ["1"], //固定
        //   called_userName: null,
        //   replyComment: [],
        // },
      ],

      showActionSheet: false,
    };
  },

  computed: {
    // ...mapState("m_cart", ["cartList"]),
    ...mapState("m_user", ["userInfo"]),

    // hasCarted() {
    //   let res = this.cartList.find((goods) => goods.uuid == this.goodsData.uuid);
    //   if (res) return true;
    //   else return false;
    // },
  },
  methods: {
    // ...mapMutations("m_cart", ["addGoods"]),

    onClickLeft() {
      this.$router.back();
    },

    // 预览商品图片
    showGoodsImgs(imgUrls, idx) {
      ImagePreview({
        images: imgUrls,
        startPosition: idx,
      });
    },

    // 添加收藏
    addCollect() {
      if (this.userInfo.state) {
        if (!this.goodsData.isCollected) {
          this.$http
            .post("/goods/add/collection", {
              userId: this.userInfo.userId,
              goodsId: this.$route.query.goodsId,
            })
            .then(({ data: res }) => {
              console.log(res);
              this.goodsData.isCollected = true;
            });
        }
      } else {
        this.$toast("请登录");
      }
    },

    // 展示评论区
    showChat() {
      this.$http
        .get("/comment/show", {
          params: {
            goodsId: this.$route.query.goodsId,
          },
        })
        .then(({ data: res }) => {
          console.log(res.data);
          this.commentList = res.data;
        });

      this.showActionSheet = true;
    },

    // 获取商品详情页信息
    getDetail() {
      this.$http
        .post("/goods/get/detail", {
          userId: this.userInfo.userId,
          goodsId: this.$route.query.goodsId,
        })
        .then(({ data: res }) => {
          console.log(res.data);
          this.goodsData = res.data;
          this.isloading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 提交订单
    onSubmit() {
      if (this.userInfo.state) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "是否提交订单",
            theme: "round-button",
          })
          .then(() => {
            this.saveAlipay();
          })
          .catch(() => {});
      } else {
        this.$toast("请先登录后购买");
      }
    },

    // 支付宝支付
    saveAlipay() {
      let param = new FormData();
      let orderName = `${this.userInfo.userName}  ${this.goodsData.goodsName}`;
      console.log(orderName);

      param.append("userId", this.userInfo.userId);
      param.append("goodsId", this.goodsData.uuid);
      param.append("price", this.goodsData.price);
      param.append("WIDbody", this.goodsData.description);
      param.append("quantity", 1);
      param.append("WIDsubject", orderName);

      let config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      this.$http
        .post("/pay", param, config)
        .then(({ data: res }) => {
          // 后端接口请求成功之后 后端会返回表单 前端提交表单
          // console.log(res);
          const div = document.createElement("div");
          div.innerHTML = res;
          div.id = "alipay";
          document.body.appendChild(div);
          div.style.display = "none";

          document.querySelector("#alipay").children[0].submit();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // // 跳转至购物车
    // gotoCart() {
    //   this.$router.push("/cart");
    // },

    // // 添加商品至购物车
    // addGoodsToCart() {
    //   if (!this.hasCarted) {
    //     let goods = this.goodsData;
    //     goods.quantity = 1;
    //     this.addGoods(goods);
    //   }
    // },
  },

  created() {
    this.getDetail();
    // console.log(this.$route.query.goodsId);
  },
};
</script>

<style lang="scss" scoped>
.goods-detail {
  height: 100vh;
  background-color: #f7f8fa;
  padding-bottom: 50px;
  overflow: auto;

  .goods-data {
    .seller {
      background-color: #fff;
      height: 50px;
      display: flex;
      padding: 15px;
      align-items: center;
      .seller-avatar {
        height: 40px;
        width: 40px;
        overflow: hidden;
        .van-image {
          width: 100%;
          height: 100%;
        }
      }

      .seller-name {
        font-weight: bold;
        margin-left: 10px;
      }
    }

    .goods-price {
      padding: 15px;
      background-color: #fff;
      color: #f05454;
      font-weight: 700;
      font-size: 18px;
      display: flex;
      align-items: center;
      span {
        font-size: 22px;
      }
      .van-tag {
        margin-left: 10px;
        font-size: 14px;
        font-weight: normal;
      }
    }

    .goods-name,
    .goods-dsc {
      padding: 15px;
      background-color: #fff;
    }

    .goods-imgs {
      padding: 15px;
      background-color: #fff;
      li {
        height: 250px;
        margin-bottom: 10px;
        border-radius: 5px;
        overflow: hidden;
      }
      .van-image {
        width: 100%;
        height: 100%;
      }
    }

    .goods-state {
      margin: 10px 0;
      background-color: #fff;
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .pub-date {
        font-size: 14px;
        color: #999;
      }
      .goods-num {
        span {
          color: #ff8882;
        }
      }
    }
    .phone {
      background-color: #fff;
      margin-bottom: 20px;
      padding: 0 20px;
      height: 40px;
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #999;
      span {
        color: #ff8882;
      }
    }
  }

  .action-sheet {
    height: 90%;
  }
}
</style>
