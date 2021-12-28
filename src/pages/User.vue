<template>
  <div id="user">
    <!-- 用户信息 -->
    <div class="user-container" ref="user">
      <!-- 用户头像 -->
      <div class="user-avatar" @click="showAvatar">
        <van-image round fit="cover" :src="userInfo.imgUrl" />
      </div>

      <div class="go-login" v-if="!userInfo.userId" @click="gotoLogin">
        <van-button color="linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)" size="small">
          立即登录
        </van-button>
      </div>

      <!-- 用户信息 -->
      <div class="user-info" v-if="userInfo.userId">
        <div class="nick-name">
          {{ userInfo.userName }}
          <van-tag color="linear-gradient(120deg, #f6d365 0%, #fda085 100%)" text-color="#132C33" v-if="userInfo.state === 4">
            管理员
          </van-tag>
        </div>
        <div class="id">
          <van-icon name="edit" size="16"></van-icon>
          <span>点击设置个性签名</span>
        </div>
      </div>
    </div>

    <!-- 交易模块 -->
    <div class="user-trade">
      <div class="trade-item" v-for="(item, i) in tradeItem" :key="i" @click="gotoTrade(item.route)">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="item.icon"></use>
        </svg>
        <span class="info">
          {{ item.info }}
          <!-- <span style="color: #ffaaa5">{{ item.num }}</span> -->
        </span>
      </div>
    </div>

    <!-- 功能模块1 -->
    <van-cell-group inset class="module-1">
      <van-cell :title="item.title" is-link v-for="(item, i) in module_1" :key="i" :to="item.route">
        <template #icon>
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="item.icon"></use>
          </svg>
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 功能模块2 -->
    <van-cell-group inset class="module-2">
      <van-cell title="管理员" is-link @click="gotoAdmin">
        <template #icon>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shangchaoguanliyuan"></use>
          </svg>
        </template>
      </van-cell>
      <van-cell to="/msgpage" is-link title="留言板">
        <template #icon>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-liuyan"></use>
          </svg>
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 退出登录 -->
    <div class="sign-out" v-if="userInfo.userId">
      <van-button
        color="linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)"
        @click="signOut"
        size="small"
      >
        退出登录
      </van-button>
    </div>

    <!-- 版本号 -->
    <div class="version">
      <div class="app">@江农跳蚤市场</div>
      <span>&nbsp;&nbsp;v1.0.1</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { ImagePreview } from "vant";

export default {
  data() {
    return {
      avatar: require("assets/img/user.jpg"),
      tradeItem: [
        {
          icon: "#icon-fabu",
          info: "发布",
          num: 2,
          route: "/mypublish",
        },
        {
          icon: "#icon-maichu",
          info: "卖出",
          num: 7,
          route: "/mysale",
        },
        {
          icon: "#icon-goumai",
          info: "买到",
          num: 0,
          route: "/mybuy",
        },
        {
          icon: "#icon-shoucang",
          info: "收藏",
          num: 2,
          route: "/mycollect",
        },
      ],
      module_1: [
        {
          title: "浏览记录",
          icon: "#icon-lishijilu",
          route: "/historypage",
        },
        {
          title: "我的地址",
          icon: "#icon-dizhi",
          route: "/addresspage",
        },
        {
          title: "修改个人资料",
          icon: "#icon-yunhangziliao",
          route: "/profilepage",
        },
        {
          title: "修改密码",
          icon: "#icon-mima",
          route: "/psdpage",
        },
      ],
      module_2: [
        {
          title: "管理员",
          icon: "#icon-shangchaoguanliyuan",
          route: "/managerpage",
        },
        {
          title: "留言板",
          icon: "#icon-liuyan",
          route: "/msgpage",
        },
        // {
        //   title: "联系技术人员",
        //   icon: "#icon-guanfangwangzhan-JX-",
        // },
      ],
    };
  },
  computed: {
    ...mapState("m_user", ["userInfo"]),
  },
  methods: {
    ...mapMutations("m_user", ["clearUserInfo"]),

    // 展示头像
    showAvatar() {
      ImagePreview([this.userInfo.imgUrl]);
    },

    // 进入交易模块
    gotoTrade(route) {
      this.$router.push({
        path: route,
      });
    },

    // 跳转管理员
    gotoAdmin() {
      if (this.userInfo.state === 4) {
        window.location.href = "http://192.168.137.98:8080/login";
      } else {
        this.$toast("你还不管理员");
      }
    },

    // 退出登录
    signOut() {
      this.$dialog
        .confirm({
          message: "是否退出登录",
          theme: "round-button",
        })
        .then(() => {
          this.clearUserInfo();
          this.$router.push({
            path: "/login",
          });
        })
        .catch(() => {});
    },

    // 去登陆
    gotoLogin() {
      this.$router.push("/login");
    },
  },

  mounted() {
    // console.log(this.$refs.user);
    // const user = document.querySelector(".user-container");
    // console.log(user);
    // console.log(this.$refs.user === user);
  },

  beforeDestroy() {
    console.log("user销毁");
  },
};
</script>

<style lang="scss" scoped>
#user {
  background-color: #f7f8fa;
  height: 100vh;
  padding-bottom: 50px;
  overflow: auto;
  .user-container {
    height: 160px;
    background-image: linear-gradient(to top, #ebbba7 0%, #cfc7f8 100%);
    display: flex;
    align-items: center;
    padding: 40px 20px 0;

    .go-login {
      margin-left: 10px;
      .van-button {
        padding: 0 20px;
        border-radius: 5px;
      }
    }

    .user-avatar {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      border: 4px solid #fff;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      .van-image {
        width: 100%;
        height: 100%;
      }
    }
    .user-info {
      margin-left: 10px;
      height: 50px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .nick-name {
        font-weight: bold;
        font-size: 18px;
        display: flex;
        align-items: center;
        .van-tag {
          margin-left: 15px;
        }
      }
      .id {
        color: #666;
        display: flex;
        align-items: center;
        span {
          margin-left: 5px;
          font-size: 12px;
        }
      }
    }
  }

  .user-trade {
    margin: 20px 16px;
    height: 80px;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    .trade-item {
      height: 100%;
      padding: 5px 0;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      .icon {
        height: 30px;
        width: 30px;
      }
      .info {
        font-size: 14px;
        color: #666;
      }
    }
  }

  .module-1,
  .module-2 {
    margin-bottom: 20px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    .van-cell {
      display: flex;
      align-items: center;
      .icon {
        width: 22px;
        height: 22px;
        margin-right: 7px;
      }
    }
  }

  .sign-out {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    .van-button {
      padding: 0 30px;
      border-radius: 5px;
    }
  }

  .version {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    font-size: 12px;
    margin-bottom: 20px;
    background-image: linear-gradient(to right, #a6c0fe 30%, #f68084 60%);
    color: transparent;
    font-style: italic;
    background-clip: text;
    .app {
      font-weight: 700;
      font-size: 14px;
      font-style: normal;
    }
  }
}
</style>
