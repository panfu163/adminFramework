<template>
  <div class="product">
    <div>
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="1.编辑基本信息"
          name="first"
        >
         <basicInformation />
        </el-tab-pane>
        <el-tab-pane
          label="2.编辑商品详情"
          name="second"
        >
          <vdetails />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.product {
  padding: 10px;
  background: #fff;
  box-sizing: border-box;
}
</style>
<script>
import vdetails from  "./components/details";
import basicInformation from "./components/basicInformation";
export default {
  components:{
    vdetails,
    basicInformation
  },
  data() {
    return {
      activeName: "first"
    };
  },
  computed: {},
  mounted() {
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
