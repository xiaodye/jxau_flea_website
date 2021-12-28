<template>
  <div id="app">
    <TabBar v-show="$route.meta.showTabBar"></TabBar>

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
// import { Button } from "vant";

import TabBar from "components/TabBar.vue";
export default {
  name: "App",
  components: {
    // [Button.name]: Button,
    TabBar,
  },
  mounted() {},
};
</script>

<style lang="scss">
@import url(assets/css/base.css);
body {
  width: 100%;
  display: flex;
  justify-content: center;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  width: 100%;
  max-width: 475px;
}

// iconfont
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
