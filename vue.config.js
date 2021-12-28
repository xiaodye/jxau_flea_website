module.exports = {
  pages: {
    index: {
      entry: "src/main.js", // page 的入口
    },
  },
  lintOnSave: false, //关闭语法检查
  configureWebpack: {
    resolve: {
      // 路径别名
      alias: {
        assets: "@/assets",
        components: "@/components",
        pages: "@/pages",
        util: "@/utils",
      },
    },
  },
};
