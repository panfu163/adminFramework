<!---
 --@author  PanFu
 --@data 2019-07-13:56
 --@description MOJOWeb-left 菜单管理
 --@version 1.0
--->
<template>
  <div
      class="min-menu"
      :class="{ on: sfold }"
  >
    <div class="title">
      {{ $t(pathName + ".title") }}
    </div>
    <el-menu
        v-for="(items, indexs) in listData"
        v-if="items.name == pathName"
        :key="indexs"
        class="el-menu-vertical-demo"
        :default-openeds="openeds"
        :default-active="defaultActive"
    >
      <el-submenu
          v-for="(item, indexs) in items.list"
          :key="indexs"
          :index="(indexs + 1).toString()"
      >
        <template slot="title">
          <i :class="item.icon" />
          <span>{{ item.title }}</span>
        </template>

        <template v-for="(items, index) in item.data">
          <el-submenu
              v-if="items.children"
              :index="(indexs + 1).toString()+'_'+(index + 1).toString()"
          >
            <template slot="title">
              {{ items.title }}
            </template>
            <el-menu-item
                v-for="(itemChild,i) in items.children"
                :index="itemChild.url"
                @click="goto(itemChild)"
            >
              {{ itemChild.title }}
            </el-menu-item>
          </el-submenu>
          <el-menu-item-group v-else>
            <el-menu-item
                :key="index"
                :index="items.url"
                @click="goto(items)"
            >
              {{ items.title }}
            </el-menu-item>
          </el-menu-item-group>
        </template>
      </el-submenu>
    </el-menu>
  </div>
