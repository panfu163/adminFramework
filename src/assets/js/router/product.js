const product = [
  {
    path: "/",
    name: "product",
    meta: {
      title: "产品查询",
      navigation: "product" //处理导航显示-子路由需和父路由一至
    },
    component: () => import("@/views/product/list.vue")
  },
  {
    path: "/product/addProduct",
    name: "addProduct",
    meta: {
      title: "添加商品",
      navigation: "product" //处理导航显示-子路由需和父路由一至
    },
    component: () => import("@/views/product/addProduct.vue")
  },
  {
    path: "/product/classify",
    name: "classifyProduct",
    meta: {
      title: "商品分类",
      navigation: "product" //处理导航显示-子路由需和父路由一至
    },
    component: () => import("@/views/product/classify.vue")
  },
  {
    path: "/product/brand",
    name: "brandProduct",
    meta: {
      title: "品牌管理",
      navigation: "product" //处理导航显示-子路由需和父路由一至
    },
    component: () => import("@/views/product/brand.vue")
  }
];
export default product;
