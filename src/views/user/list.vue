<template>
  <div class="search">
    <div class="title-box">
      <el-form ref="form" :inline="true" :model="form" label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="用户等级">
          <el-select v-model="form.region" placeholder="请选择用户等级">
            <el-option label="普通" value="shanghai"></el-option>
            <el-option label="VIP" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="注册时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="1"> - </el-col>
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
            <el-checkbox label="在线" name="type"></el-checkbox>
            <el-checkbox label="离线" name="type"></el-checkbox>
            <el-checkbox label="待审核" name="type"></el-checkbox>
            <el-checkbox label="黑名单" name="type"></el-checkbox>
          </el-checkbox-group>
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
    >
      <el-table-column fixed type="index" label="头像" :index="indexMethod">
      </el-table-column>
      <el-table-column fixed type="selection" width="55"> </el-table-column>
      <el-table-column width="80">
        <template slot-scope="scope">
          <img
            :src="scope.row.head_pic"
            width="40"
            height="40"
            style="vertical-align: middle"
          />
        </template>
      </el-table-column>
      <el-table-column label="账号名称" width="150">
        <template slot-scope="scope">
          {{ scope.row.date }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="手机号" width="120">
      </el-table-column>
      <el-table-column prop="user" label="用户等级" width="120">
      </el-table-column>
      <el-table-column prop="adminuser" label="地区" width="100">
      </el-table-column>
      <el-table-column prop="weixin" label="微信号" width="140">
      </el-table-column>
      <el-table-column prop="pay" label="支付宝号" width="140">
      </el-table-column>
      <el-table-column prop="mailbox" label="邮箱" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="time" label="注册时间" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="state" label="状态" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="time" label="离线时间" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="promotionID"
        label="推广账号"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="promotionID" label="默认" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="promotionID" label="默认" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="promotionID" label="默认" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="promotionID" label="默认" show-overflow-tooltip>
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
}
</style>
<script>
export default {
  data() {
    return {
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
          date: "panfu",
          name: "18285533808",
          address: "12",
          adminuser: "北京",
          user: "普通用户组",
          state: "在线",
          mailbox: "panfu163@126.com",
          weixin: "panfu163@126.com",
          pay: "panfu163@126.com",
          time: "2020-09-12 18:30:30",
          promotionID: "panfu",
          head_pic:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          date: "pengweisen",
          name: "18285533808",
          adminuser: "北京",
          user: "VIP用户组",
          state: "在线",
          address: "12",
          mailbox: "panfu163@126.com",
          weixin: "panfu163@126.com",
          pay: "panfu163@126.com",
          time: "2020-09-12 18:30:30",
          promotionID: "panfu",
          head_pic:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          date: "panfu163@126.com",
          name: "18285533808",
          adminuser: "北京",
          user: "砖石会员",
          state: "在线",
          address: "12",
          mailbox: "panfu163@126.com",
          weixin: "panfu163@126.com",
          pay: "panfu163@126.com",
          time: "2020-09-12 18:30:30",
          promotionID: "panfu",
          head_pic:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          date: "panfu163@126.com",
          name: "18285533808",
          adminuser: "北京",
          state: "离线",
          user: "普通用户组",
          address: "12",
          mailbox: "panfu163@126.com",
          weixin: "panfu163@126.com",
          pay: "panfu163@126.com",
          time: "2020-09-12 18:30:30",
          promotionID: "panfu",
          head_pic:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          date: "panfu163@126.com",
          name: "18285533808",
          adminuser: "贵州贵阳",
          state: "离线",
          user: "普通用户组",
          address: "12",
          mailbox: "panfu163@126.com",
          weixin: "panfu163@126.com",
          pay: "panfu163@126.com",
          time: "2020-09-12 18:30:30",
          promotionID: "panfu",
          head_pic:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          date: "panfu163@126.com",
          name: "18285533808",
          adminuser: "贵州贵阳",
          user: "普通用户组",
          state: "离线",
          address: "12",
          mailbox: "panfu163@126.com",
          weixin: "panfu163@126.com",
          pay: "panfu163@126.com",
          time: "2020-09-12 18:30:30",
          promotionID: "panfu",
          head_pic:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          date: "panfu163@126.com",
          name: "18285533808",
          adminuser: "贵州贵阳",
          user: "普通用户组",
          state: "离线",
          address: "12",
          mailbox: "panfu163@126.com",
          weixin: "panfu163@126.com",
          pay: "panfu163@126.com",
          time: "2020-09-12 18:30:30",
          promotionID: "panfu",
          head_pic:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          date: "panfu163@126.com",
          name: "18285533808",
          adminuser: "贵州贵阳",
          user: "普通用户组",
          state: "离线",
          address: "12",
          mailbox: "panfu163@126.com",
          weixin: "panfu163@126.com",
          pay: "panfu163@126.com",
          time: "2020-09-12 18:30:30",
          promotionID: "panfu",
          head_pic:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          date: "panfu163@126.com",
          name: "18285533808",
          adminuser: "贵州贵阳",
          user: "普通用户组",
          state: "离线",
          address: "12",
          mailbox: "panfu163@126.com",
          weixin: "panfu163@126.com",
          pay: "panfu163@126.com",
          time: "2020-09-12 18:30:30",
          promotionID: "panfu",
          head_pic:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          date: "panfu163@126.com",
          name: "18285533808",
          adminuser: "-",
          user: "普通用户组",
          state: "离线",
          address: "12",
          mailbox: "panfu163@126.com",
          weixin: "panfu163@126.com",
          pay: "panfu163@126.com",
          time: "2020-09-12 18:30:30",
          promotionID: "panfu",
          head_pic:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          date: "panfu163@126.com",
          name: "18285533808",
          adminuser: "-",
          user: "普通用户组",
          state: "离线",
          address: "12",
          mailbox: "panfu163@126.com",
          weixin: "panfu163@126.com",
          pay: "panfu163@126.com",
          time: "2020-09-12 18:30:30",
          promotionID: "panfu",
          head_pic:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          date: "panfu163@126.com",
          name: "18285533808",
          adminuser: "-",
          user: "普通用户组",
          state: "离线",
          address: "12",
          mailbox: "panfu163@126.com",
          weixin: "panfu163@126.com",
          pay: "panfu163@126.com",
          time: "2020-09-12 18:30:30",
          promotionID: "panfu",
          head_pic:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          date: "panfu163@126.com",
          name: "18285533808",
          adminuser: "-",
          user: "普通用户组",
          state: "离线",
          address: "12",
          mailbox: "panfu163@126.com",
          weixin: "panfu163@126.com",
          pay: "panfu163@126.com",
          time: "2020-09-12 18:30:30",
          promotionID: "panfu",
          head_pic:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          date: "panfu163@126.com",
          name: "18285533808",
          adminuser: "-",
          user: "普通用户组",
          state: "离线",
          address: "12",
          mailbox: "panfu163@126.com",
          weixin: "panfu163@126.com",
          pay: "panfu163@126.com",
          time: "2020-09-12 18:30:30",
          promotionID: "panfu",
          head_pic:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          date: "panfu163@126.com",
          name: "18285533808",
          adminuser: "-",
          user: "普通用户组",
          state: "离线",
          address: "12",
          mailbox: "panfu163@126.com",
          weixin: "panfu163@126.com",
          pay: "panfu163@126.com",
          time: "2020-09-12 18:30:30",
          promotionID: "panfu",
          head_pic:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          date: "panfu163@126.com",
          name: "18285533808",
          adminuser: "-",
          user: "普通用户组",
          state: "离线",
          address: "12",
          mailbox: "panfu163@126.com",
          weixin: "panfu163@126.com",
          pay: "panfu163@126.com",
          time: "2020-09-12 18:30:30",
          promotionID: "panfu",
          head_pic:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          date: "panfu163@126.com",
          name: "18285533808",
          adminuser: "-",
          user: "普通用户组",
          state: "离线",
          address: "12",
          mailbox: "panfu163@126.com",
          weixin: "panfu163@126.com",
          pay: "panfu163@126.com",
          time: "2020-09-12 18:30:30",
          promotionID: "panfu",
          head_pic:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          date: "panfu163@126.com",
          name: "18285533808",
          adminuser: "-",
          user: "普通用户组",
          state: "离线",
          address: "12",
          mailbox: "panfu163@126.com",
          weixin: "panfu163@126.com",
          pay: "panfu163@126.com",
          time: "2020-09-12 18:30:30",
          promotionID: "panfu",
          head_pic:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          date: "panfu163@126.com",
          name: "18285533808",
          adminuser: "-",
          user: "普通用户组",
          state: "离线",
          address: "12",
          mailbox: "panfu163@126.com",
          weixin: "panfu163@126.com",
          pay: "panfu163@126.com",
          time: "2020-09-12 18:30:30",
          promotionID: "panfu",
          head_pic:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          date: "panfu163@126.com",
          name: "18285533808",
          adminuser: "-",
          user: "普通用户组",
          state: "离线",
          address: "12",
          mailbox: "panfu163@126.com",
          weixin: "panfu163@126.com",
          pay: "panfu163@126.com",
          time: "2020-09-12 18:30:30",
          promotionID: "panfu",
          head_pic:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          date: "panfu163@126.com",
          name: "18285533808",
          adminuser: "-",
          user: "普通用户组",
          state: "离线",
          address: "12",
          mailbox: "panfu163@126.com",
          weixin: "panfu163@126.com",
          pay: "panfu163@126.com",
          time: "2020-09-12 18:30:30",
          promotionID: "panfu",
          head_pic:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          date: "panfu163@126.com",
          name: "18285533808",
          adminuser: "-",
          user: "普通用户组",
          state: "离线",
          address: "12",
          mailbox: "panfu163@126.com",
          weixin: "panfu163@126.com",
          pay: "panfu163@126.com",
          time: "2020-09-12 18:30:30",
          promotionID: "panfu",
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
    //跳转详情页
    getDetails() {
      this.$router.push({ path: "/user/details" });
    }
  }
};
</script>
