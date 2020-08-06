<!---
 --@author  PanFu
 --@data 2019-07-13:56
 --@description MOJOWeb-left 左侧导航
 --@version 1.0
--->
<template>
  <el-container>
    <heads></heads>
    <div class="side" :style="{height:isHeight+'px'}" :class="{on:sfold}">
      <sidebar></sidebar>
      <menus></menus>
    </div>
    <tags></tags>
    <div class="min" :style="{height:isHeight+'px'}" :class="{on:sfold}">
      <router-view></router-view>
    </div>
  </el-container>
</template>

<script>
import heads from "@/components/public/head";
import sidebar from "@/components/public/sidebar";
import tags from "@/components/public/tag";
import menus from "@/components/public/menu";

export default {
  name: "Main",
  components: {
    heads,
    sidebar,
    tags,
    menus
  },
  data() {
    return {
      sfold:false,
      isHeight:"",
    };
  },
  mounted() {
    this.bus.$on("sfold",res=>{
      this.sfold=res;
    });
    //设置高度
    this.isHeight=document.documentElement.clientHeight;
    window.onresize=()=>{
        this.isHeight=document.documentElement.clientHeight;
      }
  },
  methods: {},
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
  transform:translate(0,0);
  transition:0.3s;
  &.on{
    width:213px;
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
  overflow-x:hidden;
  overflow-y:auto;
  z-index: 2;
  padding-bottom:100px;
  transform:translate(0,0);
  transition:0.3s;
  &.on{
    width: calc(99.5% - 214px);
    left:214px;
  }
}
</style>
