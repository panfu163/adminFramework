<template>
  <div class="content">
    <h4>{{this.$route.meta.title}}</h4>
    <el-form ref="form" :inline="true" :model="form" label-width="100px">
      <el-form-item label="用户账号:">
        <el-input v-model="form.name"  placeholder="必填"></el-input>
      </el-form-item>
      <el-row>
        <el-form-item label="账号密码:">
          <el-input v-model="form.name"  placeholder="必填"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="联系手机号:">
          <el-input v-model="form.name"  placeholder="必填"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="联系邮箱:">
          <el-input v-model="form.name"  placeholder="必填"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
      <el-form-item label="真实性名:">
        <el-input v-model="form.name"  placeholder="必填"></el-input>
      </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="所在部门:">
          <el-select v-model="form.region" placeholder="请选择部门">
            <el-option label="技术部" value="jinshu"></el-option>
            <el-option label="后勤" value="houqing"></el-option>
            <el-option label="商务部" value="shangwubu"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <h5>用户组</h5>
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
    <el-button class="btn" type="primary" @click="onSubmit">确定</el-button>
  </div>
</template>
<style lang="scss" scoped>
  .content{
    padding: 10px;
    background: #fff;
    box-sizing: border-box;
    width:100%;
    overflow:hidden;
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
        count:1,
        props: {
          label: 'name',
          children: 'zones'
        }
      };
    },
    methods: {
      //确定
      onSubmit() {
        console.log("submit!");
      },
      loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve([{ name: '会员用户组' }, { name: '新闻用户' }]);
        }
        if (node.level > 3) return resolve([]);

        var hasChild;
        if (node.data.name === "会员用户组") {
          hasChild = true;
        } else if (node.data.name === "新闻用户") {
          console.log("========");
          hasChild = false;
        } else {
          hasChild = Math.random() > 0.5;
        }

        setTimeout(() => {
          var data;
          if (hasChild) {
            data = [{
              name: '普通会员' + this.count++
            }, {
              name: '注册会员' + this.count++
            }];
          } else {
            data = [{
              name: '新闻采集员' + this.count++
            }, {
              name: '新闻编辑人员' + this.count++
            }];
          }

          resolve(data);
        }, 500);
      }

    },
    mounted() {

    }
  };
</script>
