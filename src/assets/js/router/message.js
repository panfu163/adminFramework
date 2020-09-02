const product = [
  {
    path: "/",
    name: "message",
    meta: {
      title: "短信列表",
      navigation: "message" //处理导航显示-子路由需和父路由一至
    },
    component: () =>
      import("@/views/message/list.vue")
  }
];
export default product;
