<template>
  <div class="search">
    <div class="title-box">
      <el-form ref="form" :inline="true" :model="form" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="仓库">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="总仓库" value="shanghai"></el-option>
            <el-option label="电商库" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="查询时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker
              placeholder="选择时间"
              v-model="form.date2"
              style="width: 100%;"
            ></el-time-picker>
          </el-col>
        </el-form-item>
      </el-form>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="状态">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="已入库" name="type"></el-checkbox>
            <el-checkbox label="已出库" name="type"></el-checkbox>
            <el-checkbox label="待出库" name="type"></el-checkbox>
            <el-checkbox label="待审核" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="form.resource">
            <el-radio label="实物"></el-radio>
            <el-radio label="虚拟"></el-radio>
          </el-radio-group>
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
      <el-table-column type="index" :index="indexMethod"> </el-table-column>
      <el-table-column type="selection" width="55"> </el-table-column>
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
      <el-table-column prop="name" label="库存单位" width="120">
      </el-table-column>
      <el-table-column prop="address" label="实物库存" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="address" label="占用库存" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="address" label="可用库存" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="address" label="在途库存" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="address" label="总成本" show-overflow-tooltip>
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
        <el-form-item label="商品图片" :label-width="formLabelWidth">

          <!--上产图片-->
          <el-upload
                  action="#"
                  list-type="picture-card"
                  :auto-upload="false">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img
                      class="el-upload-list__item-thumbnail"
                      :src="file.url" alt=""
              >
              <span class="el-upload-list__item-actions">
        <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
        >
          <i class="el-icon-download"></i>
        </span>
        <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          <!--上产图片NED-->
        </el-form-item>
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品编码" :label-width="formLabelWidth">
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
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.desc"
                    type="textarea"
                    placeholder="请输入内容"
                    maxlength="200"
                    show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="供应商" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择状态">
            <el-option label="华为公司" value="shanghai"></el-option>
            <el-option label="深圳公司" value="beijing"></el-option>
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
          date: "实物商品（购买时需填写收货地址，测试商品，不发货，不退款）",
          name: "个",
          address: "12",
          head_pic:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          date: "实物商品（购买时需填写收货地址，测试商品，不发货，不退款）",
          name: "个",
          address: "22",
          head_pic:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          date: "实物商品（购买时需填写收货地址，测试商品，不发货，不退款）",
          name: "个",
          address: "22",
          head_pic:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          date: "实物商品（购买时需填写收货地址，测试商品，不发货，不退款）",
          name: "个",
          address: "22",
          head_pic:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          date: "实物商品（购买时需填写收货地址，测试商品，不发货，不退款）",
          name: "个",
          address: "12",
          head_pic:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          date: "实物商品（购买时需填写收货地址，测试商品，不发货，不退款）",
          name: "个",
          address: "22",
          head_pic:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          date: "实物商品（购买时需填写收货地址，测试商品，不发货，不退款）",
          name: "个",
          address: "22",
          head_pic:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        }
      ],
      multipleSelection: [],
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false
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
    //图片处理
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    }
  },
  mounted() {
    //3秒后关掉加载
    setTimeout(res => {
      this.loading = false;
    }, 3000);
  }
};
</script>
