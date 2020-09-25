import Vue from "vue";
import Router from "vue-router";
import Main from "@/components/layout/Main";

//导入
import NProgress from "nprogress";
import "@@/css/nprogress/nprogress.css";

//子路由
import power from "assets/js/router/power"; //权限管理
import warehouse from "assets/js/router/warehouse"; //库存管理
import product from "assets/js/router/product"; //产品管理
import bigdata from "assets/js/router/bigdata"; //大数据管理
import user from "assets/js/router/user"; //会员管理
import pay from "assets/js/router/pay"; //支付管理管理
import order from "assets/js/router/order"; //订单管理管理
import message from "assets/js/router/message"; //短信管理
import logistics from "assets/js/router/logistics"; //物流管理

Vue.use(Router);
const router = new Router({
  //mode: "history",
  routes: [
    {
      path: "/",
      name: "index",
      redirect: "/bigdata" //重定向url地址
    },
    {
      path: "/login",
      name: "login",
      meta: {
        title: "产品中心"
      },
      component: () => import("@/views/management/login.vue")
    },
    {
      path: "/404",
      name: "404",
      meta: {
        title: "404错误"
      },
      component: () => import("@/views/management/404.vue")
    },
    {
      path: "/power",
      component: Main,
      children: power
    },
    {
      path: "/warehouse",
      component: Main,
      children: warehouse
    },
    {
      path: "/product",
      component: Main,
      children: product
    },
    {
      path: "/bigdata",
      component: Main,
      children: bigdata
    },
    {
      path: "/user",
      component: Main,
      children: user
    },
    {
      path: "/order",
      component: Main,
      children: order
    },
    {
      path: "/pay",
      component: Main,
      children: pay
    },
    {
      path: "/message",
      component: Main,
      children: message
    },
    {
      path: "/logistics",
      component: Main,
      children: logistics
    },
    {
      path: "*",
      name: "404错误页",
      redirect: "/404"
    }
  ]
});

//处理登录信息
router.beforeEach(function(to, from, next) {
  NProgress.start(); // 设置加载进度条(开始..)
  if (!localStorage.getItem("userInfo")) {
    //查看用户信息是否存在
    if (to.path !== "/login") {
      return next("/login");
    }
  }
  next();
});
router.afterEach(() => {
  NProgress.done(); // 设置加载进度条(结束..)
});
export default router;
