<template>
  <div>
    <el-input
      v-model="filterText"
      prefix-icon="el-icon-search"
      placeholder="输入查看的部门"
    />
    <div class="org">
      <el-tree
        ref="tree"
        :data="data"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
      />
    </div>
    <div class="button-box">
      <el-button
        type="success"
        round
        class="button"
        @click="addUser"
      >
        添加组织部门
      </el-button>
    </div>

    <!--审核弹窗-->
    <el-dialog
      title="添加组织部门"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      :append-to-body="true"
      class="dialog"
    >
      <addOrg @handleClose="handleClose" />
    </el-dialog>
  </div>
</template>

<script>
import addOrg from "./addOrg";
export default {
name: "Org",
components:{addOrg},  
data(){
  return{
    dialogVisible:false,
    filterText: '',
    data: [{
      label: '公司总部',
      children: [{
        label: '二级 1-1',
        children: [{
          label: '三级 1-1-1'
        }]
      }]
    },{
      label: '广州分公司',
      children: [{
        label: '二级 1-1',
        children: [{
          label: '三级 1-1-1'
        }]
      }]
    },{
      label: '上海分公司',
      children: [{
        label: '二级 1-1',
        children: [{
          label: '三级 1-1-1'
        }]
      }]
    },{
      label: '北京分公司',
      children: [{
        label: '二级 1-1',
        children: [{
          label: '三级 1-1-1'
        }]
      }]
    },{
      label: '贵阳分公司',
      children: [{
        label: '二级 1-1',
        children: [{
          label: '三级 1-1-1'
        }]
      }]
    },{
      label: '深圳分公司',
      children: [{
        label: '二级 1-1',
        children: [{
          label: '三级 1-1-1'
        }]
      }]
    },{
      label: '重庆分公司',
      children: [{
        label: '二级 1-1',
        children: [{
          label: '三级 1-1-1'
        }]
      }]
    },{
      label: '安徽分公司',
      children: [{
        label: '二级 1-1',
        children: [{
          label: '三级 1-1-1'
        }]
      }]
    },{
      label: '浙江分公司',
      children: [{
        label: '二级 1-1',
        children: [{
          label: '三级 1-1-1'
        }]
      }]
    }, {
      label: '四川分公司',
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
      label: '一级 3',
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
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
methods:{
    //添加用户
    addUser(){
      this.dialogVisible=true;
    },
    //选择树形
    handleNodeClick(){},
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleClose(){
      this.dialogVisible=false;
    }
  }
};
</script>

<style lang="scss" scoped>
.org{
  background:#FAFAFA;
  padding:0;
  height:480px;
  width:100%;
  overflow-y:auto;
  position:relative;
}
.button-box{
  width:100%;
  border-top:1px solid #eee;
}
.button{
  display: block;
  margin:20px auto;
}
</style>