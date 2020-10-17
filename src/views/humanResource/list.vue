<template>
  <div class="content">
    <div class="title-box">
      <div class="des">
        <i class="el-icon-info" />
        <div class="title-content">
          <p>
            用户是一个身份实体，它通常代表您的组织中需要访问资源的人员或应用程序。
          </p>
          <p><b>通常的操作步骤如下：</b></p>
          <p>
            创建用户，并为用户设置登录密码（用户登录控制台场景）或创建
            AccessKey（应用程序调用 API 场景）。
          </p>
          <p>添加用户到用户组（需要先创建用户组并完成对用户组的授权）。</p>
        </div>
      </div>
    </div>
    <user />
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
export default {
  name:"List",
  components:{user},
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
  }
};
</script>
