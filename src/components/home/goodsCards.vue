<template>
  <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
    <div class="goods-list" v-if="goodsCards.length">
      <div class="good-container" v-for="item in goodsCards" :key="item.uuid" @click.stop="gotoDetail(item.uuid)">
        <div class="goods">
          <div class="goods-img">
            <van-image :src="item.imgUrls[0]" fit="cover"></van-image>
          </div>

          <div class="goods-name van-multi-ellipsis--l2">
            <van-tag color="#ffe1e1" text-color="#ad0000">包邮</van-tag>
            {{ item.goodsName }}
          </div>

          <div class="goods-price">{{ item.price }} ￥</div>

          <div class="seller">
            <div class="seller-img">
              <van-image round :src="item.userImg"></van-image>
            </div>
            <div class="seller-name van-ellipsis">{{ item.userName }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 无商品展示状态 -->
    <div class="cart-empty" v-else>
      <van-empty description="没有商品哦" />
    </div>
  </van-pull-refresh>
</template>

<script>
export default {
  props: {
    goodsCards: {
      type: Array,
    },
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    LoadState() {
      return this.isLoading;
    },
  },
  methods: {
    onRefresh() {
      this.$emit("refresh");
    },

    gotoDetail(uuid) {
      // console.log(uuid);
      this.$router.push({
        path: "/detailpage",
        query: {
          goodsId: uuid,
        },
      });
    },
  },
  mounted() {
    // console.log(this.goodsCards);
  },
};
</script>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  .good-container {
    width: 50%;
    .goods {
      box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
      background-color: #fff;
      height: 250px;
      border-radius: 10px;
      margin-bottom: 15px;
      margin: 7px;
      overflow: hidden;
      .goods-img {
        height: 60%;
        width: 100%;
        .van-image {
          height: 100%;
          width: 100%;
        }
      }

      .goods-name {
        min-height: 30px;
        padding: 0 6px;
        margin-top: 6px;
        font-size: 13px;
        color: #666;
        overflow: hidden;
      }

      .goods-price {
        margin-top: 10px;
        font-size: 18px;
        color: #ff5f7e;
        padding: 0 6px;
      }

      .seller {
        margin: 6px;
        display: flex;
        align-content: center;
        .seller-img {
          width: 20px;
          height: 20px;
          .van-image {
            width: 100%;
            height: 100%;
          }
        }
        .seller-name {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 12px;
          color: #999;
          margin-left: 6px;
        }
      }
    }
  }
}
</style>
