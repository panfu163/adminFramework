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
      ref="formName"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item
        label="用户账号:"
        prop="name"
      >
        <el-input
          v-model="ruleForm.name"
          placeholder="请输入用户账号"
          minlength="6"
          maxlength="20"
          show-word-limit
          style="width:400px"
        />
      </el-form-item>
      <el-form-item
        label="账号密码:"
        prop="password"
      >
        <el-input
          v-model="ruleForm.password"
          placeholder="请输入账号密码"
          show-password
          maxlength="10"
          show-word-limit
          style="width:400px"
        />
      </el-form-item>
      <el-form-item
        label="确认密码:"
        prop="password"
      >
        <el-input
          v-model="ruleForm.password"
          placeholder="再次确认密码"
          show-password
          maxlength="10"
          show-word-limit
          style="width:400px"
        />
      </el-form-item>
      <el-form-item
        label="联系手机号:"
        prop="phone"
      >
        <el-input
          v-model="ruleForm.phone"
          type="number"
          placeholder="请输入联系手机号"
          minlength="11"
          maxlength="11"
          show-word-limit
          style="width:400px"
        />
      </el-form-item>
      <el-form-item
        label="联系邮箱:"
        prop="mailbox"
      >
        <el-input
          v-model="ruleForm.mailbox"
          type="email"
          placeholder="请输入联系邮箱"
          maxlength="80"
          show-word-limit
          style="width:400px"
        />
      </el-form-item>
      <el-form-item
        label="真实姓名:"
        prop="fullName"
      >
        <el-input
          v-model="ruleForm.fullName"
          placeholder="请输入真实姓名"
          minlength="2"
          maxlength="20"
          show-word-limit
          style="width:400px"
        />
      </el-form-item>
      <el-form-item
        label="所在部门:"
        prop="region"
      >
        <treeselect
            v-model="value"
            :options="options"
            placeholder="请选择部门"
            style="width:400px"
        />
      </el-form-item>
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
    </el-form>
    <div class="btn-box">
      <el-button
        size="small"
        @click="onReset('formName')"
      >
        重置
      </el-button>
      <el-button
        size="small"
        type="primary"
        @click="onSubmit()"
      >
        确定
      </el-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.content {
  position: relative;
  padding: 10px;
  background: #fff;
  box-sizing: border-box;
  width: 100%;
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
  .user-group {
    width: 100%;
  }
}
</style>
<script>
import Treeselect from "@riophae/vue-treeselect";
export default {
  name:"adduser",
  components:{ Treeselect  },
  data() {
    return {
      ruleForm: {
        name: "",
        password: "",
        phone: "",
        fullName: "",
        desc: "",
        mailbox: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户账号名称", trigger: "blur" },
          { min: 6, max: 20, message: "长度在6到20个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入用户账号密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在6到20个字符", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { min: 11, max: 11, message: "长度为11个字符", trigger: "blur" }
        ],
        fullName: [
          { required: true, message: "请输入您的姓名", trigger: "blur" }
        ],
        mailbox: [
          { required: true, message: "请输入您的邮箱地址", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择所在的部门", trigger: "change" }
        ]
      },
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
      checkedKeys: [5],
      count: 1,
      props: {
        label: "name",
        children: "zones"
      },
      value: null,
      options: [{
        id: 'fruits',
        label: '总公司',
        children: [{
          id: 'apple',
          label: '技术部',
          isNew: true,
        }, {
          id: 'grapes',
          label: '财务部',
        }, {
          id: 'pear',
          label: '后勤部',
        }, {
          id: 'strawberry',
          label: '服务部',
        }, {
          id: 'watermelon',
          label: '客服部',
        }],
      }, {
        id: 'vegetables',
        label: '广州分公司',
        children: [{
          id: 'corn',
          label: '销售部',
        }, {
          id: 'carrot',
          label: '运营部',
        }, {
          id: 'eggplant',
          label: '公关部',
        }, {
          id: 'tomato',
          label: '人事部',
        }],
      }],
    };
  },
  mounted() {},
  methods: {
    //确定
    onSubmit(formName) {
      console.log("submit!");
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //重置
    onReset(formName) {
      this.$refs[formName].resetFields();
      this.$refs.newTopRightsTree.setCheckedKeys([]); //树形重置
    },
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
    handleCheckChange() {}
  }
};
</script>
