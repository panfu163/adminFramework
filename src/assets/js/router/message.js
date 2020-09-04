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
  },{
    path: "/message/signature",
    name: "messagesignature",
    meta: {
      title: "短信签名",
      navigation: "message" //处理导航显示-子路由需和父路由一至
    },
    component: () =>
        import("@/views/message/signature.vue")
  },{
    path: "/message/template",
    name: "messagetemplate",
    meta: {
      title: "短信模板",
      navigation: "message" //处理导航显示-子路由需和父路由一至
    },
    component: () =>
        import("@/views/message/template.vue")
  },{
    path: "/message/addTemplate",
    name: "messageaddTemplate",
    meta: {
      title: "添加短信模板",
      navigation: "message" //处理导航显示-子路由需和父路由一至
    },
    component: () =>
        import("@/views/message/addTemplate.vue")
  },{
    path: "/message/send",
    name: "messagesend",
    meta: {
      title: "人工发送",
      navigation: "message" //处理导航显示-子路由需和父路由一至
    },
    component: () =>
        import("@/views/message/send.vue")
  },{
    path: "/message/applyFor",
    name: "messageapplyFor",
    meta: {
      title: "短信发送申请",
      navigation: "message" //处理导航显示-子路由需和父路由一至
    },
    component: () =>
        import("@/views/message/applyFor.vue")
  },{
    path: "/message/addApplyFor",
    name: "messageaddApplyFor",
    meta: {
      title: "短信发送申请",
      navigation: "message" //处理导航显示-子路由需和父路由一至
    },
    component: () =>
        import("@/views/message/addApplyFor.vue")
  },{
    path: "/message/audit",
    name: "message",
    meta: {
      title: "短信发送审核",
      navigation: "message" //处理导航显示-子路由需和父路由一至
    },
    component: () =>
        import("@/views/message/audit.vue")
  },{
    path: "/message/company",
    name: "messagecompany",
    meta: {
      title: "短信渠道",
      navigation: "message" //处理导航显示-子路由需和父路由一至
    },
    component: () =>
        import("@/views/message/company.vue")
  },{
    path: "/message/addAudit",
    name: "messagecompany",
    meta: {
      title: "审核内容",
      navigation: "message" //处理导航显示-子路由需和父路由一至
    },
    component: () =>
        import("@/views/message/addAudit.vue")
  }
];
export default product;
