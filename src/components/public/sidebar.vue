<!---
 --@author  PanFu
 --@data 2019-07-13:56
 --@description MOJOWeb-left 左侧导航
 --@version 1.0
--->
<template>
  <div class="sidebar" :style="{width:sidWidth+'px'}">
    <div class="title">
      <img src="@/assets/img/logo.png" />
    </div>
    <ul class="miansub">
      <li
        v-for="(item, index) in navigations"
        :key="index"
        :class="{ active: isActive == item.url }"
        @click="getNavigation(item)"
        :title="isShow?'':item.title"
      >
        <i :class="[item.icon,{on:!isShow}]"></i>
        <template v-if="isShow">{{ item.title }}</template>
      </li>
    </ul>
    <div class="help">
      <i class="el-icon-warning-outline"></i>{{ $t("sidebar.help") }}
    </div>
    <div v-if="isShow" @click="getSfold" class="sfold el-icon-s-fold"></div>
    <div v-else @click="getSfold" class="sfold el-icon-s-unfold"></div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 117px;
  background-color: #273543;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -moz-box-orient: vertical;
  -moz-box-direction: normal;
  flex-direction: column;
  z-index: 2;
  transform:translate(0,0);
  transition:0.3s;
  .title {
    height: 50px;
    line-height: 50px;
    overflow: hidden;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    color: #fff;
    font-size: 18px;
    width: 100%;
    overflow: hidden;
    img {
      width: 30px;
      height: auto;
      border-radius: 50%;
      background: #fff;
      margin: 10px auto;
      display: block;
    }
  }
  .miansub {
    width: 100%;
    text-align: center;
    li {
      display: flex;
      color: #c8c9cc;
      text-align: left;
      cursor: pointer;
      font-size: 14px;
      overflow: hidden;
      line-height: 1;
      padding: 10px 10px;
      &.active {
        @include background("background");
        color: $white;
      }
      i {
        padding-right: 5px;
        &.on{
          margin:0 auto;
        }
      }
    }
  }
  .help {
    position: absolute;
    left: 0;
    bottom: 0;
    text-align: center;
    padding: 10px;
    font-size: 12px;
    color: #fff;
    cursor: pointer;
    i {
      padding-right: 3px;
    }
  }
  .sfold{
    position: absolute;
    top: 15px;
    right:-20px;
    z-index:9;
    cursor: pointer;
  }
}
</style>

<script>
export default {
  data() {
    return {
      isActive: "", //选中
      reg: /^\/[0-9a-zA-Z]*.*?/,
      sidWidth:117,
      isShow:true,

    };
  },
  computed: {
    navigations() {
      return [
        {
          title: this.$t("sidebar.authority"), //权限
          url: "/power",
          name: "权限列表",
          icon: "el-icon-s-tools"
        },
        {
          title: this.$t("sidebar.warehouse"), //仓库
          url: "/warehouse",
          name: "库存查询",
          icon: "el-icon-s-platform"
        },
        {
          title: this.$t("sidebar.product"), //"产品",
          url: "/product",
          name: "产品查询",
          icon: "el-icon-s-management"
        },
        {
          title: this.$t("sidebar.purchase"), //"采购",
          url: "",
          icon: "el-icon-s-marketing"
        },
        {
          title: this.$t("sidebar.order"), //"订单",
          url: "",
          icon: "el-icon-goods"
        },
        {
          title: this.$t("sidebar.user"), //"会员",
          url: "/user",
          name: "基本信息",
          icon: "el-icon-user-solid"
        },
        {
          title: this.$t("sidebar.supplier"), //"供应商",
          url: "",
          icon: "el-icon-s-check"
        },
        {
          title: this.$t("sidebar.shop"), //"店铺",
          url: "",
          icon: "el-icon-s-shop"
        },
        {
          title: this.$t("sidebar.finance"), //"财务",
          url: "",
          icon: "el-icon-s-shop"
        },
        {
          title: this.$t("sidebar.shortLetter"), //"短信",
          url: "",
          icon: "el-icon-chat-line-round"
        },
        {
          title: this.$t("sidebar.customerService"), //"客服",
          url: "",
          icon: "el-icon-phone"
        },
        {
          title: this.$t("sidebar.gallery"), //"图库",
          url: "",
          icon: "el-icon-picture"
        },
        {
          title: this.$t("sidebar.marketing"), // "营销",
          url: "",
          icon: "el-icon-s-flag"
        },
        {
          title: this.$t("sidebar.data"), //"数据",
          url: "/bigdata",
          name: "数据统计",
          icon: "el-icon-coin"
        },
        {
          title: this.$t("sidebar.information"), //"信息",
          url: "",
          icon: "el-icon-view"
        },
        {
          title: this.$t("sidebar.community"), //"社区",
          url: "",
          icon: "el-icon-coffee-cup"
        },
        {
          title: this.$t("sidebar.personnelMatters"), //"OA",
          url: "",
          icon: "el-icon-s-opportunity"
        }
      ];
    }
  },
  mounted() {
    console.log("我是side");
    let str = this.$route.path;
    let array = str.match(this.reg)[0]; //处理子路由取父路由
    this.isActive = array; //处理导航选中
    //this.isActive=localStorage.getItem("serviceAddress")?localStorage.getItem("serviceAddress") : "会员";//分服务包才用得到
  },
  methods: {
    getNavigation(item) {
      if (item.url) {
        this.isActive = item.url;
        this.$router.push({ path: item.url }); //跳转地址
        localStorage.setItem("headTitle", item.title);
        //localStorage.getItem("serviceAddress",item.url);//分服务包才用得到
        this.bus.$emit("headTitle", item.title); //子组件传值
        //window.location.href = "/#/"+url;
      } else {
        this.$message("跳转地址没有配置");
      }
    },
    getSfold(){
       if(this.isShow){
         this.sidWidth=40;
       }else{
         this.sidWidth=117;
       }
      this.isShow = !this.isShow;
      this.bus.$emit("sfold",!this.isShow); //子组件传值
    }
  },
  watch: {
    $route(to) {
      //单页处理
      //在mounted函数执行的方法，放到该处
      let str = to.path;
      let array = str.match(this.reg)[0]; //处理子路由取父路由
      this.isActive = array; //处理导航选中
    }
  }
};
</script>
