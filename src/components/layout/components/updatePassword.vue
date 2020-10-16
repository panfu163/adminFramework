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
        label-width="80px"
    >
      <el-form-item
          label="旧密码"
          prop="oldPassword"
      >
        <el-input
            v-model="queryParams.oldPassword"
            minlength="6"
            maxlength="30"
            show-word-limit
            show-password
            placeholder="请输入旧密码"
        />
      </el-form-item>
      <el-form-item
          label="新密码"
          prop="newPassword"
      >
        <el-input
            v-model="queryParams.newPassword"
            minlength="6"
            maxlength="30"
            show-password
            show-word-limit
            placeholder="请输入新密码"
        />
      </el-form-item>
      <el-form-item
          label="确认密码"
          prop="reNewPassword"
      >
        <el-input
            v-model="queryParams.reNewPassword"
            minlength="6"
            maxlength="30"
            show-password
            show-word-limit
            placeholder="再次确认密码"
        />
      </el-form-item>
    </el-form>
    <el-row class="button-box">
      <el-button @click="hide">
        取 消
      </el-button>
      <el-button
          type="primary"
          @click="updatePassword"
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
import user from "api/user";
export default {
  name:"UpdatePasswords",
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
        ]
      },
    };
  },
  methods:{
    //修改密码
    updatePassword(){
      if(this.newPassword===this.reNewPassword){
        user.updatePassword(this.queryParams,res=>{
          console.log(res);
          this.$emit("handleClose");
        });
      }else{
        this.$message("输入的两次密码不正确");
      }
    },
    hide(){
      this.$emit("handleClose");
    }

  }
};
</script>
