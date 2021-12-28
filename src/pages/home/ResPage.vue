<template>
  <div class="res-page">
    <!-- 搜索 -->
    <van-search
      class="res-search"
      v-model="searKey"
      shape="round"
      show-action
      placeholder="请输入搜索关键词"
      :clearable="false"
      @search="onSearch"
    >
      <template #left>
        <van-icon name="arrow-left" @click="goBack"></van-icon>
      </template>
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>

    <!-- 筛选 -->
    <div class="res-menu">
      <div class="res-num">
        全部结果：
        <span>{{ goodsCards.length }}</span>
      </div>
      <van-dropdown-menu>
        <van-dropdown-item v-model="value" :options="option" />
      </van-dropdown-menu>
    </div>

    <!-- 商品列表 -->
    <goodsCards :goodsCards="goodsCards" :refresh="toRefresh"></goodsCards>
  </div>
</template>

<script>
import axios from "axios";
import { nanoid } from "nanoid";
import goodsCards from "components/home/goodsCards.vue";
export default {
  components: {
    goodsCards,
  },
  data() {
    return {
      searKey: "",
      value: 0,

      option: [
        { text: "综合排序", value: 0 },
        { text: "时间排序", value: 1 },
        { text: "价格排序", value: 2 },
      ],

      goodsCards: [
        {
          uuid: nanoid(),
          userid: "u1",
          userName: "jxau_flea_market",
          userImg: require("assets/img/user.jpg"),
          quantity: 1,
          tag: "标签",
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

  methods: {
    onSearch(val) {
      console.log(val);
      axios
        .post("/search/byName", {
          goodsName: val,
        })
        .then(({ data: res }) => {
          console.log(res.data);
          this.goodsCards = res.data;
        });
    },
    goBack() {
      this.$router.back();
    },

    toRefresh() {},
  },

  created() {
    this.searKey = this.$route.query.searVal;
    this.onSearch(this.searKey);
  },
};
</script>

<style lang="scss">
.res-page {
  background-color: #f7f8fa;
  height: 100vh;
  overflow: auto;
  .res-search {
    position: fixed;
    width: 100%;
    max-width: 475px;
    z-index: 99;

    .van-icon {
      width: 8%;
      font-size: 20px;
      color: #999;
    }
  }

  .res-menu {
    display: flex;
    background-color: #ffffff;
    align-items: center;
    padding: 0 10px;
    margin-top: 50px;
    font-size: 14px;

    height: 50px;
    .res-num {
      height: 100%;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        color: #ff8882;
      }
    }

    .van-dropdown-menu {
      width: 30%;
      height: 100%;
      .van-dropdown-menu__bar {
        box-shadow: none !important;
      }
    }
  }
}
</style>
