<template>
  <div class="search">
    <div class="title-box">
      <el-form ref="form" :inline="true" :model="form">
        <el-form-item label="商品筛选：">
          <el-input v-model="form.name" placeholder="请输入商品名称/条码/编码"></el-input>
        </el-form-item>
        <el-form-item label="销售渠道：">
          <el-select v-model="form.region" placeholder="发布于">
            <el-option label="全部" value="all"></el-option>
            <el-option label="发布于" value="published-on"></el-option>
            <el-option label="未发布于" value="not-published-on"></el-option>
            <el-option label="未分配渠道" value="unallocated"></el-option>
          </el-select>
          <el-select v-model="form.channel" placeholder="全部渠道" style="width: 110px;margin-left:10px;">
            <el-option label="全部渠道" value="shanghai"></el-option>
            <el-option label="门店" value="beijing"></el-option>
            <el-option label="网店" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品分类:">
          <el-select v-model="form.category" placeholder="所有分类">
            <el-option label="未分类" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="首选供应商:">
          <el-select v-model="form.category" placeholder="全部">
            <el-option label="未分类" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品牌:">
          <el-select v-model="form.category" placeholder="全部">
            <el-option label="未分类" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="存货类别:">
          <el-select v-model="form.category" placeholder="全部">
            <el-option label="全部" value="beijing"></el-option>
            <el-option label="产成品" value="beijing"></el-option>
            <el-option label="半成品" value="beijing"></el-option>
            <el-option label="原材料" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品来源:">
          <el-select v-model="form.category" placeholder="全部">
            <el-option label="总部创建" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="el-row-btn">
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button>导出</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-row>
      <el-button type="success" round @click="">导入商品</el-button>
      <el-button type="primary" round @click="addUser">添加商品</el-button>
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
      <el-table-column label="" width="60">
        <template slot-scope="scope">
          <img
            :src="scope.row.headPic"
            width="40"
            height="40"
            style="vertical-align: middle"
          />
        </template>
      </el-table-column>
      <el-table-column label="商品名称" width="220">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" >
      </el-table-column>
      <el-table-column prop="onlineTime" label="上架时间" show-overflow-tooltip >
      </el-table-column>
      <el-table-column prop="leavelineTime" label="下架时间"  show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="fullName" label="库存">
      </el-table-column>
      <el-table-column prop="department" label="单位">
      </el-table-column>
      <el-table-column prop="phone" label="销售价">
      </el-table-column>
      <el-table-column prop="mail" label="市场价" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="150">
        <template slot-scope="scope">
          <el-switch
                  v-model="scope.row.status"
                  inactive-text="上架"
                  active-text="下架"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="userRol" label="所在用户组">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="mini"
            >查看</el-button
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
      <el-button @click="toggleSelection()">商品上架</el-button>
      <el-button @click="toggleSelection()">商品下架</el-button>
      <el-button @click="del()"  type="primary">删除</el-button>
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
        desc: "",
        channel:"",
        category:""
      },
      tableData: [
        {
          headPic:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          name: "六桂福（LUK KWAI FOOK）黄金吊坠 莲纹八宝牌 古法黄金吊坠项链足金吊坠送配绳男女款 BD0748 6.7-6.79g",
          state:"下架",
          fullName:"122",
          department:"双",
          onlineTime: "2020-12-20 20:30:30",
          leavelineTime:"2022-02-03 20:30:30",
          userRol:"超级管理员",
          phone:"80.00",
          mail:"180.00"
        },
        {
          headPic:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          name: "六桂福（LUK KWAI FOOK）黄金吊坠 莲纹八宝牌 古法黄金吊坠项链足金吊坠送配绳男女款 BD0748 6.7-6.79g",
          state:"缺货",
          fullName:"124",
          department:"个",
          onlineTime: "2020-12-20 20:30:30",
          leavelineTime:"2022-02-03 20:30:30",
          userRol:"超级管理员",
          phone:"180.00",
          mail:"380.00"
        },
        {
          headPic:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          name: "六桂福（LUK KWAI FOOK）黄金吊坠 莲纹八宝牌 古法黄金吊坠项链足金吊坠送配绳男女款 BD0748 6.7-6.79g",
          state:"在售",
          fullName:"132",
          department:"个",
          onlineTime: "2020-12-20 20:30:30",
          leavelineTime:"2022-02-03 20:30:30",
          userRol:"超级管理员",
          phone:"280.00",
          mail:"680.00"
        }, {
          headPic:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          name: "六桂福（LUK KWAI FOOK）黄金吊坠 莲纹八宝牌 古法黄金吊坠项链足金吊坠送配绳男女款 BD0748 6.7-6.79g",
          state: "待上架",
          fullName:"243",
          department:"个",
          onlineTime: "2020-12-20 20:30:30",
          leavelineTime:"2022-02-03 20:30:30",
          userRol:"超级管理员",
          phone:"380.00",
          mail:"880.00"
        },

      ],
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
      this.$router.push({ path: '/product/addProduct'});
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
