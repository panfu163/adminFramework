const product = [
  {
    path: "/",
    name: "pay",
    meta: {
      title: "支付列表",
      navigation: "pay" //处理导航显示-子路由需和父路由一至
    },
    component: () => import("@/views/pay/list.vue")
  }
];
export default product;
