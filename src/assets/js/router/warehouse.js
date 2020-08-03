const warehouse = [
  {
    path: "/",
    name: "warehouse",
    meta: {
      title: "库存查询",
      navigation: "warehouse" //处理导航显示-子路由需和父路由一至
    },
    component: () =>
      import("@/views/warehouse/list.vue")
  },
  {
    path: "/warehouse",
    name: "shop",
    meta: {
      title: "供应商管理",
      navigation: "warehouse" //处理导航显示-子路由需和父路由一至
    },
    component: () =>
      import("@/views/warehouse/index.vue")
  },
  {
    path: "/warehouse/InventoryFlow",
    name: "InventoryFlow",
    meta: {
      title: "库存流水",
      navigation: "warehouse" //处理导航显示-子路由需和父路由一至
    },
    component: () =>
      import("@/views/warehouse/InventoryFlow.vue")
  },
  {
    path: "/warehouse/uniqueCode",
    name: "uniqueCode",
    meta: {
      title: "唯一码管理",
      navigation: "warehouse" //处理导航显示-子路由需和父路由一至
    },
    component: () =>
      import("@/views/warehouse/uniqueCode.vue")
  }
];
export default warehouse;
