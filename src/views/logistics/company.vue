<template>
  <div class="search">
    <div class="title-box">
      <el-form ref="form" :inline="true" :model="form" label-width="80px">
        <el-form-item label="公司名称:">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="状态:">
          <el-select v-model="form.state" placeholder="请选择状态">
            <el-option label="正常" value="shanghai"></el-option>
            <el-option label="停用" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>

    </div>

    <el-row class="el-row">
      <el-button type="success" @click="getDetails(scope.row)">添加</el-button>
    </el-row>

    <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            height="480"
            style="width: 100%;position: relative"
            stripe
            highlight-current-row
            @selection-change="handleSelectionChange"
            :header-cell-style="{background:'#eef1f6',color:'#18333f'}"
    >
      <el-table-column fixed type="index" label="#" :index="indexMethod">
      </el-table-column>
      <el-table-column label="物流公司" prop="name" width="150">
      </el-table-column>
      <el-table-column prop="company" label="公司电话" width="120">
      </el-table-column>
      <el-table-column prop="monicker" label="操作人" width="120">
      </el-table-column>
      <el-table-column prop="phone" label="账户ID" width="120">
      </el-table-column>
      <el-table-column prop="state" label="状态">
        <template slot-scope="scope">
          <el-switch
                  v-model="scope.row.status"
                  inactive-text="启用"
                  active-text="停用"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="web" label="官网">
        <template slot-scope="scope">
          <a :href="scope.row.web" target="_blank">
            {{scope.row.web}}
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="公司地址" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="time" label="最后更新时间" show-overflow-tooltip>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="80">
        <template slot-scope="scope">
          <el-button @click="getDetails(scope.row)" type="text" size="mini"
          >查看</el-button
          >
          <!--          <el-button type="text" size="mini">发送邮箱</el-button>-->
          <!--          <el-button-->
          <!--            @click.native.prevent="deleteRow(scope.$index, tableData)"-->
          <!--            type="text"-->
          <!--            size="mini"-->
          <!--          >-->
          <!--            移除-->
          <!--          </el-button>-->
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
      text-align:right;
      padding:0 0 10px 0;
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
            name:"顺丰速运",
            company:"95338",
            monicker:"张三",
            phone:"18833808838",
            address: "贵州省贵阳市南明区顺丰速运配送点",
            state: "停用",
            time: "2020-09-12 18:30:30",
            web:"https://www.sf-express.com/"
          },{
            name:"韵达速递",
            company:"95336",
            monicker:"张三",
            phone:"18833808838",
            address: "贵州省贵阳市南明区顺丰速运韵达速递",
            state: "正常",
            time: "2020-09-12 18:30:30",
            web:"http://www.yundaex.com/"
          },
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
      },
      deleteRow(index, rows) {
        //删除
        rows.splice(index, 1);
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
      //跳转详情页
      getDetails() {
        this.$router.push({ path: "/logistics/details" });
      }
    }
  };
</script>
