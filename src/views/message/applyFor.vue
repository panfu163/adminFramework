<template>
  <div class="content">
    <h4>{{this.$route.meta.title}}</h4>
    <el-form ref="formName" :inline="true" :model="ruleForm" :rules="rules" label-width="100px">
      <el-form-item label="用户账号:" prop="name">
        <el-input v-model="ruleForm.name" minlength="6"  placeholder="必填"></el-input>
      </el-form-item>
      <el-row>
        <el-form-item label="账号密码:" prop="password">
          <el-input v-model="ruleForm.password" minlength="6"  placeholder="必填" show-password></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="联系手机号:" prop="phone">
          <el-input v-model="ruleForm.phone" type="number" placeholder="必填" minlength="11" maxlength="11"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="联系邮箱:"  prop="mailbox">
          <el-input v-model="ruleForm.mailbox"  type="email"  placeholder="必填"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="真实姓名:" prop="fullName">
          <el-input v-model="ruleForm.fullName"  placeholder="必填"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="所在部门:" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择部门">
            <el-option label="总经办" value="houqing"></el-option>
            <el-option label="财务部" value="chawu"></el-option>
            <el-option label="技术部" value="jinshu"></el-option>
            <el-option label="后勤部" value="houqing"></el-option>
            <el-option label="商务部" value="shangwu"></el-option>
            <el-option label="人事部" value="renshi"></el-option>
            <el-option label="销售部" value="xiaoshe"></el-option>
            <el-option label="营运部" value="yuanying"></el-option>
            <el-option label="证券部" value="zhengjuan"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
    </el-form>
    <el-button class="btn" type="primary" @click="onSubmit('formName')">确定</el-button>
    <el-button class="btn" @click="onReset('formName')">取消</el-button>
  </div>
</template>
<style lang="scss" scoped>
  .content{
    padding: 10px;
    background: #fff;
    box-sizing: border-box;
    width:100%;
    h4{
      border-bottom: 1px solid #eee;
      padding-bottom:20px;
      margin-bottom:20px;
      display:block;
      font-size:18px;
    }
    h5{
      border-bottom: 1px solid #eee;
      border-top: 1px solid #eee;
      padding:20px 0;
      margin:20px auto;
      display:block;
    }
    .btn{
      min-width:200px;
      margin:20px;
    }
    .user-group{
      width:100%;
    }
  }
</style>
<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: "",
          password:"",
          phone: "",
          fullName: "",
          desc: "",
          mailbox:""
        },
        rules: {
          name: [
            { required: true, message: '请输入用户账号名称', trigger: 'blur' },
            { min:6, max:20, message: '长度在6到20个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入用户账号密码', trigger: 'blur' },
            { min:6, max:20, message: '长度在6到20个字符', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入联系电话', trigger: 'blur' },
            { min:11, max:11, message: '长度为11个字符', trigger: 'blur' }
          ],
          fullName: [
            { required: true, message: '请输入您的姓名', trigger: 'blur' }
          ],
          mailbox: [
            { required: true, message: '请输入您的邮箱地址', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择所在的部门', trigger: 'change' }
          ],
        },
      };
    },
    methods: {
      //确定
      onSubmit(formName) {
        console.log("submit!");
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //重置
      onReset(formName){
        this.$refs[formName].resetFields();
        this.$refs.newTopRightsTree.setCheckedKeys([])//树形重置
      },
      handleCheckChange(){}
    },
    mounted() {

    }
  };
</script>
