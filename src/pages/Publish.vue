<template>
  <div class="publish">
    <van-nav-bar title="发布商品" fixed />
    <van-form class="form" @submit="onSubmit">
      <van-field
        v-model="goodsName"
        type="textarea"
        name="goodsName"
        label="商品名称"
        label-width="50"
        maxlength="30"
        placeholder="请输入商品名字"
        :rules="[{ required: true, message: '商品名字不能为空！' }]"
      />
      <van-field
        v-model="description"
        type="textarea"
        name="description"
        label="商品描述"
        label-width="50"
        autosize
        placeholder="请描述商品"
        :rules="[{ required: true, message: '商品描述不能为空' }]"
      />
      <van-field
        v-model="price"
        type="number"
        name="price"
        label="价格"
        label-width="50"
        maxlength="40"
        placeholder="请输入价格"
        :rules="[{ required: true, message: '价格不能为空！' }]"
      />
      <van-field
        v-model="quantity"
        type="number"
        name="quantity"
        label="数量"
        label-width="50"
        maxlength="40"
        placeholder="商品数量"
        :rules="[{ required: true, message: '商品数量不能为空！' }]"
      />

      <van-field name="type" label="商品类型" label-width="50">
        <template #input>
          <van-radio-group v-model="type" direction="horizontal" class="radio-group">
            <van-radio name="电动车">电动车</van-radio>
            <van-radio name="手机">手机</van-radio>
            <van-radio name="电脑">电脑</van-radio>
            <van-radio name="书籍">书籍</van-radio>
            <van-radio name="运动">运动</van-radio>
            <van-radio name="其他">其他</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field name="imgUrl" label="上传商品图片" center label-width="50">
        <template #input>
          <van-uploader v-model="imgUrl" :max-count="4" multiple :after-read="afterRead" />
        </template>
      </van-field>

      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      goodsName: "",
      description: "",
      price: 0,
      // phone: "",
      quantity: 1,
      type: "电动车",
      imgUrl: [],
    };
  },
  computed: {
    ...mapState("m_user", ["userInfo"]),
  },
  methods: {
    // 发布商品
    onSubmit(form) {
      let _this = this;

      this.$dialog
        .confirm({
          title: "提示",
          message: "是否提交？",
        })
        .then(() => {
          let param = new FormData();
          let config = {
            "Content-Type": "multipart/form-data",
          };
          param.append("userId", _this.userInfo.userId);
          param.append("goodsName", form.goodsName);
          param.append("description", form.description);
          param.append("price", form.price);
          param.append("quantity", form.quantity);
          param.append("type", form.type);

          form.imgUrl.forEach((item) => {
            param.append("file", item.file, item.file.name);
          });

          // console.log(param.get("file"));
          // console.log(form);

          this.$http
            .post("/goods/add/information", param, config)
            .then((res) => {
              console.log(res);
              this.$toast({
                message: "已提交，请等待管理员审核",
              });
              setTimeout(() => {
                this.$router.push({ path: "/home" });
              }, 1500);
            })
            .catch((err) => {
              console.log(err);
            });
        });
    },

    // 上传图片
    afterRead(file) {
      console.log(file);
      console.log(file.file);
    },
  },

  mounted() {},
};
</script>

<style lang="scss" scoped>
.publish {
  background-color: #f7f8fa;
  height: 100vh;
  overflow: auto;
  padding-top: 46px;
  .form {
    padding-bottom: 20px;
    .radio-group {
      .van-radio {
        margin: 5px;
        width: 80px;
      }
    }
  }
}
</style>
