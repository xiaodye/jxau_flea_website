<template>
  <div class="find-psd">
    <van-nav-bar title="忘记密码" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-field name="tel" v-model="tel" placeholder="请输入手机号" label="手机号码" type="tel"></van-field>
    <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
      <template #button>
        <van-button class="send" size="small" type="primary" @click.stop="submitMsg" :disabled="isdisabled">
          {{ btnText }}
        </van-button>
      </template>
    </van-field>

    <div style="margin: 16px">
      <van-button round block type="info" native-type="submit" @click="onSubmit">提交</van-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      tel: "",
      sms: "",
      isdisabled: false,
      timer: null,
      btnText: "发送",
    };
  },
  computed: {
    ...mapState("m_user", ["userInfo"]),
  },

  // watch: {
  //   btnText: {
  //     handler(val) {
  //       this.btnText = val;
  //       console.log(this.btnText);
  //     },
  //   },
  // },

  methods: {
    ...mapMutations("m_user", ["getUserInfo"]),
    onClickLeft() {
      this.$router.back();
    },

    // 重置密码
    onSubmit() {
      if (this.userInfo.phone !== this.tel) {
        this.$toast("电话号码错误或为空！");
      } else if (!this.sms) {
        this.$toast("验证码不能为空！");
      } else {
        this.$http
          .post("/user/forget/password", {
            goodsId: this.userInfo.userId,
            phone: this.userInfo.phone,
            code: this.sms,
          })
          .then(({ data: res }) => {
            if ((res.data = "密码修改成功")) {
              this.$http
                .post("/user/found/one/user", {
                  userId: this.userInfo.userId,
                })
                .then(({ data: res }) => {
                  this.getUserInfo(res.data);
                  this.$toast("密码已重置为电话号码后四位");
                  setTimeout(() => {
                    this.$router.back();
                  }, 1000);
                });
            }
          });
      }
    },

    // 发送短信
    submitMsg() {
      if (this.userInfo.phone !== this.tel) {
        this.$toast("电话号码错误或为空！");
      } else {
        this.isdisabled = true;
        this.btnText = 60;
        this.timer = setInterval(() => {
          if (this.btnText <= 1) {
            this.btnText = "重新发送";
            window.clearInterval(this.timer);
            this.timer = null;
            this.isdisabled = false;
          } else {
            this.btnText--;
          }
        }, 1000);

        // 发请求
        this.$http
          .post("/user/send/short/message", {
            userId: this.userInfo.userId,
            phone: this.userInfo.phone,
          })
          .then(({ data: res }) => {
            console.log(res);
            this.$toast("验证码已发送");
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.find-psd {
  height: 100vh;
  background-color: #f7f8fa;
  .send {
    min-width: 50px;
  }
}
</style>
