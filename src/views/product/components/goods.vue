<template>
  <div>
    <el-row>
      <el-form
        ref="form"
        :inline="true"
        :model="form"
      >
        <el-form-item label="商品名称:">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
          >
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      height="400"
      style="width: 100%"
      stripe
      highlight-current-row
      :header-cell-style="{background:'#eef1f6',color:'#18333f'}"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="index"
        label="#"
        :index="indexMethod"
      />
      <el-table-column
        prop=""
        label="单选"
        width="60"
      >
        <template slot-scope="scope">
          <el-radio
            v-model="id"
            :label="scope.row.id"
          >
                        &nbsp;
          </el-radio>
        </template>
      </el-table-column>
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
        label="供应商名称"
        width="120"
      />
      <el-table-column
        prop="address"
        label="公司地址"
        show-overflow-tooltip
      />
      <el-table-column
        prop="phone"
        label="联系电话"
        show-overflow-tooltip
      />
      <el-table-column
        prop="userName"
        label="联系人"
        show-overflow-tooltip
      />
      <el-table-column
        prop="eml"
        label="联系邮箱"
        show-overflow-tooltip
      />
      <el-table-column
        prop="address"
        label="产地"
        show-overflow-tooltip
      />
    </el-table>
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :total="1000"
    />
    <el-row class="el-row-box">
      <el-button
        type="success"
        @click="onSubmit"
      >
        确定
      </el-button>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "Goods",
        data(){
            return{
                form: {
                    name: "",
                    region: "",
                    date1: "",
                    date2: "",
                    delivery: false,
                    type: [],
                    resource: "",
                    desc: "",
                },
                tableData: [
                    {
                        id:1,
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
                        id:2,
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
                        id:3,
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
                        id:4,
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
                        id:5,
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
                        id:6,
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
                        id:7,
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
            };
        }
    };
</script>

<style scoped lang="scss">
    .el-row-box{
        text-align: right;
        padding: 20px 0;
    }
</style>