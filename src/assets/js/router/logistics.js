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
  },
  {
    path: "/logistics/details",
    name: "logisticsDetails",
    meta: {
      title: "物流详情",
      navigation: "logistics" //处理导航显示-子路由需和父路由一至
    },
    component: () =>
        import("@/views/logistics/details.vue")
  },{
    path: "/logistics/company",
    name: "logisticscompany",
    meta: {
      title: "物流公司",
      navigation: "logistics" //处理导航显示-子路由需和父路由一至
    },
    component: () =>
        import("@/views/logistics/company.vue")
  }
];
export default product;
