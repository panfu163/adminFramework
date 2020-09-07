<template>
  <div class="content">
    <h4>{{this.$route.meta.title}}</h4>
    <el-form ref="formName" :inline="true" :model="ruleForm"  label-width="100px">
      <el-form-item label="模板名称:" prop="name">
        <el-input v-model="ruleForm.name" minlength="6"  placeholder="请输入模板名称"></el-input>
      </el-form-item>
      <el-row>
        <el-form-item label="短信类型:" prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择短信类型">
            <el-option label="普通短信" value="houqing"></el-option>
            <el-option label="营销短信" value="chawu"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="渠道:" prop="channel">
          <el-select v-model="ruleForm.channel" placeholder="请选择渠道">
            <el-option label="阿里短信" value="houqingi"></el-option>
            <el-option label="联通短信" value="chawui"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="使用场景:" prop="scene">
          <el-select v-model="ruleForm.scene" placeholder="请选择使用场景">
            <el-option label="语音短信" value="houqings"></el-option>
            <el-option label="普通短信" value="chawus"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="发送时间:" prop="value2">
          <el-date-picker
                  v-model="ruleForm.value2"
                  type="datetime"
                  placeholder="选择日期时间"
                  align="right"
                  :picker-options="pickerOptions">
          </el-date-picker>
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
      <el-button class="btn" type="primary" @click="onSubmit('formName')">确定审核</el-button>
      <el-button class="btn" @click="onReset('formName')">取消</el-button>
    </el-form>

    <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :append-to-body="appendToBody"
            :before-close="handleClose">

      <el-form ref="formName" :inline="true" :model="ruleForm" :rules="rules" label-width="100px">
        <el-row>
          <el-form-item label="审核状态:" label-width="200" prop="region">
            <el-select v-model="ruleForm.region" placeholder="使用状态">
              <el-option label="审核通过" value="houqing"></el-option>
              <el-option label="审核不通过" value="chawu"></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="备注说明:" label-width="200" prop="region">
            <el-input
                    type="textarea"
                    :rows="10"
                    placeholder="请输入备注说明"
                    v-model="textarea"
                    style="width:500px"
                    maxlength="200"
                    show-word-limit
            >
            </el-input>
        </el-form-item>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>

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
          name: "十周年活动",
          type:"普通短信",
          channel:"阿里短信",
          scene:"普通短信",
          textarea:"公司十周年来宾大酬谢！10月1日进店送小轿车一输，任何人索取动态密码均为诈骗，切勿泄露！",
          signature:"南方电网",
          value2:"2020-09-07 14:04:14",
        },
        dialogVisible:false,
        appendToBody:true,
        textarea:""
      };
    },
    methods: {
      //确定
      onSubmit(formName) {
         this.dialogVisible=true
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
