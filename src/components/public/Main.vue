<!---
 --@author  PanFu
 --@data 2019-07-13:56
 --@description MOJOWeb-left 左侧导航
 --@version 1.0
--->
<template>
  <el-container>
    <heads></heads>
    <div
      class="side"
      :style="{ height: isHeight + 'px' }"
      :class="{ on: sfold }"
    >
      <sidebar></sidebar>
      <menus></menus>
    </div>
    <tags></tags>

    <div
      class="min"
      :style="{ height: isHeight - 165 + 'px' }"
      :class="{ on: sfold }"
    >
      <transition name="slide-fade">
        <router-view></router-view>
      </transition>
    </div>

    <footers></footers>
  </el-container>
</template>

<script>
import heads from "@/components/public/head";
import sidebar from "@/components/public/sidebar";
import tags from "@/components/public/tag";
import menus from "@/components/public/menu";
import footers from "@/components/public/footer";
export default {
  name: "Main",
  components: {
    heads,
    sidebar,
    tags,
    menus,
    footers
  },
  data() {
    return {
      sfold: false,
      isHeight: ""
    };
  },
  mounted() {
    this.bus.$on("sfold", res => {
      this.sfold = res;
    });
    //设置高度
    this.isHeight = document.documentElement.clientHeight;
    window.onresize = () => {
      this.isHeight = document.documentElement.clientHeight;
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.side {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  box-sizing: border-box;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -moz-box-orient: vertical;
  -moz-box-direction: normal;
  flex-direction: column;
  overflow: hidden;
  z-index: 2;
  width: 284px;
  transform: translate(0, 0);
  transition: 0.3s;
  &.on {
    width: 213px;
  }
}
.min {
  position: absolute;
  top: 100px;
  bottom: 0;
  left: 284px;
  width: calc(99.5% - 284px);
  height: calc(100%- 70px);
  box-sizing: border-box;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -moz-box-orient: vertical;
  -moz-box-direction: normal;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 2;
  transform: translate(0, 0);
  transition: 0.3s;
  &.on {
    width: calc(99.5% - 214px);
    left: 214px;
  }
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.8s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.3, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
  transform:translate(10px,0);
  opacity: 0;
}
</style>
