<!---
角色例表
-->
<template>
  <div class="content">
    <div class="title-box">
      <el-form ref="form" :inline="true" :model="form" label-width="100px">
        <el-form-item label="角色名称">
          <el-input v-model="form.name"  placeholder="请选择角色名称"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.region" placeholder="请选择状态">
            <el-option label="正常" value="shanghai"></el-option>
            <el-option label="停用" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-row>
      <el-button type="primary" round @click="addUser">添加角色</el-button>
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
    >
      <el-table-column type="index" label="#" :index="indexMethod"> </el-table-column>
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="name" label="角色名称"></el-table-column>
      <el-table-column prop="explain" label="角色说明"></el-table-column>
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
      <el-table-column prop="creater" label="创建人" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="checker" label="审核人" show-overflow-tooltip>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="mini"
          >详情</el-button
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
      <el-button @click="del" type="primary">删除</el-button>
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
            name: "超级管理员",
            creationTime: "2019-09-12 32:30:24",
            updateTime: "2019-09-12 32:30:24",
            explain:"后台管理员权限、可以删除、编辑用户",
            status:"正常",
            creater:"系统",
            checker:"系统",
          },{
            name: "订单管理员",
            creationTime: "2019-09-12 32:30:24",
            updateTime: "2019-09-12 32:30:24",
            explain:"后台管理员权限、可以删除、编辑用户",
            status:"正常",
            creater:"系统",
            checker:"系统",
          },{
            name: "仓库管理员",
            creationTime: "2019-09-12 32:30:24",
            updateTime: "2019-09-12 32:30:24",
            explain:"后台管理员权限、可以删除、编辑用户",
            status:"正常",
            creater:"admin",
            checker:"admin",
          },{
            name: "产品管理员",
            creationTime: "2019-09-12 32:30:24",
            updateTime: "2019-09-12 32:30:24",
            explain:"后台管理员权限、可以删除、编辑用户",
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleClick(row) {
        console.log(row);
        this.$router.push({path:"/power/rolDetails"});
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
          rows.forEach(row => {
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
      //添加用户组
      addUser(){
        this.$router.push({ path: '/power/addRol'});
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
