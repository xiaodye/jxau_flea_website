<template>
  <div id="home" ref="Home">
    <!-- 搜索框 -->
    <van-search class="search" placeholder="搜索商品" readonly shape="round" @click="goSearch"></van-search>

    <!-- 轮播图 -->
    <van-swipe class="swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item class="swipe-item" v-for="(item, i) in swipe" :key="i">
        <van-image :src="item" fit="cover">
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </van-swipe-item>
    </van-swipe>

    <!-- 商品导航 -->
    <div class="nav">
      <div class="nav-item" v-for="(item, i) in navIcon" :key="i">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="item.icon"></use>
        </svg>
        <div class="info">{{ item.info }}</div>
      </div>
    </div>

    <!-- 分类栏 -->
    <div class="category-container">
      <van-sticky :offset-top="53">
        <van-tabs class="tags" title-active-color="#FF5F7E" @change="changeType">
          <van-tab v-for="tag in tags" :key="tag" :name="tag" :title="tag">
            <div class="btn-group">
              <van-button
                :type="activeIdx == i ? 'info' : 'default'"
                size="small"
                v-for="(item, i) in btns"
                :key="i"
                @click.stop="selectBtn(i)"
              >
                {{ item }}
              </van-button>
            </div>
          </van-tab>
        </van-tabs>
      </van-sticky>
    </div>

    <!-- 商品列表 -->
    <transition name="van-fade">
      <goodsCards ref="goodsCards" :goodsCards="goodsCards" @refresh="toRefresh"></goodsCards>
    </transition>
  </div>
</template>

