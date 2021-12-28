<template>
  <div class="msg-page">
    <van-nav-bar title="留言板" left-text="返回" fixed left-arrow @click-left="onClickLeft" />

    <!-- 留言列表 -->
    <div class="msg-container">
      <ul class="msg-list" v-if="msgList.length">
        <li class="msg-item" v-for="item in msgList" :key="item.uuid">
          <div class="user">
            <div class="user-avatar">
              <van-image round :src="item.userImg"></van-image>
            </div>
            <div class="user-info">
              <div class="user-name">{{ item.userName }}</div>
              <div class="date">{{ item.time }}</div>
            </div>
            <div class="like">
              <van-icon name="like-o"></van-icon>
              <span>{{ 10 }}</span>
            </div>
          </div>

          <!-- 内容 -->
          <div class="content">
            {{ item.comment }}
          </div>
        </li>
      </ul>

      <div v-if="msgList.length">
        <van-divider>到底了</van-divider>
      </div>

      <div class="empty" v-else>
        <van-empty description="暂时还没有留言哦"></van-empty>
      </div>
    </div>

    <!-- 写留言 -->
    <div class="edit-board">
      <van-field type="textarea" v-model="value" rows="1" autosize placeholder="发布留言...">
        <template #button>
          <van-button type="info" size="small" @click.stop="onSubmit">发布</van-button>
        </template>
      </van-field>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      value: "",
      msgList: [
        // {
        //   uuid: "01",
        //   userName: "江农跳蚤",
        //   userImg: "https://img01.yzcdn.cn/vant/cat.jpeg",
        //   time: "2021-12-06 19:17:03",
        //   comment:
        //     "这里我们使用Node.js的Express框架来构建相应的后端应用，相应的准备工作大致包括Node.js环境的安装，npm的安装，MongoDB的安装等",
        // },
        // {
        //   uuid: "02",
        //   userName: "江农跳蚤",
        //   userImg: "https://img01.yzcdn.cn/vant/cat.jpeg",
        //   time: "2021-12-06 19:17:03",
        //   comment: "非诚勿扰诚信出！先到先得，价格好商量照片均为实拍,所见即所得,放心购买！都是现货！感兴趣的小伙伴可以来购买哦。",
        // },
      ],
    };
  },
  computed: {
    ...mapState("m_user", ["userInfo"]),
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },

    onSubmit() {
      if (this.value) {
        this.$http
          .post("/board/user/add/message", {
            userId: this.userInfo.userId,
            comment: this.value,
          })
          .then(({ data: res }) => {
            console.log(res);
            this.getMsgList();
          });
      }
    },

    getMsgList() {
      this.$http.get("/board/get/all/message").then(({ data: res }) => {
        console.log(res);
        this.msgList = res.data;
      });
    },
  },

  created() {
    this.getMsgList();
  },
};
</script>

<style lang="scss" scoped>
.msg-page {
  height: 100vh;
  overflow: auto;
  background: url("../../assets/bg-3.jpg") no-repeat;
  background-size: cover;
  padding-top: 50px;

  .msg-container {
    padding: 10px;
    margin-bottom: 70px;
    .msg-list {
      .msg-item {
        min-height: 110px;
        margin-bottom: 20px;
        padding: 10px;
        border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        background: rgba(255, 255, 255, 0.6);
        backdrop-filter: blur(10px);
        display: flex;
        flex-direction: column;

        .user {
          width: 100%;
          height: 30%;
          display: flex;
          align-items: center;

          .user-avatar {
            width: 40px;
            height: 40px;
            .van-image {
              width: 100%;
              height: 100%;
            }
          }

          .user-info {
            height: 40px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            margin-left: 10px;
            .user-name {
              font-weight: 700;
              font-size: 14px;
            }
            .date {
              font-size: 12px;
              color: #999;
            }
          }

          .like {
            margin-left: auto;
            margin-right: 10px;
            display: flex;
            align-items: center;
            span {
              margin-left: 5px;
            }
          }
        }

        .content {
          flex: 1;
          position: relative;
          margin: 10px 10px 0;
          padding: 10px;
          border-radius: 3px;
          // background-image: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%);
          background-color: #fef5ed;
        }
      }
    }
  }

  .edit-board {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    padding: 10px;
    .van-field {
      height: 100%;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      border-radius: 10px;
    }
  }
}
</style>
