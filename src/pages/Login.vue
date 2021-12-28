<template>
  <div class="login">
    <div class="login-container">
      <div class="login-info">登录</div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="username"
          label="用户名"
          label-width="50"
          colon
          clearable
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '用户名不能为空！' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          label-width="50"
          colon
          clearable
          placeholder="请输入密码"
          :rules="[{ required: true, message: '密码不能为空！' }]"
        />
        <div class="login-btn">
          <van-button
            size="small"
            round
            class="log"
            color="linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)"
            native-type="submit"
          >
            登录
          </van-button>
          <van-button
            class="reg"
            size="small"
            round
            color="linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)"
            native-type="button"
            @click="gotoRegister"
          >
            还没有账号？去注册
          </van-button>
        </div>
      </van-form>

      <div class="tourist">
        <div class="link" @click="getTourist">做个游客？</div>
      </div>

      <!-- 忘记密码 -->
      <div class="forget-psd" @click="foundPsd">忘记密码?</div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapMutations("m_user", ["getUserInfo"]),

    onClickLeft() {
      this.$router.back();
    },

    // 登录
    onSubmit(form) {
      // console.log(form);
      this.$http
        .post("/user/login", {
          username: form.username,
          password: form.password,
        })
        .then(({ data: res }) => {
          if (res.message == "用户名或者密码错误") {
            this.$toast("用户不存在或密码错误！");
          } else {
            // console.log(res.data);
            this.$toast("登录成功！");
            this.getUserInfo(res.data);
            setTimeout(() => {
              this.$router.push({
                path: "/user",
              });
            }, 1500);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //  做个游客
    getTourist() {
      this.$router.push("/home");
    },

    // 找回密码
    foundPsd() {
      this.$router.push("/findpsd");
    },

    // 去注册
    gotoRegister() {
      this.$router.push({ path: "/register" });
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  background-color: #f7f8fa;
  height: 100vh;
  overflow: auto;
  background: url("../assets/login-bg.jpg") no-repeat;
  background-size: cover;
  .van-nav-bar {
    background-color: transparent;
    border: none;
  }
  .login-container {
    // background-color: #fff;
    position: relative;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    // box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
    border-radius: 10px;
    overflow: hidden;
    margin: 20px;
    margin-top: 140px;

    .forget-psd {
      position: absolute;
      width: 60px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      bottom: 5%;
      right: 5%;
      font-size: 12px;
      color: #f05454;
    }

    .login-info {
      font-size: 20px;
      font-weight: 700;
      width: 100%;
      height: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .van-form {
      .van-field {
        // background: rgba(255, 255, 255, 0.7);
        // backdrop-filter: blur(10px);
        background-color: transparent;
      }
      .login-btn {
        margin: 20px 0;
        display: flex;
        width: 100%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .van-button {
          width: 80%;
        }
        .log {
          margin-bottom: 10px;
        }
      }
    }

    .tourist {
      margin-bottom: 30px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .link {
        width: 40%;
        text-align: center;
        height: 30px;
        line-height: 30px;
        font-size: 13px;
        color: #716f81;
        color: #ff8882;
      }
    }
  }
}
</style>
