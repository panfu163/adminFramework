const product = [
  {
    path: "/",
    name: "product",
    meta: {
      title: "库存查询",
      navigation: "product" //处理导航显示-子路由需和父路由一至
    },
    component: () =>
      import("@/views/product/index.vue")
  }
];
export default product;
