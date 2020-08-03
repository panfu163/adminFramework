const bigdata = [
  {
    path: "/",
    name: "bigdata",
    meta: {
      title: "数据统计",
      navigation: "bigdata" //处理导航显示-子路由需和父路由一至
    },
    component: () =>
      import("@/views/bigdata/index.vue")
  },
  {
    path: "/bigdata/paylist",
    name: "paylist",
    meta: {
      title: "支付报表",
      navigation: "bigdata" //处理导航显示-子路由需和父路由一至
    },
    component: () =>
      import("@/views/bigdata/paylist.vue")
  }
];
export default bigdata;