</template>
<style lang="scss">
.min-menu {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 118px;
  height: 100%;
  box-sizing: border-box;
  width: 160px;
  background: #eee;
  overflow: hidden;
  color: #323233;
  background: #fff;
  transform: translate(0, 0);
  transition: 0.3s;
  border-right: 1px solid #e5e5e5;
  &.on {
    left: 40px;
  }
  .title {
    background: #fff;
    height: 50px;
    line-height: 50px;
    overflow: hidden;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    border-bottom: 1px solid #e5e5e5;
  }
  .el-menu {
    border: 0;
    overflow-x: hidden;
    overflow-y: auto;
    height: calc(100% - 50px);
  }
  .el-menu-vertical-demo {
    width: 100%;
    box-sizing: border-box;
    .el-submenu__title {
      height: 40px;
      line-height: 40px;
    }
    .el-menu-item-group {
      width: 100%;
      box-sizing: border-box;
      .el-menu-item-group__title {
        display: none;
      }
      .el-menu-item {
        width: 100%;
        box-sizing: border-box;
        min-width: 100px;
        height: 40px;
        line-height: 40px;
      }
    }
    .el-menu-item {
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>
<script>
export default {
  data() {
    return {
      openeds: ["1", "2", "3", "4"], //设置菜单栏展开3个需要展开的菜单导航
      defaultActive: "", //当前选中
      tagData: this.$store.state.tag,
      pathName: "", //根据路径来判断子导航,
      sfold: false //小导航改成true
    };
  },
  computed: {
    listData() {
      return [
        {
          name: "warehouse", //name名字需和路由name一致来处理导航
          list: [
            {
              title: this.$t("warehouse.search.title"),
              icon: "el-icon-search",
              id: "1",
              data: [
                {
                  title: this.$t("warehouse.search.list.goods"),
                  url: "/warehouse/goods"
                },
                {
                  title: this.$t("warehouse.search.list.check"),
                  url: "/warehouse"
                },
                {
                  title: this.$t("warehouse.search.list.notes"),
                  url: "/warehouse/InventoryFlow"
                },
                {
                  title: this.$t("warehouse.search.list.code"),
                  url: "/warehouse/uniqueCode"
                }
              ]
            },
            {
              title: this.$t("warehouse.management.title"),
              icon: "el-icon-monitor",
              id: "2",
              data: [
                {
                  title: this.$t("warehouse.management.list.returnGoods"),
                  url: ""
                },
                {
                  title: this.$t("warehouse.management.list.sale"),
                  url: ""
                },
                {
                  title: this.$t("warehouse.management.list.allot"),
                  url: ""
                },
                {
                  title: this.$t("warehouse.management.list.ware"),
                  url: ""
                },
                {
                  title: this.$t("warehouse.management.list.goods"),
                  url: ""
                },
                {
                  title: this.$t("warehouse.management.list.check"),
                  url: ""
                }
              ]
            },
            {
              title: this.$t("warehouse.BaseInformation.title"),
              icon: "el-icon-setting",
              id: "2",
              data: [
                {
                  title: this.$t("warehouse.BaseInformation.list.settings"),
                  url: ""
                },
                {
                  title: this.$t("warehouse.BaseInformation.list.info"),
                  url: ""
                },
                {
                  title: this.$t("warehouse.BaseInformation.list.import"),
                  url: ""
                },
                {
                  title: this.$t("warehouse.BaseInformation.list.backups"),
                  url: ""
                },
                {
                  title: this.$t("warehouse.BaseInformation.list.restore"),
                  url: ""
                }
              ]
            }
          ]
        },
        {
          name: "power",
          list: [
            {
              title: this.$t("power.manage.title"),
              icon: "el-icon-search",
              id: "1",
              data: [
                {
                  title: this.$t("power.manage.list.userList"),
                  url: "/power/userList"
                },
                {
                  title: this.$t("power.manage.list.rol"),
                  url: "/power/rolList",
                  children:[{
                    title: this.$t("power.manage.list.rollist"),
                    url: "/power/rolList",
                  },{
                    title: this.$t("power.manage.list.rolAdd"),
                    url: "/power/addRol",
                  }]
                },
                {
                  title: this.$t("power.manage.list.userManagement"),
                  children:[{
                    title: this.$t("power.manage.list.userManagementList"),
                    url: "/power",
                  },{
                    title: this.$t("power.manage.list.userAdd"),
                    url: "/power/addUser",
                  }]
                }
              ]
            },
            {
              title: this.$t("power.rbac.title"),
              icon: "el-icon-monitor",
              id: "2",
              data: [
                {
                  title: this.$t("power.rbac.list.rbacsetting"),
                  url: "/power/rbacsetting"
                },
                {
                  title: this.$t("power.rbac.list.systemManage"),
                  url: "/power/systemList"
                },
                {
                  title: this.$t("power.rbac.list.menuManage"),
                  url: "/power/menuList"
                }
              ]
            }
          ]
        },
        {
          name: "product",
          list: [
            {
              title: this.$t("product.information.title"),
              icon: "el-icon-search",
              id: "1",
              data: [
                {
                  title: this.$t("product.information.list.goods"),
                  children:[{
                    title: this.$t("product.information.list.list"),
                    url: "/product"
                  },{
                    title: this.$t("product.information.list.addGoods"),
                    url: "/product/addProduct"
                  }]
                },
                {
                  title: this.$t("product.information.list.classify"),
                  url: "/product/classify"
                },
                {
                  title: this.$t("product.information.list.brand"),
                  url: "/product/brand"
                },
                {
                  title: this.$t("product.information.list.unitLibrary"),
                  url: "/product/units"
                },
                {
                  title: this.$t("product.information.list.attribute"),
                  url: "/product/attrs"
                }
              ]
            },
            {
              title: this.$t("product.shop.title"),
              icon: "el-icon-monitor",
              id: "2",
              data: [
                {
                  title: this.$t("product.shop.list.returnGoods"),
                  url: ""
                },
                {
                  title: this.$t("product.shop.list.sale"),
                  url: ""
                }
              ]
            },
            {
              title: this.$t("product.network.title"),
              icon: "el-icon-mobile-phone",
              id: "2",
              data: [
                {
                  title: this.$t("product.network.list.returnGoods"),
                  url: ""
                },
                {
                  title: this.$t("product.network.list.sale"),
                  url: ""
                }
              ]
            },
            {
              title: this.$t("product.virtualGoods.title"),
              icon: "el-icon-cloudy",
              id: "2",
              data: [
                {
                  title: this.$t("product.virtualGoods.list.returnGoods"),
                  url: ""
                },
                {
                  title: this.$t("product.virtualGoods.list.sale"),
                  url: ""
                }
              ]
            },
            {
              title: this.$t("product.BaseInformation.title"),
              icon: "el-icon-setting",
              id: "2",
              data: [
                {
                  title: this.$t("product.BaseInformation.list.settings"),
                  url: ""
                },
                {
                  title: this.$t("product.BaseInformation.list.info"),
                  url: ""
                },
                {
                  title: this.$t("product.BaseInformation.list.import"),
                  url: ""
                },
                {
                  title: this.$t("product.BaseInformation.list.backups"),
                  url: ""
                },
                {
                  title: this.$t("product.BaseInformation.list.restore"),
                  url: ""
                },
                {
                  title: this.$t("product.BaseInformation.list.generating"),
                  url: ""
                },
                {
                  title: this.$t("product.BaseInformation.list.priceTag"),
                  url: ""
                },
                {
                  title: this.$t(
                      "product.BaseInformation.list.ShapeModulationCode"
                  ),
                  url: ""
                }
              ]
            }
          ]
        },
        {
          name: "bigdata",
          list: [
            {
              title: this.$t("bigdata.search.title"),
              icon: "el-icon-search",
              id: "1",
              data: [
                {
                  title: this.$t("bigdata.search.list.datas"),
                  url: "/bigdata"
                },
                {
                  title: this.$t("bigdata.search.list.check"),
                  url: "/warehouse"
                },
                {
                  title: this.$t("bigdata.search.list.notes"),
                  url: "/InventoryFlow"
                },
                {
                  title: this.$t("bigdata.search.list.code"),
                  url: "/uniqueCode"
                }
              ]
            },
            {
              title: this.$t("bigdata.management.title"),
              icon: "el-icon-monitor",
              id: "2",
              data: [
                {
                  title: this.$t("bigdata.management.list.returnGoods"),
                  url: ""
                },
                {
                  title: this.$t("bigdata.management.list.sale"),
                  url: ""
                },
                {
                  title: this.$t("bigdata.management.list.allot"),
                  url: ""
                },
                {
                  title: this.$t("bigdata.management.list.ware"),
                  url: "/paylist"
                },
                {
                  title: this.$t("bigdata.management.list.goods"),
                  url: ""
                },
                {
                  title: this.$t("bigdata.management.list.check"),
                  url: ""
                }
              ]
            },
            {
              title: this.$t("bigdata.BaseInformation.title"),
              icon: "el-icon-setting",
              id: "2",
              data: [
                {
                  title: this.$t("bigdata.BaseInformation.list.settings"),
                  url: ""
                },
                {
                  title: this.$t("bigdata.BaseInformation.list.info"),
                  url: ""
                },
                {
                  title: this.$t("bigdata.BaseInformation.list.import"),
                  url: ""
                },
                {
                  title: this.$t("bigdata.BaseInformation.list.backups"),
                  url: ""
                },
                {
                  title: this.$t("bigdata.BaseInformation.list.restore"),
                  url: ""
                }
              ]
            }
          ]
        },
        {
          name: "user", //标注所在服务
          list: [
            {
              title: this.$t("user.management.title"),
              icon: "el-icon-search",
              id: "1",
              data: [
                {
                  title: this.$t("user.management.list.information"),
                  url: "/user"
                },
                {
                  title: this.$t("user.management.list.securityCenter"),
                  url: ""
                },
                {
                  title: this.$t("user.management.list.mail"),
                  url: ""
                },
                {
                  title: this.$t("user.management.list.sms"),
                  url: ""
                }
              ]
            },
            {
              title: this.$t("user.data.title"),
              icon: "el-icon-bank-card",
              id: "2",
              data: [
                {
                  title: this.$t("user.data.list.dataImport"),
                  url: ""
                },
                {
                  title: this.$t("user.data.list.dataExport"),
                  url: ""
                },
                {
                  title: this.$t("user.data.list.dataBackup"),
                  url: ""
                }
              ]
            },
            {
              title: this.$t("user.fundManagement.title"),
              icon: "el-icon-suitcase",
              id: "2",
              data: [
                {
                  title: this.$t("user.fundManagement.list.dataImport"),
                  url: ""
                },
                {
                  title: this.$t("user.fundManagement.list.dataExport"),
                  url: ""
                },
                {
                  title: this.$t("user.fundManagement.list.dataBackup"),
                  url: ""
                }
              ]
            }
          ]
        },
        {
          name: "pay",
          list: [
            {
              title: this.$t("pay.title"),
              icon: "el-icon-search",
              id: "1",
              data: [
                {
                  title: this.$t("pay.management.list.list"),
                  url: "/pay"
                },
                {
                  title: this.$t("pay.management.list.securityCenter"),
                  url: ""
                },
                {
                  title: this.$t("pay.management.list.mail"),
                  url: ""
                },
                {
                  title: this.$t("pay.management.list.receipt"),
                  url: ""
                },
                {
                  title: this.$t("pay.management.list.returnedMoney"),
                  url: ""
                }
              ]
            },
            {
              title: this.$t("pay.costManagement.title"),
              icon: "el-icon-data-line",
              id: "2",
              data: [
                {
                  title: this.$t("pay.costManagement.list.settings"),
                  url: ""
                },
                {
                  title: this.$t("pay.costManagement.list.info"),
                  url: ""
                },
                {
                  title: this.$t("pay.costManagement.list.import"),
                  url: ""
                }
              ]
            },
            {
              title: this.$t("pay.BaseInformations.title"),
              icon: "el-icon-data-board",
              id: "2",
              data: [
                {
                  title: this.$t("pay.BaseInformations.list.settings"),
                  url: ""
                },
                {
                  title: this.$t("pay.BaseInformations.list.info"),
                  url: ""
                },
                {
                  title: this.$t("pay.BaseInformations.list.import"),
                  url: ""
                }
              ]
            },
            {
              title: this.$t("pay.paymentReceived.title"),
              icon: "el-icon-data-analysis",
              id: "2",
              data: [
                {
                  title: this.$t("pay.paymentReceived.list.settings"),
                  url: ""
                },
                {
                  title: this.$t("pay.paymentReceived.list.info"),
                  url: ""
                },
                {
                  title: this.$t("pay.paymentReceived.list.import"),
                  url: ""
                }
              ]
            },
            {
              title: this.$t("pay.financialData.title"),
              icon: "el-icon-reading",
              id: "2",
              data: [
                {
                  title: this.$t("pay.financialData.list.settings"),
                  url: ""
                },
                {
                  title: this.$t("pay.financialData.list.info"),
                  url: ""
                },
                {
                  title: this.$t("pay.financialData.list.import"),
                  url: ""
                }
              ]
            }
          ]
        },
        {
          name: "order",
          list: [
            {
              title: this.$t("order.management.title"),
              icon: "el-icon-search",
              id: "1",
              data: [
                {
                  title: this.$t("order.management.list.query"),
                  url: "/order"
                },
                {
                  title: this.$t("order.management.list.speedy"),
                  url: ""
                },
                {
                  title: this.$t("order.management.list.consignment"),
                  url: ""
                },
                {
                  title: this.$t("order.management.list.batch"),
                  url: ""
                },
                {
                  title: this.$t("order.management.list.selfRaising"),
                  url: ""
                },
                {
                  title: this.$t("order.management.list.refund"),
                  url: ""
                },
                {
                  title: this.$t("order.management.list.arrRefund"),
                  url: ""
                },
                {
                  title: this.$t("order.management.list.addOrder"),
                  url: ""
                },
                {
                  title: this.$t("order.management.list.assess"),
                  url: ""
                }
              ]
            }
          ]
        },
        {
          name: "message",
          list: [
            {
              title: this.$t("message.management.title"),
              icon: "el-icon-search",
              id: "1",
              data: [
                {
                  title: this.$t("message.management.list.list"),
                  url: "/message"
                },
                {
                  title: this.$t("message.management.list.channel"),
                  url: "/message/company"
                },
                {
                  title: this.$t("message.management.list.mail"),
                  url: "/message/signature"
                }
              ]
            },
            {
              title: this.$t("message.sendTheManagement.title"),
              icon: "el-icon-chat-dot-square",
              id: "1",
              data: [
                {
                  title: this.$t(
                      "message.sendTheManagement.list.securityCenter"
                  ),
                  url: "/message/send"
                },
                {
                  title: this.$t("message.sendTheManagement.list.applyFor"),
                  url: "/message/applyFor"
                },
                {
                  title: this.$t("message.sendTheManagement.list.audit"),
                  url: "/message/audit"
                }
              ]
            },
            {
              title: this.$t("message.template.title"),
              icon: "el-icon-postcard",
              id: "1",
              data: [
                {
                  title: this.$t("message.template.list.securityCenter"),
                  url: "/message/template"
                },
                {
                  title: this.$t("message.template.list.applyFor"),
                  url: "/message/addTemplate"
                }
              ]
            }
          ]
        },
        {
          name: "logistics",
          list: [
            {
              title: this.$t("logistics.management.title"),
              icon: "el-icon-search",
              id: "1",
              data: [
                {
                  title: this.$t("logistics.management.list.list"),
                  url: "/logistics"
                },
                {
                  title: this.$t("logistics.management.list.settings"),
                  url: "/logistics/company"
                },
                {
                  title: this.$t("logistics.management.list.info"),
                  url: ""
                }
              ]
            }
          ]
        },
        {name:"humanResource",
          list:[
            {
              title: this.$t("humanResource.management.title"),
              icon: "el-icon-search",
              id: "1",
              data: [
                {
                  title: this.$t("humanResource.management.list.ogr"),
                  url: "/humanResource"
                },
                {
                  title: this.$t("humanResource.management.list.staff"),
                  url: "/humanResource/list"
                }
              ]
            },
            {
              title: this.$t("humanResource.template.title"),
              icon: "el-icon-search",
              id: "2",
              data: [
                {
                  title: this.$t("humanResource.template.list.finance"),
                  url: ""
                },
                {
                  title: this.$t("humanResource.template.list.office"),
                  url: ""
                }
              ]
            },
          ]}
      ];
    }
  },
  watch: {
    $route(to) {
      //单页处理
      //在mounted函数执行的方法，放到该处
      this.pathName = to.meta.navigation;
      this.defaultActive = to.path; //处理导航选中
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    //初始化
    init(){
      this.pathName = this.$route.meta.navigation; //设置导航数据
      this.bus.$on("sfold", res => {this.sfold = res;});
      this.defaultActive = this.$route.path; //处理导航选中
    },
    goto(item, index) {
      if (item.url) {
        this.$router.push({ path: item.url }); //跳转地址
        localStorage.setItem("defaultActive", index); //导航选中选中
      } else {
        this.$message("跳转地址不能为空~~");
      }
    },
    //数组去重
    distinct(arr) {
      let result = [];
      let objs = {};
      for (let i = 0; i < arr.length; i++) {
        if (!objs[arr[i].title]) {
          result.push(arr[i]);
          objs[arr[i].title] = true;
        }
      }
      return result;
    }
  }
};
</script>
