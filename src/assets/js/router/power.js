const power = [
  {
    path: "/",
    name: "power",
    meta: {
      title: "用户管理",
      navigation: "power" //处理导航显示-子路由需和父路由一至
    },
    component: () =>
      import(/*webpackChunkName:"power"*/ "@/views/power/list.vue")
  },
  {
    path: "/power/userlist",
    name: "rollist",
    meta: {
      title: "用户组管理",
      navigation: "power" //处理导航显示-子路由需和父路由一至
    },
    component: () =>
        import(/*webpackChunkName:"rollist"*/ "@/views/power/userlist.vue")
  },
  {
    path: "/power/rollist",
    name: "powerrollist",
    meta: {
      title: "角色管理",
      navigation: "power" //处理导航显示-子路由需和父路由一至
    },
    component: () =>
      import(/*webpackChunkName:"rollist"*/ "@/views/power/rollist.vue")
  },
  {
    path: "/power/rbacsetting",
    name: "rbacsetting",
    meta: {
      title: "权限设置",
      navigation: "power" //处理导航显示-子路由需和父路由一至
    },
    component: () =>
        import(/*webpackChunkName:"rbacsetting"*/ "@/views/power/rbacsetting.vue")
  },
  {
    path: "/power/addUserGroup",
    name: "addUserGroup",
    meta: {
      title: "添加用户组",
      navigation: "power" //处理导航显示-子路由需和父路由一至
    },
    component: () =>
        import(/*webpackChunkName:"poweraddUser"*/ "@/views/power/addUserGroup.vue")
  },
  {
    path: "/power/addRol",
    name: "poweraddRol",
    meta: {
      title: "添加角色组",
      navigation: "power" //处理导航显示-子路由需和父路由一至
    },
    component: () =>
        import(/*webpackChunkName:"poweraddUser"*/ "@/views/power/addRol.vue")
  },
  {
    path: "/power/addUser",
    name: "addUser",
    meta: {
      title: "添加用户",
      navigation: "power" //处理导航显示-子路由需和父路由一至
    },
    component: () =>
        import(/*webpackChunkName:"poweraddUser"*/ "@/views/power/addUser.vue")
  },
  {
    path: "/power/details", //用户详情
    name: "powerdetails",
    meta: {
      title: "用户详情",
      navigation: "power" //处理导航显示-子路由需和父路由一至
    },
    component: () =>
        import(/*webpackChunkName:"poweraddUser"*/ "@/views/power/details.vue")
  },{
    path: "/power/userDetails", //用户详情
    name: "userDetails",
    meta: {
      title: "用户组祥情",
      navigation: "power" //处理导航显示-子路由需和父路由一至
    },
    component: () =>
        import(/*webpackChunkName:"poweraddUser"*/ "@/views/power/userDetails.vue")
  },{
    path: "/power/rolDetails", //角色详情
    name: "rolDetails",
    meta: {
      title: "角色详情",
      navigation: "power" //处理导航显示-子路由需和父路由一至
    },
    component: () =>
        import(/*webpackChunkName:"poweraddUser"*/ "@/views/power/rolDetails.vue")
  },{
    path: "/power/menuList", //菜单管理
    name: "menuList",
    meta: {
      title: "菜单管理",
      navigation: "power" //处理导航显示-子路由需和父路由一至
    },
    component: () =>
        import(/*webpackChunkName:"rolDetails"*/ "@/views/power/menuList.vue")
  },{
    path: "/power/systemList", //系统管理
    name: "systemList",
    meta: {
      title: "系统管理",
      navigation: "power" //处理导航显示-子路由需和父路由一至
    },
    component: () =>
        import(/*webpackChunkName:"systemList"*/ "@/views/power/systemList.vue")
  }
];
export default power;
