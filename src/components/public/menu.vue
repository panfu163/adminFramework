<!---
 --@author  PanFu
 --@data 2019-07-13:56
 --@description MOJOWeb-left 菜单管理
 --@version 1.0
--->
<template>
  <div class="min-menu" :class="{on:sfold}">
    <div class="title">{{ $t(pathName + ".title") }}</div>
    <el-menu
      class="el-menu-vertical-demo"
      :default-openeds="openeds"
      :default-active="defaultActive"
      v-for="(items, indexs) in listData"
      :key="indexs"
      v-if="items.name == pathName"
    >
      <el-submenu
        :index="(indexs + 1).toString()"
        v-for="(item, indexs) in items.list"
        :key="indexs"
      >
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="(items, index) in item.data"
            :key="index"
            :index="items.url"
            @click="goto(items)"
            >{{ items.title }}</el-menu-item
          >
        </el-menu-item-group>
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
  overflow:hidden;
  color: #323233;
  background: #fff;
  transform:translate(0,0);
  transition:0.3s;
  border-right: 1px solid #e5e5e5;
  &.on{
    left:40px;
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
      openeds: ["1","2", "3","4"], //设置菜单栏展开3个需要展开的菜单导航
      defaultActive: "", //当前选中
      tagData: this.$store.state.tag,
      pathName: "", //根据路径来判断子导航,
      reg: /^\/[0-9a-zA-Z]*.*?/,
      sfold:false
    };
  },
  mounted() {
    this.pathName = this.$route.meta.navigation; //设置导航数据
    let str = this.$route.path;
    let array = str.match(this.reg)[0]; //处理子路由取父路由
    this.bus.$on("sfold",res=>{
      console.log(res);
      this.sfold=res;
    });
    this.defaultActive = array; //处理导航选中
  },
  methods: {
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
                  title: this.$t("power.manage.list.rolList"),
                  url: "/power/rolList"
                },
                {
                  title: this.$t("power.manage.list.userManagement"),
                  url: "/power"
                },
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
                },{
                  title: this.$t("power.rbac.list.systemManage"),
                  url: "/power/systemList"
                },{
                  title: this.$t("power.rbac.list.menuManage"),
                  url: "/power/menuList"
                }
              ]
            },
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
                  url: "/product"
                },
                {
                  title: this.$t("product.information.list.classify"),
                  url: ""
                },
                {
                  title: this.$t("product.information.list.brand"),
                  url: ""
                },{
                  title: this.$t("product.information.list.unitLibrary"),
                  url: ""
                },
                {
                  title: this.$t("product.information.list.attribute"),
                  url: ""
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
                  title: this.$t("product.BaseInformation.list.ShapeModulationCode"),
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
              icon: "el-icon-setting",
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
                },
                {
                  title: this.$t("user.data.list.dataRecovery"),
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
                }
              ]
            },
            {
              title: this.$t("pay.BaseInformation.title"),
              icon: "el-icon-setting",
              id: "2",
              data: [
                {
                  title: this.$t("pay.BaseInformation.list.settings"),
                  url: ""
                },
                {
                  title: this.$t("pay.BaseInformation.list.info"),
                  url: ""
                },
                {
                  title: this.$t("pay.BaseInformation.list.import"),
                  url: ""
                },
                {
                  title: this.$t("pay.BaseInformation.list.backups"),
                  url: ""
                },
                {
                  title: this.$t("pay.BaseInformation.list.restore"),
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
                  title: this.$t("order.management.list.list"),
                  url: "/order"
                }
              ]
            },
          ]
        },
      ];
    }
  },
  watch: {
    $route(to) {
      console.log("我是menu~~~")
      //单页处理
      //在mounted函数执行的方法，放到该处
      this.pathName = to.meta.navigation;
      let str = to.path;
      let array = str.match(this.reg)[0]; //处理子路由取父路由
      this.defaultActive = array; //处理导航选中
    }
  }
};
</script>
