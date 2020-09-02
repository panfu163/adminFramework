const product = [
  {
    path: "/",
    name: "logistics",
    meta: {
      title: "物流查询",
      navigation: "logistics" //处理导航显示-子路由需和父路由一至
    },
    component: () =>
      import("@/views/logistics/list.vue")
  }
];
export default product;
