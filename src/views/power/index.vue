<template>
  <div class="search">
    <div class="title-box">
      <el-form
        ref="form"
        :inline="true"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="商品名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="仓库">
          <el-select
            v-model="form.region"
            placeholder="请选择活动区域"
          >
            <el-option
              label="总仓库"
              value="shanghai"
            />
            <el-option
              label="电商库"
              value="beijing"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="查询时间">
          <el-col :span="11">
            <el-date-picker
              v-model="form.date1"
              type="date"
              placeholder="选择日期"
              style="width: 100%;"
            />
          </el-col>
          <el-col
            class="line"
            :span="2"
          >
            -
          </el-col>
          <el-col :span="11">
            <el-time-picker
              v-model="form.date2"
              placeholder="选择时间"
              style="width: 100%;"
            />
          </el-col>
        </el-form-item>
      </el-form>
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="状态">
          <el-checkbox-group v-model="form.type">
            <el-checkbox
              label="已入库"
              name="type"
            />
            <el-checkbox
              label="已出库"
              name="type"
            />
            <el-checkbox
              label="待出库"
              name="type"
            />
            <el-checkbox
              label="待审核"
              name="type"
            />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="form.resource">
            <el-radio label="实物" />
            <el-radio label="虚拟" />
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
          >
            查询
          </el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-row>
      <el-button
        type="primary"
        round
      >
        添加商品
      </el-button>
      <el-button
        type="success"
        round
      >
        下架商品
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
    >
      <el-table-column
        type="index"
        :index="indexMethod"
      />
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        label=""
        width="60"
      >
        <template slot-scope="scope">
          <img
            :src="scope.row.head_pic"
            width="40"
            height="40"
            style="vertical-align: middle"
          >
        </template>
      </el-table-column>
      <el-table-column
        label="商品名称"
        width="250"
      >
        <template slot-scope="scope">
          {{ scope.row.date }}
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="库存单位"
        width="120"
      />
      <el-table-column
        prop="address"
        label="实物库存"
        show-overflow-tooltip
      />
      <el-table-column
        prop="address"
        label="占用库存"
        show-overflow-tooltip
      />
      <el-table-column
        prop="address"
        label="可用库存"
        show-overflow-tooltip
      />
      <el-table-column
        prop="address"
        label="在途库存"
        show-overflow-tooltip
      />
      <el-table-column
        prop="address"
        label="总成本"
        show-overflow-tooltip
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
            查看
          </el-button>
          <el-button
            type="text"
            size="mini"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click.native.prevent="deleteRow(scope.$index, tableData)"
          >
            移除
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
    </div>
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :total="1000"
    />
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
      multipleSelection: []
    };
  },
  mounted() {
    //3秒后关掉加载
    setTimeout(res => {
      this.loading = false;
    }, 3000);
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
    }
  }
};
</script>
