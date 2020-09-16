<!---
 --@author  PanFu
 --@data 2019-07-13:56
 --@description MOJOWeb-index
 --@version 1.0
--->
<template>
  <div class="footer">
    <p>版权所有 贵州钱多多科技有限公司</p>
    <p>@{{ year }} PFUNI.CN 黔ICP备19010969号-1</p>
  </div>
</template>

<script>
export default {
  name: "footers",
  components: {},
  mounted() {
    console.log("我是footer");
    let myDate = new Date();
    this.year = myDate.getFullYear();
  },
  data() {
    return {
      year:""
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
  .footer {
    position: absolute;
    right:0;
    bottom:0;
    text-align: center;
    color: #333;
    line-height: 30px;
    font-size: 12px;
    width: calc(99.5% - 284px);
  }
</style>
