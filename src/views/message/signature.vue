<template>
  <div class="search">
    <div class="title-box">
      <el-form ref="form" :inline="true" :model="form" label-width="80px">
        <el-form-item label="签名内容:">
          <el-input v-model="form.name"  placeholder="请输入签名内容"></el-input>
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
            style="width: 100%;position: relative"
            stripe
            highlight-current-row
            :header-cell-style="{background:'#eef1f6',color:'#18333f'}"
    >
      <el-table-column fixed type="index" label="#">
      </el-table-column>
      <el-table-column label="签名信息" prop="name">
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
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection(tableData)">全选</el-button>
<!--      <el-button @click="toggleSelection()">取消选择</el-button>-->
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
            name:"【光大银行】",
            monicker:"小张",
            time: "2020-09-12 18:30:30",
          }
        ],
        multipleSelection: []
      };
    },
    methods: {
      //查询
      onSubmit(){

      },
      //添加签名
      addSignature(){
            this.$prompt('请输入签名', '系统提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            }).then(({ value }) => {
              console.log("确定")
            }).catch(() => {
              console.log("取消")
            });
      }
    }
  };
</script>
