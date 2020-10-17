const bigdata = [
  {
    path: "/",
    name: "humanResource",
    meta: {
      title: "组织结构",
      navigation: "humanResource" //处理导航显示-子路由需和父路由一至
    },
    component: () => import("@/views/humanResource/org.vue")
  },
  {
    path: "/humanResource/list",
    name: "list",
    meta: {
      title: "员工信息",
      navigation: "humanResource" //处理导航显示-子路由需和父路由一至
    },
    component: () => import("@/views/humanResource/list.vue")
  }
];
export default bigdata;
