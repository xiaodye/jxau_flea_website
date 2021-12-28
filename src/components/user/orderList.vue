<template>
  <ul class="order-list">
    <li class="order" v-for="item in orderList" :key="item.trade_no">
      <div class="order-top">
        <div class="seller">
          <div class="seller-avatar">
            <van-image :src="item.userImg" fit="cover" round></van-image>
          </div>
          <div class="seller-name">{{ item.userName }}</div>
        </div>
        <div class="order-time">{{ item.time }}</div>
      </div>

      <!-- 商品 -->
      <div class="goods">
        <div class="goods-img">
          <van-image :src="item.imgUrls[0]" fit="cover"></van-image>
        </div>
        <div class="goods-info">
          <div class="goods-name van-ellipsis">
            {{ item.goodsName }}
          </div>

          <div class="goods-dsc van-ellipsis">
            {{ item.description }}
          </div>

          <div class="goods-price">
            <div class="price">
              <span>{{ item.total_amount }}</span>
              ￥
            </div>
            <!-- <div class="num">1</div> -->
          </div>
        </div>
      </div>

      <div class="trade-code">
        订单编号：
        <span>{{ item.trade_no }}</span>
      </div>

      <div class="del-btn">
        <van-button round size="small" @click="delOrder(item.trade_no)">删除订单</van-button>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    orderList: {
      type: Array,
      required: true,
    },
  },

  methods: {
    delOrder(trade_no) {
      this.$dialog
        .confirm({
          message: "是否删除订单",
        })
        .then(() => {
          this.$emit("delOrder", trade_no);
        })
        .catch(() => {});
    },
  },

  created() {},
};
</script>

<style lang="scss" scoped>
.order-list {
  padding: 10px;
  .order {
    margin-bottom: 20px;
    position: relative;
    background-color: #fff;
    min-height: 150px;
    border-radius: 8px;

    .order-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 0.5px solid #eaeaea;
      .seller {
        padding: 8px;
        // margin-bottom: 5px;
        display: flex;
        align-items: center;
        .seller-avatar {
          width: 22px;
          height: 22px;
          .van-image {
            width: 100%;
            height: 100%;
          }
        }
        .seller-name {
          margin-left: 5px;
          font-size: 12px;
        }
      }
      .order-time {
        color: #999;
        font-size: 14px;
        margin-right: 10px;
      }
    }

    .goods {
      width: 100%;
      padding: 10px;
      display: flex;

      .goods-img {
        border-radius: 5px;
        overflow: hidden;
        height: 80px;
        width: 80px;
        margin-right: 10px;
        .van-image {
          width: 100%;
          height: 100%;
        }
      }

      .goods-info {
        width: 70%;
        .goods-name {
          font-size: 14px;
          margin-bottom: 2px;
        }
        .goods-dsc {
          font-size: 12px;
          color: #999;
          margin-bottom: 10px;
        }
        .goods-price {
          color: #ff6d6d;
          font-size: 16px;
          display: flex;
          align-items: center;
        }
      }
    }

    .trade-code {
      font-size: 12px;
      color: #999;
      padding: 0 10px;
      padding-bottom: 10px;
    }

    .del-btn {
      position: absolute;
      bottom: 5%;
      right: 5%;
    }
  }
}
</style>
