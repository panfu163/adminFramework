<template>
  <div class="content">
    <el-row>
      <el-col :span="3">
        <el-tree class="el-cols" accordion :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </el-col>
      <el-col :span="21" class="rbacseting">
        <h5>功能权限</h5>
        <el-checkbox  class="el-checkbox-title" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
        <h5>界面权限</h5>
        <el-checkbox  class="el-checkbox-title" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in cityOptions" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
       <el-button class="btn" type="primary">确定</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
.content {
  padding:10px 10px;
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
    padding-bottom:10px;
    margin-bottom:20px;
    display:block;
    text-align: left;
  }
  .btn{
    margin:20px 0;
  }
  .title-box {
    background: #ecf5ff;
    padding: 20px;
    margin-bottom: 10px;
  }
  .rbacseting{
    text-align: left;
  }
}
</style>
<script>
  const cityOptions = ['删除功能', '增加功能', '修改功能'];
  const pangOptions = ['增加导航', '修改图片', '修改LOGO'];
export default {
  data() {
    return {
      checkAll: false,
      checkedCities: [],
      cities: cityOptions,
      cityOptions:pangOptions,
      isIndeterminate: true,
      data: [{
        label: '权限',
        children: [{
          label: '账户管理',
          children: [{
            label: '用户组管理'
          },{
            label: '角色管理'
          },{
            label: '用户管理'
          },{
            label: '权限管理',
            children: [{
              label: '权限设置'
            }]
          }]
        }]
      }, {
        label: '会员',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '仓库',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
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
    },
    handleNodeClick(data) {
      console.log(data);
      const loading = this.$loading({
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.cities=[];
      this.pangOptions=[];
      setTimeout(() => {loading.close();
      this.cities=['删除功能', '增加功能', '修改功能','查看功能']
      this.pangOptions=['增加导航', '修改图片', '修改LOGO']
      },500)
    }
  },
  mounted() {
  }
};
</script>
