<template>
  <div class="address-page">
    <van-nav-bar title="我的地址" left-text="返回" left-arrow @click-left="onClickLeft" />

    <van-address-edit
      :show-area="false"
      show-search-result
      :address-info="addressInfo"
      :search-result="searchResult"
      @save="onSave"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      addressInfo: {
        name: "蓝森",
        tel: "18070597763",
        addressDetail: "江西农业大学(东区) 13栋",
      },
      searchResult: [],
    };
  },
  computed: {
    ...mapState("m_user", ["userInfo"]),
  },
  mounted() {
    this.addressInfo = this.userInfo.addressInfo;
  },
  methods: {
    ...mapMutations("m_user", ["getUserInfo"]),
    onClickLeft() {
      this.$router.back();
    },

    // 修改地址
    onSave(content) {
      // console.log(content);
      this.$http
        .post("/user/add/address", {
          userId: this.userInfo.userId,
          name: content.name,
          tel: content.tel,
          detail: content.addressDetail,
        })
        .then(({ data: res }) => {
          this.$http
            .post("/user/found/one/user", {
              userId: this.userInfo.userId,
            })
            .then(({ data: res }) => {
              // console.log(res.data);
              this.getUserInfo(res.data);
              this.$toast("保存成功");
              this.$router.back();
            })
            .catch((err) => {
              console.log(err);
            });
        });
    },

    // 搜索展示
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "13栋",
            address: "江西农业大学(东区)",
          },
          {
            name: "12栋",
            address: "江西农业大学(北区)",
          },
          {
            name: "11栋",
            address: "江西农业大学(南区)",
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.address-page {
  height: 100vh;
  background-color: #f7f8fa;
}
</style>
