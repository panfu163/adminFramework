<template>
  <div class="search">
    <div class="title-box">
      <el-form ref="form" :inline="true" :model="form">
        <el-form-item label="单位名称：">
          <el-input v-model="form.name" placeholder="请输入品牌名称"></el-input>
        </el-form-item>
        <el-form-item class="el-row-btn">
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button>导出</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-row>
      <el-button type="primary" round @click="addBrand(1,'添加品牌')">添加单位</el-button>
    </el-row>
    <el-table
      ref="multipleTable"
      v-loading="loading"
      :data="tableData"
      element-loading-text="拼命加载中..."
      tooltip-effect="dark"
      height="400"
      style="width: 100%"
      stripe
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="index" :index="indexMethod" label="#"> </el-table-column>
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="单位名称" prop="name" width="220">
      </el-table-column>
      <el-table-column prop="type" label="单位类型" >
      </el-table-column>
      <el-table-column prop="source" label="单位来源" show-overflow-tooltip >
      </el-table-column>
      <el-table-column prop="sort" label="排序"  show-overflow-tooltip>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="addBrand(2,'修改品牌')" type="text" size="mini"
            >编辑</el-button
          >
          <el-button
            @click.native.prevent="deleteRow(scope.row, scope.$index)" type="text" size="mini">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection(tableData)">全选</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
      <el-button @click="del()"  type="primary">删除</el-button>
    </div>
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :total="1000"
    >
    </el-pagination>


    <!--弹框-添加用户-->
    <el-drawer
        :title="title"
        :visible.sync="drawer"
        direction="rtl"
        size="50%"
        :before-close="handleClose"
        class="drawer"
        :append-to-body="true"
    >
      <addBrand
          v-if="drawerIndex===1"
          @handleClose="handleClose"
      />
      <editBrand
          v-if="drawerIndex===2"
          @handleClose="handleClose"
      />
    </el-drawer>


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
  .el-row-btn{
    padding:0 40px;
  }
}
.el-row {
  text-align: right;
  padding: 20px;
}
</style>
<script>
import addBrand from "@/views/product/components/addBrand";
import editBrand from "@/views/product/components/editBrand";
export default {
  components:{addBrand,editBrand},
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
        desc: "",
        channel:"",
        category:""
      },
      tableData: [
        {
          name: "箱",
          type:"计数",
          source:'商家创建',
          sort:"1"
        },
        {
          name: "件",
          type:"计数",
          source:"商家创建",
          sort:"2"
        },
        {
          name: "千克",
          type:"计重",
          source:"商家创建",
          sort:"3"
        }, {
          name: "米",
          type:"计量",
          source:"系统预设",
          sort:"4"
        },

      ],
      multipleSelection: [],//被选中的记录数据-----对应“批量删除”传的参数值
      title:"系统提示",
      drawer:false,
      drawerIndex:1,
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
    addBrand(index,title){
      this.drawer=true;
      this.drawerIndex=index;
      this.title=title;
    }
  },
  mounted() {
    //3秒后关掉加载
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
};
</script>
