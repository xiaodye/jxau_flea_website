<template>
  <div class="sear-page">
    <van-search
      class="search"
      v-model="searVal"
      show-action
      autofocus
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
    ></van-search>
    <div class="history">
      <div class="history-menu">
        <h3>历史搜索</h3>
        <van-icon name="delete-o" size="24" @click="delAllRecords"></van-icon>
      </div>
      <div class="history-list">
        <van-tag
          type="primary"
          class="van-ellipsis"
          color="#F7F7F7"
          text-color="#666"
          size="large"
          @click.stop="onSearch(record)"
          v-for="(record, i) in records"
          :key="i"
        >
          {{ record }}
        </van-tag>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  data() {
    return {
      searVal: "",
      records: JSON.parse(localStorage.getItem("records")) || [],
    };
  },
  methods: {
    onSearch(val) {
      if (val) {
        this.addRecord(val);

        this.$router.push({
          path: "/respage",
          query: {
            searVal: val,
          },
        });
      }
    },
    onCancel() {
      this.$router.back();
    },

    addRecord(record) {
      if (this.records.indexOf(record) !== -1) {
        this.records = this.records.filter((item) => item !== record);
        this.records.unshift(record);
        localStorage.setItem("records", JSON.stringify(this.records));
      } else {
        this.records.unshift(record);
        localStorage.setItem("records", JSON.stringify(this.records));
      }
    },

    // 删除全部历史记录
    delAllRecords() {
      Dialog.alert({
        title: "提示",
        message: "是否要删除全部历史搜索？",
        theme: "round-button",
        showCancelButton: true,
      })
        .then(() => {
          this.records = [];
          localStorage.removeItem("records");
        })
        .catch((res) => {
          console.log(res);
        });
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.sear-page {
  // background-color: #f7f8fa;
  height: 100vh;
  overflow: auto;
  .history {
    padding: 15px 10px 10px;
    .history-menu {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .history-list {
      margin-top: 10px;
      .van-tag {
        margin: 5px;
        max-width: 80px;
      }
    }
  }
}
</style>
