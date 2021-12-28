<template>
  <!-- 商品列表 -->
  <div class="cart-list" v-if="goodsList.length">
    <van-swipe-cell v-for="item in goodsList" :key="item.uuid">
      <van-card :price="item.price" :desc="item.description" :title="item.goodsName">
        <!-- 商品图片 -->
        <template #thumb>
          <div class="thumb">
            <van-checkbox v-model="item.checked" checked-color="#ee0a24" v-if="showCheckbox">复选框</van-checkbox>
            <van-image fit="cover" :src="item.imgUrls[0]" />
          </div>
        </template>

        <!-- tag -->
        <template #tags>
          <van-tag color="#ffe1e1" text-color="#F67280">包邮</van-tag>
        </template>

        <template #footer>
          <div class="goods-bottom">
            <!-- 商家信息 -->

            <!-- <div class="seller-info">userinfo
              <div class="seller-avatar">
                <van-image round :src="item.userImg" fit="cover"></van-image>
              </div>
              <div class="seller-name">{{ item.userName }}</div>
            </div> -->

            <!-- 浏览日期 -->
            <div class="history-date" v-if="item.time">{{ item.time }}</div>

            <!-- 交易成功标志 -->
            <div class="succss" v-if="showSuccess">交易成功</div>

            <!-- 数量更改 -->
            <van-stepper v-if="showStepper" v-model="item.quantity" theme="round" button-size="22" disable-input />
          </div>
        </template>
      </van-card>

      <!-- 右滑删除 -->
      <template #right v-if="showDelbtn">
        <van-button @click="delGoods(item.uuid)" square :text="btnText" color="#F67280" class="del-button" />
      </template>
    </van-swipe-cell>
  </div>

  <!-- 无商品展示状态 -->
  <div class="cart-empty" v-else>
    <van-empty description="没有商品哦" />
  </div>
</template>

<script>
// import { mapMutations } from "vuex";
export default {
  props: {
    goodsList: {
      type: Array,
      required: true,
    },
    showCheckbox: {
      type: Boolean,
      default: false,
    },
    showStepper: {
      type: Boolean,
      default: false,
    },
    showDelbtn: {
      type: Boolean,
      dafault: false,
    },
    btnText: {
      type: String,
      default: "删除",
    },
    showSuccess: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },

  computed: {},
  methods: {
    // ...mapMutations("m_cart", ["removeGoods"]),

    // 删除商品
    delGoods(uuid) {
      // this.removeGoods(uuid);
      this.$emit("delGoods", uuid);
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scopeed>
.cart-list {
  padding-bottom: 120px;
  background-color: #f7f8fa;
  .van-card {
    background-color: #fff;
    margin-bottom: 10px;

    .thumb {
      display: flex;
      height: 100%;
      .van-checkbox {
        margin-left: -10px;
      }
      .van-image {
        height: 100%;
        width: 210px;
      }
    }

    .goods-bottom {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 8px;

      // .seller-info {
      //   display: flex;
      //   align-items: center;
      //   margin-left: 0.5rem;
      //   .seller-avatar {
      //     width: 1.25rem;
      //     height: 1.25rem;
      //     margin-right: 0.5rem;
      //     .van-image {
      //       width: 100%;
      //       height: 100%;
      //     }
      //   }
      //   .seller-name {
      //     color: #666;
      //   }
      // }

      .history-date {
        color: #666;
        font-size: 14px;
      }

      .succss {
        font-weight: bold;
        color: #f67280;
      }
    }
  }

  .del-button {
    height: 100%;
  }
}
</style>
