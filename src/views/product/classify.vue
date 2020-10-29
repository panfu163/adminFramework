<template>
  <div class="search">
    <div class="title-box">
      <div class="des">
        <i class="el-icon-info" />
        <div class="title-content">
          <p>
            商品分类是指根据一定的管理目的，为满足商品生产、流通、消费活动的全部或部分需要，将管理范围内的商品集合总体，
            以所选择的适当的商品基本特征作为分类标志，逐次归纳为若干个范围更小、特质更趋一致的子集合体（类目），
            例如大类、中类、小类、细类，直至品种、细目等，从而使该范围内所有商品得以明确区分与体系化的过程。
          </p>
        </div>
      </div>
    </div>
    <el-row>
      <el-button
        type="primary"
        round
        @click="addClassify"
      >
        添加分类
      </el-button>
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
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column
        type="index"
        :index="indexMethod"
        label="#"
      />
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        label="分类名称"
        width="220"
      >
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column
        prop="fullName"
        label="商品数量"
      />
      <el-table-column
        prop="department"
        label="商品单位"
        show-overflow-tooltip
      />
      <el-table-column
        prop="leavelineTime"
        label="导航栏"
        show-overflow-tooltip
      />
      <el-table-column
        prop="fullName"
        label="显否显示"
      />
      <el-table-column
        prop="mail"
        label="价格分级"
      />
      <el-table-column
        prop="phone"
        label="排序"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="200"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="handleClick(scope.row)"
          >
            转移商品
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="handleClick(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click.native.prevent="deleteRow(scope.row, scope.$index)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection(tableData)">
        全选
      </el-button>
      <el-button @click="toggleSelection()">
        取消选择
      </el-button>
      <el-button
        type="primary"
        @click="del()"
      >
        删除
      </el-button>
    </div>
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :total="1000"
    />

    <!--弹框-添加用户-->
    <el-drawer
      title="添加分类"
      :visible.sync="drawer"
      direction="rtl"
      size="50%"
      :before-close="handleClose"
      class="drawer"
      :append-to-body="true"
    >
      <addClassify
        v-if="drawerIndex===1"
        @handleClose="handleClose"
      />
      <addClassify
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
    .des {
      display: flex;
      & > i {
        padding-top: 0.5em;
        @include color("color");
      }
      .title-content {
        padding-left: 10px;
        margin-bottom: 20px;
        p {
          margin-top: 0.5em;
          margin-bottom: 0.5em;
          font-size: 12px;
          line-height: 1.5 !important;
        }
      }
    }
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
import addClassify from "@/views/product/components/addClassify";
export default {
  components:{addClassify},
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
          name: "女士",
          state:"下架",
          fullName:"是",
          department:"双",
          onlineTime: "2020-12-20 20:30:30",
          leavelineTime:"2022-02-03 20:30:30",
          userRol:"超级管理员",
          phone:"1",
          mail:"180.00",
          children: [{
            id: 31,
            date: '用户管理',
            name: '衣服',
            address: '上海市普陀区金沙江路 1519',
            url:"http://www.pfuni.cn",
            phone:"1",
            icon:"el-icon-help"
          }, {
            id: 32,
            date: '角色',
            name: '裤子',
            address: '上海市普陀区金沙江路1519',
            url:"http://www.pfuni.cn",
            phone:"2",
            icon:"el-icon-help"
          }]
        },
        {
          name: "男士",
          state:"缺货",
          fullName:"否",
          department:"个",
          onlineTime: "2020-12-20 20:30:30",
          leavelineTime:"2022-02-03 20:30:30",
          userRol:"超级管理员",
          phone:"2",
          mail:"380.00"
        },
        {
          name: "儿童",
          state:"在售",
          fullName:"是",
          department:"个",
          onlineTime: "2020-12-20 20:30:30",
          leavelineTime:"2022-02-03 20:30:30",
          userRol:"超级管理员",
          phone:"3",
          mail:"680.00"
        }, {
          name: "老人",
          state: "待上架",
          fullName:"否",
          department:"个",
          onlineTime: "2020-12-20 20:30:30",
          leavelineTime:"2022-02-03 20:30:30",
          userRol:"超级管理员",
          phone:"4",
          mail:"880.00"
        },

      ],
      multipleSelection: [],//被选中的记录数据-----对应“批量删除”传的参数值
      drawer:false,
      drawerIndex:1,
    };
  },
  mounted() {
    //3秒后关掉加载
    setTimeout(() => {
      this.loading = false;
    }, 1000);
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
          this.getChildren(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //递归算法-处理全选功能
    getChildren(list){
      if(!list.children) return;
      list.children.forEach(row=>{
        this.getChildren(row);
        this.$refs.multipleTable.toggleRowSelection(row);
        return row;
      });
    },
    indexMethod(index) {
      //自定义索引
      return index * 1;
    },
    //添加用户组
    addClassify(){
      this.drawer=true;
    },
    handleClose(){
      this.drawer=false;
    }
  }
};
</script>
