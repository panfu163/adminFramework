<template>
  <div class="content">
    <h4>
      {{ this.$route.meta.title }}
      <el-button
        class="title-but"
        size="small"
        type="primary"
        @click="onSubmit('formName')"
      >
        确定
      </el-button>
    </h4>
    <el-form
      ref="form"
      :model="form"
      label-width="100px"
    >
      <el-form-item label="角色名称">
        <el-input
          v-model="form.name"
          placeholder="请输入角色名称"
          minlength="6"
          maxlength="20"
          show-word-limit
          style="width:400px"
        />
      </el-form-item>
      <el-form-item label="角色说明">
        <el-input
          v-model="form.name"
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          minlength="6"
          maxlength="200"
          show-word-limit
          style="width:400px"
        />
      </el-form-item>
      <el-form-item label="部门">
        <el-select
          v-model="form.region"
          placeholder="请选择部门"
        >
          <el-option
            label="技术术部"
            value="shanghai"
          />
          <el-option
            label="财务部"
            value="beijing"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="用户">
        <el-select
          v-model="value"
          multiple
          filterable
          remote
          reserve-keyword
          placeholder="请输入用户名"
          :remote-method="remoteMethod"
          :loading="loading"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <el-row>
      <h5>用户组</h5>
      <el-row
        class="user-group"
        prop="data"
      >
        <el-tree
          ref="newTopRightsTree"
          :data="data"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[]"
          :default-checked-keys="checkedKeys"
          :props="defaultProps"
        />
      </el-row>
    </el-row>
    <el-row>
      <h5>系统权限设置</h5>
      <el-row>
        <el-tree
          :props="props"
          :load="loadNode"
          lazy
          show-checkbox
          @check-change="handleCheckChange"
        />
      </el-row>
    </el-row>
    <el-row>
      <h5>界面权限设置</h5>
      <el-row>
        <el-tree
          :props="props"
          :load="loadNode"
          lazy
          show-checkbox
          @check-change="handleCheckChange"
        />
      </el-row>
    </el-row>
    <div class="btn-box">
      <el-button
        size="small"
        @click="onSubmit('formName')"
      >
        重置
      </el-button>
      <el-button
        size="small"
        type="primary"
        @click="onSubmit('formName')"
      >
        确定
      </el-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.content {
  padding: 10px;
  background: #fff;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  height: 800px;
  overflow-y: auto;
  //按钮
  .btn-box {
    background: #fff;
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    border-top: 1px solid #eee;
    z-index: 999;
    margin-top: 20px;
    display: block;
  }
  .title-but {
    position: absolute;
    top: 0;
    right: 0;
  }
  h4 {
    position: relative;
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
    margin-bottom: 20px;
    display: block;
    font-size: 18px;
  }
  h5 {
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
    padding: 20px 0;
    margin: 20px auto;
    display: block;
  }
  .btn {
    min-width: 200px;
    margin: 20px;
  }
}
</style>
<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      count: 1,
      props: {
        label: "name",
        children: "zones"
      },
      val: [],
      options: [],
      value: [],
      list: [],
      loading: false,
      states: [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming"
      ],
      data: [
        {
          id: 1,
          label: "系统用户组",
          children: [
            {
              id: 4,
              label: "管理员"
            },
            {
              id: 5,
              label: "网站运营"
            },
            {
              id: 6,
              label: "网站编辑"
            },
            {
              id: 7,
              label: "仓库管理员"
            },
            {
              id: 8,
              label: "客服"
            }
          ]
        },
        {
          id: 2,
          label: "新闻部用户组",
          children: [
            {
              id: 9,
              label: "主编"
            },
            {
              id: 10,
              label: "副主缟"
            },
            {
              id: 11,
              label: "新闻编辑员"
            },
            {
              id: 12,
              label: "新闻采集员"
            }
          ]
        },
        {
          id: 3,
          label: "财务组",
          children: [
            {
              id: 13,
              label: "财务总监"
            },
            {
              id: 14,
              label: "会计"
            },
            {
              id: 15,
              label: "出纳"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      checkedKeys: [5]
    };
  },
  mounted() {
    this.list = this.states.map(item => {
      return { value: `value:${item}`, label: `label:${item}` };
    });
  },
  methods: {
    //确定
    onSubmit() {
      console.log("submit!");
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
    handleChange() {},
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: "库存系统管理" }, { name: "支付系统管理" }]);
      }
      if (node.level > 3) return resolve([]);

      var hasChild;
      if (node.data.name === "库存系统管理") {
        hasChild = true;
      } else if (node.data.name === "支付系统管理") {
        console.log("========");
        hasChild = false;
      } else {
        hasChild = Math.random() > 0.5;
      }

      setTimeout(() => {
        var data;
        if (hasChild) {
          data = [
            {
              name: "添加" + this.count++
            },
            {
              name: "删除" + this.count++
            }
          ];
        } else {
          data = [
            {
              name: "添加" + this.count++
            },
            {
              name: "修改" + this.count++
            }
          ];
        }

        resolve(data);
      }, 500);
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    }
  }
};
</script>
