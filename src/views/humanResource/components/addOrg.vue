<!---
 --@author  PanFu
 --@data 2019-08-30 16:19
 --@description activity.v1.0-List
 --@version 1.0
--->
<template>
  <div class="content">
    <el-form
        ref="formName"
        :model="queryParams"
        :rules="rules"
        label-width="140px"
    >
      <el-form-item
          label="组织/部门名称"
          prop="oldPassword"
      >
        <el-input
            v-model="queryParams.oldPassword"
            minlength="6"
            maxlength="30"
            show-word-limit
            placeholder="请输入组织/部门名称"
        />
      </el-form-item>
      <el-form-item
          label="所属部门"
          prop="newPassword"
      >
        <treeselect
            v-model="value"
            :options="options"
            placeholder="请选择部门"
            style="width:375px"
        />
      </el-form-item>
      <el-form-item
          label="备注"
          prop="reNewPassword"
      >
        <el-input
            v-model="queryParams.reNewPassword"
            minlength="6"
            maxlength="30"
            show-word-limit
            placeholder="请输入组织/部门名称备注信息"
            type="textarea"
            :rows="4"
        />
      </el-form-item>
    </el-form>
    <el-row class="button-box">
      <el-button @click="hide">
        取 消
      </el-button>
      <el-button
          type="primary"
          @click="addOrg"
      >
        确 定
      </el-button>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
.content {
  padding: 10px;
  background: #fff;
  box-sizing: border-box;
  .button-box{
    text-align: right;
  }
}
</style>
<script>
import Treeselect from '@riophae/vue-treeselect';
export default {
  name:"addOrg",
  components:{ Treeselect  },
  data() {
    return {
      queryParams:{
        oldPassword: "",
        newPassword: "",
        reNewPassword: ""
      },
      rules: {
        oldPassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
          { min:6, max:30, message: "长度在6到30个字符", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min:6, max:30, message: "长度在6到30个字符", trigger: "blur" },
          {pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{6,30}$/,
            message: '密码为数字，小写字母，大写字母，特殊符号 至少包含三种，长度为6-30位', trigger: "blur"}
        ],
        reNewPassword: [
          { required: true, message: "请输入确认新密码", trigger: "blur" },
          { min:6, max:30, message: "长度在6到30个字符", trigger: "blur" },
        ],
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
  methods:{
    hide(){
      this.$emit("handleClose");
    },
    addOrg(){
      this.$emit("handleClose");
    }
  }
};
</script>