<script>
import goodsCards from "components/home/goodsCards.vue";
import { nanoid } from "nanoid";
export default {
  components: { goodsCards },
  data() {
    return {
      swipe: [
        require("assets/img/home/swipe-1.jpg"),
        require("assets/img/home/swipe-2.jpg"),
        require("assets/img/home/swipe-3.jpg"),
        require("assets/img/home/swipe-4.jpg"),
      ],

      tags: ["猜你喜欢", "电动车", "手机", "电脑", "书籍", "运动", "其他"],
      btns: ["综合排序", "价格排序", "时间排序"],
      navIcon: [
        {
          icon: "#icon-diandongcheguanli",
          info: "电动车",
        },
        {
          icon: "#icon-cellphone-01",
          info: "手机数码",
        },
        {
          icon: "#icon-shuji1",
          info: "学习资料",
        },
        {
          icon: "#icon-lanqiu3",
          info: "运动器械",
        },
      ],

      activeIdx: 0,
      activeTag: "猜你喜欢",
      isLoading: false,

      goodsCards: [
        {
          uuid: nanoid(),
          userid: "u1",
          userName: "jxau_flea_market",
          userImg: require("assets/img/user.jpg"),
          quantity: 1,
          price: "2999.00",
          goodsName: "素湃气凝胶抗寒高帮保暖童鞋A397",
          type: "鞋子",
          description: "气凝胶复合保暖、超轻柔软回弹、内里亲肤透气、抗菌鞋垫,商品限购20件，超出限购数量不可购买",
          state: 1,
          checked: false,
          time: "2021-11-27",
          imgUrls: [require("assets/img/home/goods-5.jpg")],
        },
        {
          uuid: nanoid(),
          userid: "u1",
          userName: "jxau_flea_market",
          userImg: require("assets/img/user.jpg"),
          quantity: 1,
          price: "2999.00",
          goodsName: "素湃气凝胶抗寒高帮保暖童鞋A397",
          type: "鞋子",
          description: "气凝胶复合保暖、超轻柔软回弹、内里亲肤透气、抗菌鞋垫,商品限购20件，超出限购数量不可购买",
          state: 1,
          checked: false,
          time: "2021-11-27",
          imgUrls: [require("assets/img/home/goods-5.jpg")],
        },
        {
          uuid: nanoid(),
          userid: "u1",
          userName: "jxau_flea_market",
          userImg: require("assets/img/user.jpg"),
          quantity: 1,
          price: "2999.00",
          goodsName: "素湃气凝胶抗寒高帮保暖童鞋A397",
          type: "鞋子",
          description: "气凝胶复合保暖、超轻柔软回弹、内里亲肤透气、抗菌鞋垫,商品限购20件，超出限购数量不可购买",
          state: 1,
          checked: false,
          time: "2021-11-27",
          imgUrls: [require("assets/img/home/goods-5.jpg")],
        },
        {
          uuid: nanoid(),
          userid: "u1",
          userName: "jxau_flea_market",
          userImg: require("assets/img/user.jpg"),
          quantity: 1,
          price: "2999.00",
          goodsName: "素湃气凝胶抗寒高帮保暖童鞋A397",
          type: "鞋子",
          description: "气凝胶复合保暖、超轻柔软回弹、内里亲肤透气、抗菌鞋垫,商品限购20件，超出限购数量不可购买",
          state: 1,
          checked: false,
          time: "2021-11-27",
          imgUrls: [require("assets/img/home/goods-5.jpg")],
        },
        {
          uuid: nanoid(),
          userid: "u1",
          userName: "jxau_flea_market",
          userImg: require("assets/img/user.jpg"),
          quantity: 1,
          price: "2999.00",
          goodsName: "素湃气凝胶抗寒高帮保暖童鞋A397",
          type: "鞋子",
          description: "气凝胶复合保暖、超轻柔软回弹、内里亲肤透气、抗菌鞋垫,商品限购20件，超出限购数量不可购买",
          state: 1,
          checked: false,
          time: "2021-11-27",
          imgUrls: [require("assets/img/home/goods-5.jpg")],
        },
      ],
    };
  },
  computed: {},
  methods: {
    goSearch() {
      this.$router.push({ path: "/searPage" });
    },

    // 刷新
    toRefresh() {
      if (this.activeTag == "猜你喜欢") {
        this.getGoodsData();
      } else {
        this.$http
          .post("/search/byType", {
            type: this.activeTag,
            state: this.activeIdx,
          })
          .then(({ data: res }) => {
            console.log(res.data);
            this.goodsCards = res.data;

            // 刷新态变为false
            this.$refs.goodsCards.isLoading = false;
          });
      }
    },

    // 排序
    selectBtn(i) {
      this.activeIdx = i;
      if (this.activeTag == "猜你喜欢") {
        this.getGoodsData();
      } else {
        this.$http
          .post("/search/byType", {
            type: this.activeTag,
            state: this.activeIdx,
          })
          .then(({ data: res }) => {
            console.log(res.data);
            this.goodsCards = res.data;
          });
      }
    },

    // 选择分类
    changeType(type) {
      if (type == "猜你喜欢") {
        this.getGoodsData();
      }
      console.log(type);
      this.activeTag = type;
      this.$http
        .post("/search/byType", {
          type: this.activeTag,
          state: this.activeIdx,
        })
        .then(({ data: res }) => {
          console.log(res.data);
          this.goodsCards = res.data;
        });
    },

    // 获取全部数据
    getGoodsData() {
      this.$http
        .post("/search/byLove", {
          state: this.activeIdx,
        })
        .then(({ data: res }) => {
          console.log(res.data);
          this.goodsCards = res.data;

          this.$refs.goodsCards.isLoading = false;
        });
    },
  },

  created() {
    this.getGoodsData();
  },

  beforeDestroy() {
    console.log("home销毁");
  },
};
</script>

<style lang="scss" scoped>
#home {
  background-color: #f7f8fa;
  height: 100vh;
  overflow: auto;
  padding-bottom: 50px;
  position: relative;
}

.search {
  position: fixed;
  z-index: 99;
  width: 100%;
  max-width: 475px;
}

.swipe {
  margin-top: 54px;
  .swipe-item {
    height: 150px;
  }
}

.nav {
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
  margin: 20px 10px;
  background-color: #fff;
  border-radius: 10px;
  height: 70px;
  display: flex;
  .nav-item {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 30px;
      height: 30px;
    }
    .info {
      font-size: 13px;
      text-align: center;
    }
  }
}

.category-container {
  .tags {
    width: 100%;
    // height: 100%;
    background-color: #fff;
    .btn-group {
      padding-left: 10px;
      .van-button {
        margin: 6px;
      }
    }
  }
}
</style>
