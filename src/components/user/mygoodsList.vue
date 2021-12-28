<template>
  <div class="goods-container">
    <!-- 商品列表 -->
    <ul class="mygoods-list" v-if="mygoodsList.length">
      <!-- 单个商品 -->
      <li class="goods" v-for="goods in mygoodsList" :key="goods.uuid">
        <!-- 商品主体 -->
        <div class="goods-main">
          <div class="goods-lf">
            <van-image :src="goods.imgUrls[0]"></van-image>
          </div>
          <div class="goods-rg">
            <div class="goods-title van-ellipsis">{{ goods.goodsName }}</div>
            <div class="goods-dsc van-ellipsis">
              {{ goods.description }}
            </div>
            <div class="goods-state">
              <van-tag color="#ffe1e1" text-color="#ad0000">包邮</van-tag>

              <!-- 商品数量 -->
              <!-- <div class="num">
                数量：
                <span style="color: #f39189">{{ goods.quanity }}</span>
              </div> -->
            </div>
            <div class="goods-price">
              ￥
              <span>{{ goods.price }}</span>
            </div>
          </div>
        </div>

        <!-- 商品底部 -->
        <div class="goods-footer">
          <div class="pub-date">{{ goods.time }}</div>
          <div class="goods-handle">
            <!-- <van-icon name="edit" @click.native="goEdit"></van-icon> -->
            <van-button round icon="edit" size="small"></van-button>
            <van-button round icon="delete-o" size="small" @click.native="delGoods(goods.uuid)"></van-button>
          </div>
        </div>
      </li>
    </ul>

    <!-- 无商品状态 -->
    <div class="empty" v-else>
      <van-empty description="你还没有发布商品哦"></van-empty>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mygoodsList: {
      type: Array,
      required: true,
    },
    isAudit: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    goEdit() {
      this.$router.push({
        path: "editgoods",
      });
    },

    delGoods(goodsId) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "是否下架该商品",
        })
        .then(() => {
          this.$emit("delGoods", goodsId);
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.goods-container {
  padding-bottom: 50px;
}

.mygoods-list {
  .goods {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    height: 150px;
    padding: 15px;
    // padding-bottom: 0;
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
          font-size: 15px;
          margin-bottom: 5px;
        }
        .goods-dsc {
          font-size: 13px;
          color: #999;
        }

        .goods-state {
          display: flex;
          margin-top: 10px;
          justify-content: space-between;
          align-items: center;
          .num {
            margin-right: 10px;
            font-size: 14px;
            color: #999;
          }
        }

        .goods-price {
          margin-top: 10px;
          font-size: 12px;
          color: #ff7171;
          span {
            font-size: 18px;
          }
        }
      }
    }

    .goods-footer {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 7px;

      .pub-date {
        color: #999;
        font-size: 14px;
      }

      .goods-handle {
        display: flex;
        width: 20%;
        justify-content: space-around;
        .van-button {
          background-color: #f5f5f5;
          &:first-child {
            margin-right: 15px;
          }
        }
      }
    }
  }
}
</style>
