export default {
  sidebar: {
    authority: "权限",
    warehouse: "仓库",
    product: "商品",
    purchase: "采购",
    order: "订单",
    logistics:"物流",
    user: "客户",
    supplier: "供应商",
    shop: "门店",
    finance: "财务",
    shortLetter: "短信",
    customerService: "客服",
    gallery: "图库",
    marketing: "营销",
    distribution:"分销",
    data: "数据",
    information: "信息",
    community: "社区",
    personnelMatters: "人事",
    help: "帮助中心"
  },
  warehouse: {
    title: "库存管理",
    search: {
      title: "库存查询",
      list: {
        goods:"基础商品",
        check: "库存查询",
        notes: "库存记录",
        code: "唯一码管理"
      }
    },
    management: {
      title: "库存管理",
      list: {
        returnGoods: "退货",
        sale: "销售",
        allot: "库存调拨",
        ware: "商品报损",
        goods: "商品报溢",
        check: "库存盘点"
      }
    },
    BaseInformation: {
      title: "基体信息",
      list: {
        settings: "仓库设置",
        info: "商品基本资料",
        import: "数据导入",
        backups: "数据备份",
        restore: "数据还原"
      }
    }
  },
  power: {
    title: "权限管理",
    manage: {
      title: "账户管理",
      list: {
        userManagement:"用户管理",
        userList: "用户组管理",
        rolList: "角色管理",
      }
    },
    rbac: {
      title: "权限管理",
      list: {
        rbacsetting:"权限设置",
        menuManage:"菜单权限管理",
        systemManage:"系统权限管理",
      }
    },
  },
  product: {
    title: "商品中心",
    information: {
      title: "商品资料",
      list: {
        goods: "商品库",
        classify: "商品分类",
        brand:"品牌管理",
        unitLibrary:"单位库",
        attribute:"属性库"
      }
    },
    shop: {
      title: "门店商品",
      list: {
        returnGoods: "商店商品",
        sale: "商品分组",
      }
    },
    network: {
      title: "网店商品",
      list: {
        returnGoods: "网店商品",
        sale: "商品分组",
      }
    },
    virtualGoods: {
      title: "虚拟商品",
      list: {
        returnGoods: "虚拟商品",
        sale: "商品分组",
      }
    },
    BaseInformation: {
      title: "商品工具",
      list: {
        settings:"商品设置",
        info:"标签管理",
        import:"运费设置",
        backups:"配送价格",
        restore:"零售价格",
        generating:"生成商品代码",
        priceTag:"打印商品价签",
        ShapeModulationCode:"打印调形码",
      }
    }
  },
  bigdata: {
    title: "数据统计",
    search: {
      title: "数据统计",
      list: {
        datas: "数据统计",
        check: "产品统计",
        notes: "订单统计",
        code: "会员统计"
      }
    },
    management: {
      title: "报表管理",
      list: {
        returnGoods: "产品报表",
        sale: "订单报表",
        allot: "会员报表",
        ware: "支付报表",
        goods: "浏览量",
        check: "日志报表"
      }
    },
    BaseInformation: {
      title: "基本信息",
      list: {
        settings: "报表设置",
        info: "报表资料",
        import: "数据导入",
        backups: "数据备份",
        restore: "数据还原"
      }
    }
  },
  user: {
    title: "客户中心",
    management: {
      title: "客户管理",
      list: {
        information: "客户查询",
        securityCenter: "客户分群",
        mail: "客户导入",
        sms: "标签管理"
      }
    },
    data: {
      title: "权益管理",
      list: {
        dataImport:"权益卡",
        dataExport:"积分权益",
        dataBackup:"自定义权益",
      }
    },
    fundManagement: {
      title: "资金管理",
      list: {
        dataImport:"资金规则",
        dataExport:"资金查询",
        dataBackup:"运营管理",
      }
    }
  },
  pay:{
      title: "财务管理",
      management: {
        title: "收入管理",
        list: {
          list:"销售毛利",
          securityCenter: "销售明细",
          mail: "销售分佣",
          receipt: "收款对账",
          returnedMoney: "回款对账"
        }
      },
      costManagement: {
      title:"成本管理",
      list: {
        settings: "出入库单",
        info: "存货明细",
        import: "存货台账",
        backups: "存货批次",
        restore: "存货调整",
        workingExpenses: "经营费用"
      }
    },
    BaseInformations: {
      title:"结算管理",
      list: {
        settings: "采购结算",
        info: "加盟结算",
        import: "分用结算",
      }
    },
    paymentReceived: {
      title:"收付款管理",
      list: {
        settings: "付款管理",
        info: "采购管理",
        import: "采购退款",
        backups: "加盟退款",
        restore: "采购预付款",
        bargainMoney: "加盟预付款",
        bargainMoneys:"其他预付款"
      }
    },
    financialData: {
      title:"财务资料",
      list: {
        settings: "财务组织",
        info: "往来单位",
        import: "费用项",
      }
    }
  },
  order:{
    title: "订单中心",
    management: {
      title: "订单管理",
      list: {
        query:"订单查询",
        speedy: "快速打单",
        consignment: "销售发货",
        batch: "批量发货",
        selfRaising: "到店自提",
        refund: "退款维权",
        arrRefund: "批量退款",
        addOrder: "添加订单",
        assess: "售后评价",
      }
    }
  },
  logistics:{
    title: "物流中心",
    management: {
      title: "物流管理",
      list: {
        list:"物流查询",
        settings:"渠道设置",
        info:"配送设置",
      }
    }
  },
  message:{
    title: "短信中心",
    management: {
      title: "短信管理",
      list: {
        list:"短信列表",
        mail:"短信签名",
        channel:"短信渠道"
      }
    },
    sendTheManagement: {
      title: "发送管理",
      list: {
        securityCenter:"发送短信",
        applyFor:"短信发送申请",
        audit:"短信发送审核"
      }
    },
    template: {
      title:"模板管理",
      list: {
        securityCenter:"短信模板列表",
        applyFor:"添加短信模板"
      }
    },
  },
  confirm: {
    ok: "确认",
    cancel: "取消",
    content: "你确认要退出系统吗？",
    logout: "退 出"
  },
  userInfo: {
    info: "个人信息",
    password: "密码"
  },
  nav: {
    home: "首页", //首页
    pay:"支付中心",
    order:"订单中心"
  },
};
