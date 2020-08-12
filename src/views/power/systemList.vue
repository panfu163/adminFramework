<template>
  <div class="search">
    <div class="title-box">
      <el-form ref="form" :inline="true" :model="form" label-width="80px">
        <el-form-item label="权限名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.region" placeholder="请选择菜单状态">
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
      <el-button type="success" round @click="addUser">添加菜单</el-button>
    </el-row>
    <el-table
            ref="multipleTable"
            :data="tableData"
            style="width: 100%;margin-bottom: 20px;"
            row-key="id">
      <el-table-column type="index" label="#" :index="indexMethod"> </el-table-column>
      <el-table-column type="selection"></el-table-column>
      <el-table-column
              prop="title"
              label="权限名称">
      </el-table-column>
      <el-table-column
              prop="describe"
              label="权限说明">
      </el-table-column>
      <el-table-column
              prop="openingTime"
              label="开启时间">
      </el-table-column>
      <el-table-column
              prop="downTime"
              label="停用时间">
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
        <template slot-scope="scope">
          <el-button @click="addUser(scope.row)" type="text" size="mini"
          >编辑</el-button
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
<!--      <el-button @click="del()"  type="primary">删除</el-button>-->
    </div>
    <el-pagination
            class="pagination"
            background
            layout="prev, pager, next"
            :total="1000"
    >
    </el-pagination>



    <el-dialog title="添加权限"
               :visible.sync="dialogFormVisible"
               :append-to-body="appendToBody"
    >
      <el-form :model="form">
        <el-form-item label="权限名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.desc"
                    type="textarea"
                    placeholder="请输入内容"
                    maxlength="200"
                    show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择状态">
            <el-option label="正常" value="shanghai"></el-option>
            <el-option label="停用" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
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
        dialogFormVisible:false,
        appendToBody:true,
        formLabelWidth:"120px",
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
        tableData: [{
          id: 1,
          title:"产品管理权限",
          date:'2021-02-20 23:00:00',
          name:'王小虎',
          address:'上海市普陀区金沙江路1518',
          openingTime:"2021-02-20 23:00:00",
          downTime:"2022-02-20 23:00:00",
          describe:"订单系统：功能如下退货订单，支付订单、发货订单等"
        }, {
          id: 2,
          title:"仓库管理权限",
          date:'2021-02-20 23:00:00',
          name:'王小虎',
          address: '上海市普陀区金沙江路1517',
          openingTime:"2021-02-20 23:00:00",
          downTime:"2022-02-20 23:00:00",
          describe:"订单系统：功能如下退货订单，支付订单、发货订单等"
        }, {
          id:3,
          title:"权限管理",
          date:'2021-02-20 23:00:00',
          name:'王小虎',
          address: '上海市普陀区金沙江路1519',
          openingTime:"2021-02-20 23:00:00",
          downTime:"2022-02-20 23:00:00",
          describe:"订单系统：功能如下退货订单，支付订单、发货订单等"
        }, {
          id: 4,
          title:"查看订单管理",
          date:'2021-02-20 23:00:00',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516',
          openingTime:"2021-02-20 23:00:00",
          downTime:"2022-02-20 23:00:00",
          describe:"订单系统：功能如下退货订单，支付订单、发货订单等"
        }],
        multipleSelection: [],//被选中的记录数据-----对应“批量删除”传的参数值
      };
    },
    methods: {
      onSubmit() {
        console.log("submit!");
      },
      //先择
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleClick(row) {
        this.$router.push({ path: "/power/details" });
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
        this.dialogFormVisible=true;
      },
    },
    mounted() {
      //3秒后关掉加载
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    }
  };
</script>
