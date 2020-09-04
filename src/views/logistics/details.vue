<template>
  <div class="content">
    <el-row class="title">
      <el-col :span="23">顺丰速运</el-col>
      <el-col :span="1"> <a href="https://www.sf-express.com/">官网</a></el-col>
    </el-row>
    <div class="step">
      <el-steps direction="vertical"   :active="1">
        <el-step title="配送中" description="快递小哥预计12：30右左到达" ></el-step>
        <el-step title="贵阳转运中心" description="到贵阳转运中心正发往南明二部"></el-step>
        <el-step title="已揽收" description="张三/182877873已揽收"></el-step>
        <el-step title="商家已发货" description="商家已发货,正在通知快递小哥来取货"></el-step>
        <el-step title="打包完成" description="开始打拣货单,已打包完成"></el-step>
        <el-step title="仓库配货中" description="仓库管理员正在配货中"></el-step>
      </el-steps>
    </div>
    <el-card class="box-card">
      <div v-for="(itme,index) in items" :key="index" class="text item">
        {{itme}}
      </div>
    </el-card>
  </div>
</template>
<style lang="scss" scoped>
.content {
  padding:20px 10px;
  background: #fff;
  box-sizing: border-box;
  .title{
    padding-bottom:10px;
    border-bottom:1px solid #eee;
    margin-bottom:20px;
  }
  .step{
    height: 600px;
    margin:0 0 50px 50px;
  }
}
</style>
<script>
export default {
  data() {
    return {
      items:["客服电话:95338","公司地址：北京三元里新街口","工作时间：08:00~00:00"]
    };
  },
  mounted() {
    //操作DOME 数据反向
    [...document.querySelectorAll('.el-steps .el-step__icon div')].forEach((el, index, arr) => {
      el.innerHTML = arr.length - index;
    });
  },
  methods: {
  }
};
</script>
