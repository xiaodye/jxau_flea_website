<template>
  <div class="comment-board">
    <!-- 输入板 -->
    <div class="edit-board">
      <van-cell-group>
        <van-field v-model="content" placeholder="输入评论" ref="edit" type="textarea" @blur="onBlur" autosize>
          <template #right-icon>
            <svg class="icon" aria-hidden="true" @click.stop="postComment">
              <use xlink:href="#icon-fabu"></use>
            </svg>
          </template>
        </van-field>
      </van-cell-group>
    </div>

    <!-- 评论列表 -->
    <ul class="comment-list">
      <li class="comment" v-for="item in commentList" :key="item.uuid">
        <!-- 评论头部 -->
        <div class="comment-top">
          <div class="user">
            <van-image round :src="item.userImg"></van-image>
            <div class="user-info">
              <span class="nick-name">
                {{ item.userName }}
                <van-tag color="#ffe1e1" text-color="#ad0000" v-if="item.seller">卖家</van-tag>
                <van-button size="mini" @click.stop="onReply(item.uuid, item.userName)">回复</van-button>
              </span>
              <span class="create-date">{{ item.time }}</span>
            </div>
          </div>

          <!-- 点赞(不做) -->
          <!-- <div class="like">
            <van-icon name="like-o" size="20"></van-icon>
            <span>{{ 7 }}</span>
          </div> -->
        </div>

        <!-- 评论主体 -->
        <div class="comment-main">
          <div class="text">
            {{ item.content }}
          </div>

          <!-- 回复 -->
          <div class="reply">
            <!-- 折叠面板 -->
            <van-collapse v-model="item.activeNames">
              <van-collapse-item title="全部回复" name="2">
                <!-- 回复列表 -->
                <ul class="reply-list">
                  <li class="reply-list-item" v-for="reply in item.replyComment" :key="reply.uuid">
                    <div class="top">
                      <div class="re-user">
                        <van-image fit="cover" round :src="reply.userImg"></van-image>
                        <span class="re-user-name">{{ reply.userName }}</span>
                      </div>
                      <div class="poster">
                        @
                        <span>{{ reply.called_userName }}</span>
                      </div>

                      <div class="go-reply" @click.stop="onReply(reply.uuid, reply.userName)">回复</div>
                    </div>
                    <div class="main">
                      {{ reply.content }}
                    </div>
                  </li>
                </ul>
              </van-collapse-item>
            </van-collapse>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    commentList: {
      type: Array,
      required: true,
    },
    goodsId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      content: "",
      active_parent_uuid: "-1",
      active_called_userName: null,
      active_placeholder: "",
      timer: null,
    };
  },
  computed: {
    ...mapState("m_user", ["userInfo"]),
  },

  watch: {
    active_parent_uuid: {
      immediate: true,
      handler(val) {
        console.log(val);
      },
    },
    active_called_userName: {
      immediate: true,
      handler(val) {
        console.log(val);
      },
    },
  },

  methods: {
    // 点击回复
    onReply(parent_uuid, called_userName) {
      this.clearTimer();

      this.$refs.edit.focus();
      this.active_parent_uuid = parent_uuid;
      this.active_called_userName = called_userName;
      // console.log(parent_uuid);
      // console.log(called_userName);
    },

    // 清除定时器
    clearTimer() {
      clearTimeout(this.timer);
      this.timer = null;
    },

    // 发布评论
    postComment() {
      this.clearTimer();

      if (this.userInfo.state) {
        if (this.content) {
          this.$http
            .post("/comment/commit", {
              userId: this.userInfo.userId,
              goodsId: this.goodsId,
              content: this.content,
              called_userName: this.active_called_userName,
              parent_uuid: this.active_parent_uuid,
            })
            .then(({ data: res }) => {
              console.log(res);
              this.content = "";
              this.$emit("refresh");

              this.active_parent_uuid = "-1";
              this.active_called_userName = null;
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else {
        this.$toast("游客不能发布评论");
      }
    },

    onBlur() {
      this.timer = setTimeout(() => {
        this.active_parent_uuid = "-1";
        this.active_called_userName = null;
      }, 50);
    },
  },
};
</script>

<style lang="scss" scoped>
.comment-board {
  height: 100%;
  overflow: auto;
  &::after {
    position: absolute;
    background-color: cyan;
    width: 50px;
    height: 30px;
    left: 0;
    top: 0;
  }

  .edit-board {
    z-index: 99;
    position: fixed;
    width: 100%;
    border: 1px solid #eff8ff;
    border-radius: 5px;
    bottom: 0;
    left: 0;
    .icon {
      width: 25px;
      height: 25px;
    }
  }

  .comment-list {
    padding: 15px;
    padding-bottom: 100px;
    .comment {
      .comment-top {
        display: flex;
        align-items: center;

        .user {
          width: 100%;
          display: flex;
          align-items: center;
          height: 50px;
          .van-image {
            width: 40px;
            height: 40px;
            margin-right: 10px;
          }

          .user-info {
            position: relative;
            height: 80%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .nick-name {
              display: flex;
              align-items: center;
              font-weight: 700;
              font-size: 14px;
              .van-tag {
                font-size: 12px;
                margin-left: 5px;
              }
              .van-button {
                margin-left: 15px;
                color: #f05454;
                font-weight: normal;
                font-size: 12px;
              }
            }
            .create-date {
              font-size: 12px;
              color: #999;
            }
          }
        }

        .like {
          display: flex;
          align-items: center;
          margin-right: 20px;
          .van-icon {
            margin-right: 5px;
          }
        }
      }

      .comment-main {
        padding-left: 40px;
        .text {
          font-size: 15px;
          padding-bottom: 10px;
        }

        .reply-list-item {
          font-size: 12px;
          margin-bottom: 10px;
          .top {
            display: flex;
            align-items: center;

            .re-user {
              display: flex;
              align-items: center;
              margin-right: 10px;
              .van-image {
                width: 25px;
                height: 25px;
                margin-right: 5px;
              }
              .re-user-name {
                font-size: 12px;
              }
            }

            .poster {
              font-size: 12px;
              display: flex;
              align-items: center;
              span {
                color: #3edbf0;
              }
            }

            .go-reply {
              margin-left: 15px;
              color: #f05454;
            }
          }

          .main {
            font-size: 12px;
            padding-left: 30px;
            color: #333;
            line-height: 1.2;
          }
        }
      }
    }
  }
}
</style>
