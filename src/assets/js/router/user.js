const user = [
  {
    path: "/",
    name: "user",
    meta: {
      title: "基本信息", //显示在面包屑导航
      navigation: "user" //处理导航显示-子路由需和父路由一至
    },
    component: () =>
      import("@/views/user/list.vue")
  },
  {
    path: "/user/userlist",
    name: "userlist",
    meta: {
      title: "基本信息",
      navigation: "user" //处理导航显示-子路由需和父路由一至
    },
    component: () =>
      import("@/views/user/index.vue")
  },
  {
    path: "/user/details",
    name: "userDetailsdetails",
    meta: {
      title: "用户详情",
      navigation: "user" //处理导航显示-子路由需和父路由一至
    },
    component: () =>
      import("@/views/user/details.vue")
  }
];
export default user;
