<template>
  <div class="content">
    <div class="title-box">
      <i class="el-icon-info"></i>
      <div class="title-content">
        <p>通过用户组对职责相同的角色用户进行分类并授权，可以更加高效地管理用户及其权限。</p>
        <p>对一个用户组进行授权后，用户组内的所有用户会自动继承该用户组的权限。</p>
        <p>如果一个用户被加入到多个用户组，那么该用户将会继承多个用户组的权限。</p>
      </div>
    </div>
    <el-row>
        <el-form ref="formId" :inline="true" :model="form" label-width="120px">
          <el-form-item label="用户组名称：" prop="name">
            <el-input v-model="form.name"  placeholder="请填写用户组名称"></el-input>
          </el-form-item>
          <el-form-item label="状态:" prop="region">
            <el-select v-model="form.region" placeholder="请选择状态">
              <el-option label="正常" value="shanghai"></el-option>
              <el-option label="停用" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button @click="onReset()">重置</el-button>
          </el-form-item>
          <el-button type="success" round @click="addUser">添加用户组</el-button>
        </el-form>
    </el-row>
    <el-table
      ref="multipleTable"
      v-loading="loading"
      :data="tableData"
      element-loading-text="拼命加载中..."
      tooltip-effect="dark"
      height="370"
      style="width: 100%"
      stripe
      highlight-current-row
      @selection-change="handleSelectionChange"
      :header-cell-style="{background:'#eef1f6',color:'#18333f'}"
    >
      <el-table-column type="index" label="#" :index="indexMethod"> </el-table-column>
      <el-table-column type="selection"
                       :selectable="checkSelectable"
                       disabled="true"
      ></el-table-column>
      <el-table-column prop="name" label="用户组名称"></el-table-column>
      <el-table-column prop="remarks" label="备注">
      </el-table-column>
      <el-table-column prop="creater" label="创建人" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="creationTime" label="创建时间" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="status" label="状态" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-switch
                  v-model="scope.row.status"
                  inactive-text="启用"
                  active-text="停用"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope" v-if="scope.$index!=0">
          <el-button @click="handleClick(scope.row)" type="text" size="mini"
            >查看</el-button
          >
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="mini"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection(tableData)">全选</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
      <el-button @click="del()" type="primary">删除</el-button>
    </div>
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :total="1000"
    >
    </el-pagination>
  </div>
</template>
<style lang="scss" scoped>
.content{
  padding: 10px;
  background: #fff;
  box-sizing: border-box;
  .title-box {
    background: #ecf5ff;
    padding: 20px;
    margin-bottom: 10px;
    display:flex;
    &>i{
      padding-top: 0.5em;
      @include color("color");
    }
    .title-content{
      padding-left:10px;
      p{
        margin-top: 0.5em;
        margin-bottom: 0.5em;
        font-size:12px;
        line-height: 1.5 !important;
      }
    }

  }
  .pagination {
    text-align: right;
    margin-top: 20px;
  }
}
.el-row {
  text-align: right;
  padding: 20px;
}
</style>
<script>
export default {
  data() {
    return {
      loading: true,
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
      tableData: [
        {
          id:1,
          name: "系统用户组",
          remarks:"系统默认用户组不可修改",
          creationTime: "2019-09-12 32:30:24",
          updateTime: "2019-09-12 32:30:24",
          status:"正常",
          creater:"系统",
          checker:"系统",
        },{
          id:2,
          name: "财务组",
          remarks:"财务部门权限用户组",
          creationTime: "2019-09-12 32:30:24",
          updateTime: "2019-09-12 32:30:24",
          status:"正常",
          creater:"系统",
          checker:"系统",
        },{
          id:3,
          name: "产品组",
          remarks:"产品部门权限用户组",
          creationTime: "2019-09-12 32:30:24",
          updateTime: "2019-09-12 32:30:24",
          status:"正常",
          creater:"admin",
          checker:"admin",
        },{
          id:4,
          name: "订单组",
          remarks:"订单部门、售后部门权限用户组",
          creationTime: "2019-09-12 32:30:24",
          updateTime: "2019-09-12 32:30:24",
          status:"正常",
          creater:"admin",
          checker:"admin",
        },{
          id:5,
          name: "运营组",
          remarks:"市场部门、运营部门、销售权限用户组",
          creationTime: "2019-09-12 32:30:24",
          updateTime: "2019-09-12 32:30:24",
          status:"正常",
          creater:"admin",
          checker:"admin",
        }
      ],
      multipleSelection: []
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    //重置
    onReset(){
      console.log("=========")
      this.$refs.formId.resetFields()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleClick(row) {
      this.$router.push({ path: '/power/userDetails'});
    },
    deleteRow(index, rows) {
      //删除
      rows.splice(index, 1);
    },
    /**
     * 批量删除行
     * @param {object} row 行数据
     * @param {number} i 数据的序号
     */
    del() {
      if (this.multipleSelection.length === 0) {
        this.$alert('请至少选择一行数据', '系统提示', {
          confirmButtonText: '确定',
          callback:()=> {
          }});
        return false;
      }else{

        //外层循环原数组，内层批量选中的数组，注意一点删除的时候，i倒过来循环，不然会引起index下角标因删除前一条而变化的问题
        for (let i = this.tableData.length; i > 0; i--) {
          for (let j = 0; j < this.multipleSelection.length; j++) {
            if (this.tableData[i - 1] === this.multipleSelection[j]) {
              this.tableData.splice(i - 1, 1);
            }
          }
        }


      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row,index) => {
            if(index==0){
              return;
            }
            this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    indexMethod(index) {
      //自定义索引
      return index * 1;
    },
    //处理选中
    checkSelectable(row,index){
        if (index==0) {//这个判断根据你的情况而定
          return 0;//不可勾选
        }else {
          return 1;//可勾选
        }
    },
    //添加用户组
    addUser(){
      this.$router.push({ path: '/power/addUserGroup'});
    }
  },
  mounted() {
    //3秒后关掉加载
    setTimeout(()=> {
      this.loading = false;
    }, 1000);
  }
};
</script>
