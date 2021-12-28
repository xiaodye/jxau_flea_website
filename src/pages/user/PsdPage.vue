<template>
  <div class="psd-page">
    <van-nav-bar title="修改密码" left-text="返回" left-arrow @click-left="onClickLeft" />

    <van-form @submit="onSubmit">
      <van-field
        v-model="oldPassword"
        type="password"
        name="oldPassword"
        label="原密码"
        placeholder="原密码"
        :rules="[{ required: true, message: '原密码不能为空' }]"
      />

      <van-field
        v-model="newPassword"
        type="password"
        name="newPassword"
        label="新密码"
        placeholder="新密码"
        :rules="[{ required: true, message: '新密码不能为空' }]"
      />

      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>

    <div class="find-psd">
      <span @click="findPsd">忘记密码？</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      oldPassword: "",
      newPassword: "",
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

    // 修改密码
    onSubmit(form) {
      if (form.oldPassword == this.userInfo.password) {
        console.log(form);
        this.$http
          .post("/user/update/password", {
            userId: this.userInfo.userId,
            password: form.newPassword,
          })
          .then(({ data: res }) => {
            console.log(res);
            this.$http
              .post("/user/found/one/user", {
                userId: this.userInfo.userId,
              })
              .then(({ data: res }) => {
                console.log(res.data);
                this.getUserInfo(res.data);
                this.$router.back();
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$toast("密码错误");
      }
    },

    findPsd() {
      this.$router.push("/findpsd");
    },
  },
};
</script>

<style lang="scss" scoped>
.psd-page {
  height: 100vh;
  background-color: #f7f8fa;

  .find-psd {
    margin-top: 20px;
    padding: 0 10px;
    display: flex;
    justify-content: flex-end;
    span {
      color: #f05454;
      font-size: 14px;
    }
  }
}
</style>
