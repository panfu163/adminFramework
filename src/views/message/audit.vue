<template>
  <div class="search">
    <div class="title-box">
      <el-form ref="form" :inline="true" :model="form" label-width="80px">
        <el-form-item label="短信标题:">
          <el-input v-model="form.name"  placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="聚道:">
          <el-select v-model="form.channel" placeholder="请选择公司名称">
            <el-option label="移动" value="shanghai"></el-option>
            <el-option label="联通" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核状态:">
          <el-select v-model="form.state" placeholder="请选择审核状态">
            <el-option label="通过" value="shanghai"></el-option>
            <el-option label="未通过" value="shanghai"></el-option>
            <el-option label="已通过" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>

    </div>
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
      <el-table-column label="短信标题" prop="name" width="150">
      </el-table-column>
      <el-table-column prop="type" label="类型" width="120">
      </el-table-column>
      <el-table-column prop="company" label="渠道" width="120">
      </el-table-column>
      <el-table-column prop="phone" label="短信签名" width="120">
      </el-table-column>
      <el-table-column prop="state" label="短信场景" width="120"></el-table-column>
      <el-table-column prop="address" label="发送内容"></el-table-column>
      <el-table-column prop="time" label="最后更新时间"  width="180">
      </el-table-column>
      <el-table-column prop="states" label="审核状态"  width="180">
      </el-table-column>
      <el-table-column prop="monicker" label="操作人" width="120">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="80">
        <template slot-scope="scope">
          <el-button @click="addTemplate(scope.row)" type="text" size="mini"
          >审核</el-button
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
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '',
        value2: '',
        value3: '',
        form: {
          channel:"",
          name:"",
          state:""
        },
        tableData: [
          {
            name:"登录验证码",
            company:"移动公司",
            monicker:"小张",
            phone:"【光大银行】",
            address: "您正在使用新设备登录，确认后输入动态密码673825，发送序号1，任何人索取动态密码均为诈骗，切勿泄露！[光大银行]",
            state: "普通短信",
            time: "2020-09-12 18:30:30",
            type:"短信验证码",
            states:"审核通过"
          },{
            name:"注册验证码",
            company:"联通",
            monicker:"老王",
            phone:"【中国电信】",
            address: "您正在使用新设备登录，确认后输入动态密码673825，发送序号1，任何人索取动态密码均为诈骗，切勿泄露！[光大银行]",
            state: "普通短信",
            time: "2020-09-12 18:30:30",
            type:"短信验证码",
            states:"审核未通过"
          },
          {
            name:"十周年活动广告",
            company:"联通",
            monicker:"张三",
            phone:"【中国银行】",
            address: "公司十周年来宾大酬谢！10月1日进店送小轿车一输，任何人索取动态密码均为诈骗，切勿泄露！[光大银行]",
            state: "语音短信",
            time: "2020-09-12 18:30:30",
            type:"营销短信",
            states:"审核已通过"
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
      //添加模板
      addTemplate(){
        this.$router.push({ path: "/message/addAudit" });
      }
    }
  };
</script>
