<template>
  <div class="search">
    <div class="title-box">
      <el-form ref="form" :inline="true" :model="form" label-width="120px">
        <el-form-item label="商品名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="供应商名称">
          <el-select v-model="form.region" placeholder="请选择供应商">
            <el-option label="淘宝公司" value="shanghais"></el-option>
            <el-option label="华为公司" value="beijings"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌名称">
          <el-select v-model="form.desc" placeholder="请选择品牌">
            <el-option label="苹果" value="shanghai"></el-option>
            <el-option label="小米" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="录入时间">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.date1"
              style="width: 100%;"
            ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-row>
      <el-button type="success"  round @click="addProduct">添加商品</el-button>
<!--      <el-button type="success" round>下架商品</el-button>-->
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
      <el-table-column type="index" label="#" :index="indexMethod"> </el-table-column>
      <el-table-column type="selection"  width="55"> </el-table-column>
      <el-table-column label="" width="60">
        <template slot-scope="scope">
          <img
            :src="scope.row.head_pic"
            width="40"
            height="40"
            style="vertical-align: middle"
          />
        </template>
      </el-table-column>
      <el-table-column label="商品名称" width="250">
        <template slot-scope="scope">
          {{ scope.row.date }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="供应商名称" width="120">
      </el-table-column>
      <el-table-column prop="address" label="公司地址" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="phone" label="联系电话" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="userName" label="联系人" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="eml" label="联系邮箱" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="address" label="产地" show-overflow-tooltip>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="mini"
            >查看</el-button
          >
          <el-button type="text" size="mini">编辑</el-button>
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="mini"
          >
            移除
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

    <el-dialog title="添加商品"
               :visible.sync="dialogFormVisible"
               :append-to-body="appendToBody"
    >
      <el-form :model="form">
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="库存：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="进货价" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="批发价" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="销售价" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动价" :label-width="formLabelWidth">
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
      dialogFormVisible: false,
      loading: true,
      formLabelWidth:"120px",
      appendToBody:true,
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
          date: "华为手机X100",
          name: "华为科技有限公司",
          address: "广东省深圳市福田区华强北188号",
          phone:"18285533797",
          eml:"1602858720@qq.com",
          userName:"潘先生",
          head_pic:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          date: "华为手机X100",
          name: "华为科技有限公司",
          address: "广东省深圳市福田区华强北188号",
          phone:"18285533797",
          eml:"1602858720@qq.com",
          userName:"潘先生",
          head_pic:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          date: "华为手机X100",
          name: "华为科技有限公司",
          address: "广东省深圳市福田区华强北188号",
          phone:"18285533797",
          eml:"1602858720@qq.com",
          userName:"潘先生",
          head_pic:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          date: "华为手机X100",
          name: "华为科技有限公司",
          address: "广东省深圳市福田区华强北188号",
          phone:"18285533797",
          eml:"1602858720@qq.com",
          userName:"潘先生",
          head_pic:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          date: "华为手机X100",
          name: "华为科技有限公司",
          address: "广东省深圳市福田区华强北188号",
          phone:"18285533797",
          eml:"1602858720@qq.com",
          userName:"潘先生",
          head_pic:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          date: "华为手机X100",
          name: "华为科技有限公司",
          address: "广东省深圳市福田区华强北188号",
          phone:"18285533797",
          eml:"1602858720@qq.com",
          userName:"潘先生",
          head_pic:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          date: "华为手机X100",
          name: "华为科技有限公司",
          address: "广东省深圳市福田区华强北188号",
          phone:"18285533797",
          eml:"1602858720@qq.com",
          userName:"潘先生",
          head_pic:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
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
    //添加商品
    addProduct(){
      this.dialogFormVisible=true
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
  },
  mounted() {
    //3秒后关掉加载
    setTimeout(res => {
      this.loading = false;
    }, 3000);
  }
};
</script>
