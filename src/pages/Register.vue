<template>
  <div class="register">
    <div class="register-container">
      <div class="register-info">注册账号</div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="userName"
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
        <van-field
          v-model="confirmPassword"
          type="password"
          name="confirmPassword"
          label="确认密码"
          label-width="50"
          colon
          clearable
          placeholder="请确认密码"
          :rules="[{ validator, message: '确认密码有误！' }]"
        />
        <div class="register-btn">
          <van-button
            size="small"
            round
            class="log"
            color="linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)"
            native-type="submit"
          >
            立即注册
          </van-button>
          <van-button
            class="reg"
            size="small"
            round
            color="linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)"
            native-type="button"
            @click="gotoLogin"
          >
            已有账号？去登录
          </van-button>
        </div>
      </van-form>
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
      confirmPassword: "",
    };
  },
  methods: {
    ...mapMutations("m_user", ["getUserInfo"]),
    ...mapMutations("m_cart", ["getCartList"]),

    //  注册账号
    onSubmit(form) {
      console.log(form);
      let userName = form.userName;
      let password = form.password;
      // console.log(username);
      // console.log(axios);
      this.$http
        .post("/user/addOneUser", {
          userName: userName,
          password: password,
        })
        .then(({ data: res }) => {
          console.log(res.data);
          this.getUserInfo(res.data);
          this.$toast("注册成功");
          setTimeout(() => {
            this.$router.push({ path: "/user" });
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 密码验证
    validator(val) {
      return val === this.password;
    },

    // 去登录
    gotoLogin() {
      this.$router.push({
        path: "/login",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  background-color: #f7f8fa;
  height: 100vh;
  overflow: auto;
  background: url("../assets/login-bg.jpg") no-repeat;
  background-size: cover;
  .van-nav-bar {
    background-color: transparent;
    border: none;
  }
  .register-container {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    // background-color: #fff;
    // box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
    border-radius: 10px;
    overflow: hidden;
    margin: 20px;
    margin-top: 140px;
    .register-info {
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
        background-color: transparent;
      }
      .register-btn {
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
  }
}
</style>
