<template>
  <div class="content">
    <el-row>
      <el-col :span="3">
        <el-menu  default-active="1">
          <el-menu-item index="1">
          <i class="el-icon-s-tools"></i>
          <span slot="title">权限系统</span>
        </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">仓库系统</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">订单系统</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">产品系统</span>
          </el-menu-item>
        </el-menu>
      </el-col>


      <el-col :span="21" class="pagination">
        <h4>用户组</h4>
          <el-checkbox  class="el-checkbox-title" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        <h4>角色</h4>
        <el-checkbox  class="el-checkbox-title" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
       <el-button class="btn" type="primary">确定</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
.content {
  padding:0 10px 10px;
  background: #fff;
  box-sizing: border-box;
  h4{
    border-bottom: 1px solid #eee;
    padding-bottom:5px;
    margin-bottom:5px;
    margin-top:20px;
    display:block;
    font-size:18px;
  }
  h5{
    border-bottom: 1px solid #eee;
    padding-bottom:20px;
    margin-bottom:20px;
    display:block;
  }
  .btn{
    margin:20px 0;
  }
  .title-box {
    background: #ecf5ff;
    padding: 20px;
    margin-bottom: 10px;
  }
  .pagination {
    padding:10px 20px;
    .el-checkbox-title{
      margin-bottom:10px;
      &:first-child{
        margin-top:0;
      }
    }
  }
}
</style>
<script>
  const cityOptions = ['删除功能', '增加功能', '修改功能'];
export default {
  data() {
    return {
      checkAll: false,
      checkedCities: [],
      cities: cityOptions,
      isIndeterminate: true
    };
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    }
  },
  mounted() {
  }
};
</script>
