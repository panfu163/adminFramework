<template>
  <div class="content">
    <h4>{{this.$route.meta.title}}</h4>
    <el-form ref="formName" :inline="true" :model="ruleForm" :rules="rules" label-width="100px">
      <el-form-item label="模板名称:" prop="name">
        <el-input v-model="ruleForm.name" minlength="6"  placeholder="请输入模板名称"></el-input>
      </el-form-item>
      <el-row>
        <el-form-item label="使用场景:" prop="scene">
          <el-select v-model="ruleForm.scene" placeholder="请选择使用场景">
            <el-option label="语音短信" value="houqings"></el-option>
            <el-option label="普通短信" value="chawus"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="使用部门:" prop="scene">
          <el-select v-model="ruleForm.scene" placeholder="请选择使用场景">
            <el-option label="技术部" value="houqings"></el-option>
            <el-option label="财务部" value="chawus"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="联系电话:" prop="phone">
           <el-input type="text"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="发送时间:" prop="value2">
          <el-date-picker
                  v-model="value2"
                  type="datetime"
                  placeholder="选择日期时间"
                  align="right"
                  :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="发送范围:" prop="phone">
          <el-select v-model="ruleForm.scenes" placeholder="请选择使发送范围">
            <el-option label="全部会员" value="allUser"></el-option>
            <el-option label="张家店会员" value="shopUser"></el-option>
          </el-select>
          <el-button style="margin-left:10px" type="success" @click="onSubmit('formName')">导入手机号</el-button>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="短信内容:" prop="textarea">
          <el-input
                  type="textarea"
                  :rows="10"
                  placeholder="请输入短信内容"
                  v-model="ruleForm.textarea"
                  style="width:500px"
                  maxlength="200"
                  show-word-limit
          >
          </el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="短信签名:" prop="name">
          <el-select v-model="ruleForm.signature" placeholder="请选择短信签名">
            <el-option label="光大银行" value="guanda"></el-option>
            <el-option label="南方电网" value="anfang"></el-option>
            <el-option label="中国电信" value="zhongdianx"></el-option>
            <el-option label="中国银行" value="zhongdianx"></el-option>
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
        value2:"",
        ruleForm: {
          name: "",
          type:"",
          channel:"",
          scene:"",
          textarea:"",
          signature:""
        },
        rules: {
          name: [
            { required: true, message: '请输入用户账号名称', trigger: 'blur' },
            { min:6, max:20, message: '长度在6到20个字符', trigger: 'blur' }
          ],
          type: [{ required: true, message: '请选择短信类型', trigger: 'change' }],
          channel: [{ required: true, message: '请选择短信渠道', trigger: 'change' }],
          scene: [{ required: true, message: '请选择短信场景', trigger: 'change' }],
          textarea: [{ required: true, message: '请填写短信内容', trigger: 'blur' }],
          signature: [{ required: true, message: '请选择短信签名', trigger: 'change' }],
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
