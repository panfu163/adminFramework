<!---
 --@author  PanFu
 --@data 2019-07-13:56
 --@description MOJOWeb-index
 --@version 1.0
--->
<template>
  <div class="head" :class="{on:sfold}">
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="grid-left">
          <template v-for="item in routes" v-if="item.children">
            <el-breadcrumb
              class="breadcrumb"
              separator="/"
              v-if="item.path == '/' + path"
            >
              <el-breadcrumb-item :to="{ path: '/' }">
                {{ $t("nav.home") }}</el-breadcrumb-item
              >
              <el-breadcrumb-item :to="{ path: item.path }">{{
                pathName
              }}</el-breadcrumb-item>
              <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
            </el-breadcrumb>
          </template>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-right">
          <el-dropdown>
            <span class="el-dropdown-link">
              主题切换<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="getThemes('red')"
                >红色</el-dropdown-item
              >
              <el-dropdown-item @click.native="getThemes('blue')"
                >蓝色</el-dropdown-item
              >
              <el-dropdown-item @click.native="getThemes('yellow')"
                >黄色</el-dropdown-item
              >
              <el-dropdown-item @click.native="getThemes('green')"
                >绿色</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <el-dropdown>
            <span class="el-dropdown-link">
              语言切换<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="getlocale('zh')"
                >中文简体</el-dropdown-item
              >
              <el-dropdown-item @click.native="getlocale('en')"
                >English</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
          <i
            v-if="isFullScreen"
            @click="fullScreen()"
            class="el-icon-full-screen"
          ></i>
          <i v-if="!isFullScreen" @click="exitScreen()" class="el-icon-aim"></i>
          <span class="badge-item">
            <i class="el-icon-message-solid"></i>
            <i class="badge">99</i>
          </span>
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar>
          <el-dropdown>
            <span class="el-dropdown-link">
              panfu<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item class="clearfix">
                消息
                <el-badge class="mark" :value="12" />
              </el-dropdown-item>
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item divided>退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import theme from "assets/js/common/theme.js";
export default {
  name: "top",
  data() {
    return {
      isFullScreen: true,
      routes: "", //所有的路由
      pathName: "",
      path: "",
      sfold:false
    };
  },
  mounted() {
    this.bus.$on("sfold",res=>{
      console.log(res);
      this.sfold=res;
    });
    this.getOnresize();
    this.routes = this.$router.options.routes;
    this.path = this.$route.meta.navigation;
    this.bus.$on("headTitle", res => {
      this.pathName = res;
    });
    this.pathName = localStorage.getItem("headTitle")
      ? localStorage.getItem("headTitle")
      : "数据";
  },
  methods: {
    //切换主题
    getThemes(themes) {
      theme.getTheme(themes);
    },
    //切换语言
    getlocale(locale) {
      this.$i18n.locale = locale;
      localStorage.setItem("lang", locale);
    },
    //全屏
    fullScreen() {
      this.isFullScreen = false;
      let element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      }
    },
    //退出全屏
    exitScreen() {
      this.isFullScreen = true;
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    },
    //监听window是否全屏，并进行相应的操作,支持esc键退出
    getOnresize() {
      let $this = this;
      //监听window是否全屏，并进行相应的操作,支持esc键退出
      window.onresize = function() {
        var isFull = !!(
          document.webkitIsFullScreen ||
          document.mozFullScreen ||
          document.msFullscreenElement ||
          document.fullscreenElement
        ); //!document.webkitIsFullScreen都为true。因此用!!
        if (isFull === false) {
          $this.isFullScreen = true;
        } else {
          $this.isFullScreen = false;
        }
      };
    }
  },
  watch: {
    $route(to) {
      //单页处理
      //在mounted函数执行的方法，放到该处
      this.path = to.meta.navigation;
    }
  }
};
</script>

<style lang="scss" scoped>
.head {
  position: absolute;
  top: 0;
  left: 264px;
  height: 50px;
  width: calc(100% - 254px);
  padding: 0 20px;
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
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
  min-width: 600px;
  transform:translate(0,0);
  transition:0.3s;
  &.on{
    width: calc(100% - 200px);
    left: 200px;
  }
  .grid-left {
    line-height: 50px;
    .breadcrumb {
      margin: 15px 0 0 20px;
    }
  }
  .grid-right {
    text-align: right;
    line-height: 50px;
    cursor: pointer;
    font-size: 20px;
    .el-avatar--circle {
      vertical-align: middle;
      margin-right: 10px;
    }
    .el-icon-arrow-down {
      padding-left: 0;
    }
    .badge-item {
      position: relative;
      padding: 0 10px;
      .badge {
        position: absolute;
        top: -7px;
        right: 0px;
        background: red;
        color: #fff;
        border-radius: 50%;
        display: block;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        font-size: 12px;
        font-style: normal;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        overflow: hidden;
      }
    }
    .el-icon-full-screen {
      padding: 0 20px;
    }
  }
}
</style>
