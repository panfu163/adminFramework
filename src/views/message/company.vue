<template>
  <div class="search">
    <div class="title-box">
      <el-form ref="form" :inline="true" :model="form" label-width="80px">
        <el-form-item label="渠道名称:">
          <el-input v-model="form.name"  placeholder="请输入渠道名称"></el-input>
        </el-form-item>
        <el-form-item label="状态:">
          <el-select v-model="form.state" placeholder="请选择状态">
            <el-option label="正常" value="shanghai"></el-option>
            <el-option label="停用" value="shanghai"></el-option>
            <el-option label="欠费" value="shanghai"></el-option>
            <el-option label="条数" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>

    </div>

    <el-row class="el-row">
      <el-button type="success" @click="addSignature">添加签名</el-button>
    </el-row>

    <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            height="480"
            style="width: 100%;position: relative;box-sizing: border-box"
            stripe
            highlight-current-row
            :header-cell-style="{background:'#eef1f6',color:'#18333f'}"
    >
      <el-table-column fixed type="index" label="#">
      </el-table-column>
      <el-table-column label="渠道名称" prop="name">
      </el-table-column>
      <el-table-column label="历史总条数" prop="totalNumber">
      </el-table-column>
      <el-table-column label="剩余条数" prop="num">
      </el-table-column>
      <el-table-column label="已发条数" prop="excess">
      </el-table-column>
      <el-table-column label="总消费金额" prop="totalprice">
      </el-table-column>
      <el-table-column label="剩余金额" prop="price">
      </el-table-column>
      <el-table-column label="已使用金额" prop="havePrice">
      </el-table-column>
      <el-table-column label="AccessKeyId" prop="AccessKeyId">
      </el-table-column>
      <el-table-column label="状态" prop="states">
      </el-table-column>
      <el-table-column label="AccessKeySecret" prop="AccessKeySecret"></el-table-column>
      <el-table-column label="使用部门" prop="department"></el-table-column>
      <el-table-column label="使用状态" prop="state">
      </el-table-column>
      <el-table-column prop="time" label="最后更新时间">
      </el-table-column>
      <el-table-column prop="monicker" label="操作人">
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="addSignature(scope.row)" type="text" size="mini"
          >修改</el-button
          >
          <!--                          <el-button type="text" size="mini">发送邮箱</el-button>-->
          <!--                          <el-button-->
          <!--                            @click.native.prevent="deleteRow(scope.$index, tableData)"-->
          <!--                            type="text"-->
          <!--                            size="mini"-->
          <!--                          >-->
          <!--                            移除-->
          <!--                          </el-button>-->
        </template>
      </el-table-column>
    </el-table>
<!--    <div style="margin-top: 20px">-->
<!--      <el-button @click="toggleSelection(tableData)">全选</el-button>-->
<!--      <el-button @click="toggleSelection()">取消选择</el-button>-->
<!--    </div>-->
    <el-pagination
            class="pagination"
            background
            layout="prev, pager, next"
            :total="1000"
    >
    </el-pagination>

    <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :append-to-body="appendToBody"
            :before-close="handleClose">

      <el-form ref="formName" :inline="true" :model="ruleForm" :rules="rules" label-width="100px">
        <el-row>
          <el-form-item label="渠道名称:" prop="fullName" label-width="200">
            <el-input v-model="ruleForm.fullName"  placeholder="必填"></el-input>
          </el-form-item>
        </el-row>
        <el-form-item label="用户账号:" prop="name" label-width="200">
          <el-input v-model="ruleForm.name" minlength="6"  placeholder="必填"></el-input>
        </el-form-item>
        <el-row>
          <el-form-item label="账号密码:" label-width="200"  prop="password">
            <el-input v-model="ruleForm.password" minlength="6"  placeholder="必填" show-password></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="AccessKeyId:" label-width="200"  prop="phone">
            <el-input v-model="ruleForm.phone" type="number" placeholder="必填" minlength="11" maxlength="11"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="AccessKeySecret:"  label-width="200"  prop="mailbox">
            <el-input v-model="ruleForm.mailbox"  type="email"  placeholder="必填"></el-input>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="使用状态:" label-width="200" prop="region">
            <el-select v-model="ruleForm.region" placeholder="使用状态">
              <el-option label="正常" value="houqing"></el-option>
              <el-option label="停用" value="chawu"></el-option>
            </el-select>
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
  .search {
    padding: 10px;
    background: #fff;
    box-sizing: border-box;
    .title-box {
      background: #ecf5ff;
      padding: 20px;
      margin-bottom: 10px;
    }
    .pagination {
      text-align: right;
      margin-top: 20px;
    }
    .line {
      text-align: center;
    }
    .el-row{
      text-align: right;
      margin-bottom:10px;
    }
  }
</style>
<script>
  export default {
    data() {
      return {
        form: {
          channel:"",
          name:"",
          state:""
        },
        tableData: [
          {
            name:"阿里公司",
            monicker:"小张",
            num:"2000",
            totalNumber:"8088",
            excess:"180",
            price:"808.00",
            havePrice:"900.00",
            totalprice:"90000.00",
            state:"正常",
            time: "2020-09-12 18:30:30",
            department:"技术部",
            AccessKeyId:"78393",
            AccessKeySecret:"ab80930984309acg9009",
            states:"欠费"
          },
          {
            name:"腾讯公司",
            monicker:"小张",
            num:"2000",
            totalNumber:"8088",
            excess:"180",
            price:"808.00",
            havePrice:"900.00",
            totalprice:"90000.00",
            state:"正常",
            time: "2020-09-12 18:30:30",
            department:"技术部",
            AccessKeyId:"78393",
            states:"正常",
            AccessKeySecret:"ab80930984309acg9009"
          }
        ],
        dialogVisible:false,
        appendToBody:true,
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
            { required: true, message: '请输入AccessKeyId', trigger: 'blur' },
          ],
          fullName: [
            { required: true, message: '请输入您的渠道名称', trigger: 'blur' }
          ],
          mailbox: [
            { required: true, message: '请输入AccessKeySecret', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择所在的部门', trigger: 'change' }
          ],
        },
      };
    },
    methods: {
      //查询
      onSubmit(){

      },
      //添加签名
      addSignature(){
        this.dialogVisible=true
      },
      handleClose(){
        this.dialogVisible=false
      }
    }
  };
</script>
