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
      <el-row>
        <h5>用户组</h5>
        <el-row class="user-group" prop="data">
          <el-tree
                  ref="newTopRightsTree"
                  :data="data"
                  show-checkbox
                  node-key="id"
                  :default-expanded-keys="[]"
                  :default-checked-keys="checkedKeys"
                  :props="defaultProps">
          </el-tree>
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
                  @check-change="handleCheckChange">
          </el-tree>
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
                  @check-change="handleCheckChange">
          </el-tree>
        </el-row>
      </el-row>
    </el-form>
    <el-button class="btn" type="primary" @click="onSubmit('formName')">确定</el-button>
    <el-button class="btn" @click="onReset('formName')">重置</el-button>
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
        data: [{
          id: 1,
          label: '系统用户组',
          children:[{
            id:4,
            label:'管理员'
          }, {
            id:5,
            label:'网站运营'
          }, {
            id:6,
            label:'网站编辑'
          },{
            id:7,
            label:'仓库管理员'
          },{
            id:8,
            label:'客服'
          }]
        }, {
          id:2,
          label: '新闻部用户组',
          children: [{
            id: 9,
            label: '主编'
          }, {
            id: 10,
            label: '副主缟'
          }, {
            id:11,
            label: '新闻编辑员'
          }, {
            id:12,
            label: '新闻采集员'
          }]
        }, {
          id: 3,
          label: '财务组',
          children: [{
            id: 13,
            label: '财务总监'
          }, {
            id:14,
            label: '会计'
          }, {
            id:15,
            label: '出纳'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        checkedKeys:[5],
        count:1,
        props: {
          label: 'name',
          children: 'zones'
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
      loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve([{ name: '库存系统管理' }, { name: '支付系统管理' }]);
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
            data = [{
              name: '添加' + this.count++
            }, {
              name: '删除' + this.count++
            }];
          } else {
            data = [{
              name: '添加' + this.count++
            }, {
              name: '修改' + this.count++
            }];
          }

          resolve(data);
        }, 500);
      },
      handleCheckChange(){}
    },
    mounted() {

    }
  };
</script>
