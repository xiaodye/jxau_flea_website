<template>
  <div class="profile-page">
    <van-nav-bar title="修改资料" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-form @submit="onSubmit">
      <van-field name="imgUrl" :rules="[{ required: true, message: '用户头像不能为空' }]" center label="用户头像">
        <template #input>
          <van-uploader v-model="imgUrl" :max-count="1" />
        </template>
      </van-field>
      <van-field
        v-model="userName"
        name="userName"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="phone"
        type="tel"
        name="phone"
        label="电话号码"
        placeholder="电话号码"
        :rules="[{ required: true, message: '请填写电话号码' }]"
      />

      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">保存</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      imgUrl: [{ url: "" }],
      userName: "",
      phone: "",
    };
  },
  computed: {
    ...mapState("m_user", ["userInfo"]),
  },
  methods: {
    ...mapMutations("m_user", ["getUserInfo"]),
    onClickLeft() {
      this.$router.back();
    },

    showUserInfo(userInfo) {
      this.imgUrl[0].url = userInfo.imgUrl;
      this.userName = userInfo.userName;
      this.phone = userInfo.phone;
    },

    // 更新个人资料
    onSubmit(form) {
      console.log(form);
      let imgUrl = form.imgUrl[0].file;
      let userName = form.userName;
      let phone = form.phone;
      let userId = this.userInfo.userId;
      let config = {
        headers: { "Content-Type": "multipart/form-data" },
      };

      let param = new FormData();
      param.append("imgUrl", imgUrl);
      param.append("userId", userId);
      param.append("userName", userName);
      param.append("phone", phone);

      // console.log(param.get("imgUrl"));

      this.$http
        .post("/user/update/userInfo", param, config)
        .then(({ data: res }) => {
          console.log(res);
          this.$http
            .post("/user/found/one/user", {
              userId: this.userInfo.userId,
            })
            .then(({ data: res }) => {
              console.log(res.data);
              this.getUserInfo(res.data);
              this.$toast("保存成功");
              setTimeout(() => {
                this.$router.back();
              }, 1000);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  mounted() {
    // this.showUserInfo(this.userInfo);
  },
};
</script>

<style lang="scss" scoped>
.profile-page {
  height: 100vh;
  background-color: #f7f8fa;
}
</style>
