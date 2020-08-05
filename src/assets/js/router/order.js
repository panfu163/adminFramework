const product = [
  {
    path: "/",
    name: "order",
    meta: {
      title: "订单列表",
      navigation: "order" //处理导航显示-子路由需和父路由一至
    },
    component: () =>
      import("@/views/order/list.vue")
  }
];
export default product;
