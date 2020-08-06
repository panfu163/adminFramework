<template>
  <div class="content">
    <div class="title-box">
      <el-form ref="formId" :inline="true" :model="form" label-width="80px">
        <el-form-item label="用户名：" prop="name">
          <el-input v-model="form.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="在线状态：" prop="region" label-width="120px">
          <el-select v-model="form.region" placeholder="请选择用户在线状态">
            <el-option label="在线" value="online"></el-option>
            <el-option label="离线" value="offline"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态：" prop="state">
          <el-select v-model="form.state"  placeholder="请选择当前状态">
            <el-option label="正常" value="normal"></el-option>
            <el-option label="停用" value="stop"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button @click="onReset()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-row>
      <el-button type="success" round @click="addUser">添加用户</el-button>
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
      :header-cell-style="{background:'#eef1f6',color:'#18333f'}"
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
      <el-table-column label="用户名" width="120">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="在线状态" >
      </el-table-column>
      <el-table-column prop="onlineTime" label="在线时间" show-overflow-tooltip >
      </el-table-column>
      <el-table-column prop="leavelineTime" label="离线时间"  show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="fullName" label="姓名">
      </el-table-column>
      <el-table-column prop="department" label="部门">
      </el-table-column>
      <el-table-column prop="phone" label="联系电话">
      </el-table-column>
      <el-table-column prop="mail" label="联系邮箱" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="150">
        <template slot-scope="scope">
          <el-switch
                  v-model="scope.row.status"
                  inactive-text="启用"
                  active-text="停用"
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
.content {
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
        state:"",
      },
      tableData: [
        {
          headPic:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          name: "admin",
          state:"在线",
          fullName:"彭老总",
          department:"总经办",
          onlineTime: "2020-12-20 20:30:30",
          leavelineTime:"2022-02-03 20:30:30",
          userRol:"超级管理员",
          phone:"18288888888",
          mail:"1602858720@qq.com"
        },
        {
          headPic:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          name: "panfu",
          state:"在线",
          fullName:"彭老总",
          department:"总经办",
          onlineTime: "2020-12-20 20:30:30",
          leavelineTime:"2022-02-03 20:30:30",
          userRol:"超级管理员",
          phone:"18288888888",
          mail:"1602858720@qq.com"
        },
        {
          headPic:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          name: "pengweix",
          state:"离线",
          fullName:"彭老总",
          department:"总经办",
          onlineTime: "2020-12-20 20:30:30",
          leavelineTime:"2022-02-03 20:30:30",
          userRol:"超级管理员",
          phone:"18288888888",
          mail:"1602858720@qq.com"
        }, {
          headPic:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          name: "admin",
          state: "在线",
          fullName:"彭老总",
          department:"总经办",
          onlineTime: "2020-12-20 20:30:30",
          leavelineTime:"2022-02-03 20:30:30",
          userRol:"超级管理员",
          phone:"18288888888",
          mail:"1602858720@qq.com"
        },

      ],
      multipleSelection: [],//被选中的记录数据-----对应“批量删除”传的参数值
    };
  },
  methods: {
    //查询
    onSubmit() {
      const loading = this.$loading({
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        loading.close();
        for(let i=0;i<10;i++){
          this.tableData.push({
            headPic:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
            name: "admin"+i,
            state: "在线",
            fullName:"彭老总"+i,
            department:"总经办",
            onlineTime: "2020-12-20 20:30:30",
            leavelineTime:"2022-02-03 20:30:30",
            userRol:"超级管理员",
            phone:"18288888888",
            mail:"1602858720@qq.com"
          })
        }
      }, 2000);
    },
    //重置
    onReset(){
      console.log("=========")
      this.$refs.formId.resetFields()
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
      this.$router.push({ path: '/power/addUser'});
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
