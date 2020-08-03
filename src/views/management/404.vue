<template>
  <div>
    <div class="app-container">
      <el-col :span="12">
        <img
          src="@/assets/img/management/gif_404.gif"
          alt="404"
          class="img-style"
        />
      </el-col>
      <el-col :span="12">
        <div class="box">
          <h1>系统提示!</h1>
          <h2>很抱歉，页面它不小心迷路了！</h2>
          <div style="color:#909399;font-size: 14px">
            请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告
          </div>
          <el-button class="but" type="primary" round @click="handleGoMain"
            >返回首页</el-button
          >
        </div>
      </el-col>
    </div>
  </div>
</template>

<script>
export default {
  name: "wrongPage",
  data() {
    return {};
  },
  methods: {
    handleGoMain() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style type="text/css" lang="scss" scoped>
.app-container {
  width: 80%;
  height: 100%;
  margin: 220px auto;
  overflow: hidden;
  background: #fff;
  .box {
    margin-left: 100px;
    margin-top: 60px;
    h1 {
      margin-bottom: 20px;
    }
    h2 {
      color: #606266;
    }
    .but {
      margin-top: 50px;
      text-align: center;
    }
  }
  .img-style {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
