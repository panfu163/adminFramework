<template>
  <div class="content">
    <div class="title-box">
      <div class="des">
        <i class="el-icon-info" />
        <div class="title-content">
          <p>
            组织架构是企业的流程运转、部门设置及职能规划等最基本的结构依据，常见的组织架构形式包括中央集权制、分权制、直线式以及矩阵式等。
          </p>
          <p><b>通常的操作步骤如下：</b></p>
          <p>
            创建组织架构，并为用户添架组织结构
          </p>
          <p>添加员工到组织架构（需要先创组织架构并完成对用户的授权）。</p>
        </div>
      </div>
    </div>

    <el-row>
      <el-col :span="6">
        <org />
      </el-col>
      <el-col :span="18">
        <user :set="2"/>
      </el-col>
    </el-row>
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
  .el-row-btn{
    text-align: right;
  }
}
</style>
<script>
import user from "./components/user";
import org from "./components/org";
export default {
  name:"List",
  components:{user,org},
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
    //查询
    onSubmit() {
      const loading = this.$loading({
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      setTimeout(() => {
        loading.close();
        for (let i = 0; i < 10; i++) {
          this.tableData.push({
            headPic:
                "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
            name: "admin" + i,
            state: "在线",
            fullName: "彭老总" + i,
            department: "总经办",
            onlineTime: "2020-12-20 20:30:30",
            leavelineTime: "2022-02-03 20:30:30",
            userRol: "超级管理员",
            phone: "18288888888",
            mail: "1602858720@qq.com"
          });
        }
      }, 2000);
    },
  }
};
</script>
