<!---
 --@author  PanFu
 --@data 2019-08-30 16:19
 --@description activity.v1.0-List
 --@version 1.0
--->
<template>
  <div class="content">
    <h4>{{this.$route.meta.title}}</h4>
    <el-form ref="form"  :model="form" label-width="100px">
    <el-row>
        <div class="portrait">
          <el-form-item label="用户组名称：" prop="name">
            <el-input v-model="form.name"  placeholder="请输入用户组名称"></el-input>
          </el-form-item>
            <el-form-item label="备注：" prop="desc">
              <el-input v-model="form.desc"
                        type="textarea"
                        placeholder="请输入内容"
                        maxlength="200"
                        rows="8"
                        show-word-limit>
              </el-input>
            </el-form-item>
            <el-form-item label="状态" prop="start">
              <el-select v-model="form.start" placeholder="请选择状态">
                <el-option label="正常" value="shanghai"></el-option>
                <el-option label="停用" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="添加用户" prop="start">

              <el-select
                      v-model="value"
                      multiple
                      filterable
                      remote
                      reserve-keyword
                      placeholder="请输入关键词"
                      :remote-method="remoteMethod"
                      :loading="loading">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>

            </el-form-item>
        </div>
    </el-row>
      <h5>用户组</h5>
      <el-row class="user-group" prop="data">
        <el-tree
                ref="newTopRightsTree"
                :data="data"
                show-checkbox
                node-key="id"
                :default-expanded-keys="[]"
                :default-checked-keys="checkedKeys"
                :props="defaultProps">
        </el-tree>
    </el-row>
    <el-row>
      <h5>用户</h5>
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
      </el-checkbox-group>
    </el-row>
      <h5>权限设置</h5>
    <div style="margin-top: 20px">
      <el-button type="primary" @click="toggleSelection(tableData)">确定修改</el-button>
    </div>

    </el-form>
  </div>
</template>
<style lang="scss" scoped>
.content {
  padding: 10px;
  background: #fff;
  box-sizing: border-box;
  h4{
    border-bottom: 1px solid #eee;
    padding-bottom:20px;
    margin-bottom:20px;
    display:block;
    font-size:18px;
  }
  h5{
    position:relative;
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
    padding:20px 0;
    margin:20px auto;
    display:block;
  }
  .head-portrait {
    padding:20px;
    .el-avatar {
      width: 80px;
      height: 80px;
    }
  }
  .portrait {
    padding:0 20px;
    p {
      line-height: 30px;
      font-size: 14px;
    }
  }
  .shippingAddress {
    border: 1px solid #eee;
    padding: 20px;
    margin-right: 10px;
  }
  .user-group{
    width:100%;
    max-height:280px;
    overflow-y:auto;
  }
  .search{
    position: absolute;
    top:15px;
    left:80px;
  }
}
</style>
<script>
  const cityOptions = ['admin', 'panfu', 'admin1', 'admin2'];
export default {
  data() {
    return {
      form: {
        name: "系统用户组",
        region: "",
        desc: "市场部门、运营部门、销售权限用户组",
        start:"正常"
      },
      checkedCities: ['admin', 'panfu', 'admin1', 'admin2'],
      cities: cityOptions,
      activeName: "1",
      shippingAddress: [
        {
          name: "潘付",
          phone: "18285533808",
          address: "贵州省贵阳市南明区花溪大道北段126"
        },
        {
          name: "潘付",
          phone: "18285533808",
          address: "贵州省贵阳市南明区花溪大道北段126"
        }
      ],
      data: [{
        id: 1,
        label: '系统用户组',
        children:[{
          id:4,
          label:'管理员'
        }, {
          id:5,
          label:'网站运营'
        }, {
          id:6,
          label:'网站编辑'
        },{
          id:7,
          label:'仓库管理员'
        },{
          id:8,
          label:'客服'
        }]
      }, {
        id:2,
        label: '新闻部用户组',
        children: [{
          id: 9,
          label: '主编'
        }, {
          id: 10,
          label: '副主缟'
        }, {
          id:11,
          label: '新闻编辑员'
        }, {
          id:12,
          label: '新闻采集员'
        }]
      }, {
        id: 3,
        label: '财务组',
        children: [{
          id: 13,
          label: '财务总监'
        }, {
          id:14,
          label: '会计'
        }, {
          id:15,
          label: '出纳'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      checkedKeys:[5],
      options: [],
      value: [],
      list: [],
      loading: false,
      states: ["Alabama", "Alaska", "Arizona",
        "Arkansas", "California", "Colorado",
        "Connecticut", "Delaware", "Florida",
        "Georgia", "Hawaii", "Idaho", "Illinois",
        "Indiana", "Iowa", "Kansas", "Kentucky",
        "Louisiana", "Maine", "Maryland",
        "Massachusetts", "Michigan", "Minnesota",
        "Mississippi", "Missouri", "Montana",
        "Nebraska", "Nevada", "New Hampshire",
        "New Jersey", "New Mexico", "New York",
        "North Carolina", "North Dakota", "Ohio",
        "Oklahoma", "Oregon", "Pennsylvania",
        "Rhode Island", "South Carolina",
        "South Dakota", "Tennessee", "Texas",
        "Utah", "Vermont", "Virginia",
        "Washington", "West Virginia", "Wisconsin",
        "Wyoming"]
    };
  },
  mounted() {
    this.list = this.states.map(item => {
      return { value: `${item}`, label: `${item}` };
    });
  },
  methods:{
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
    handleCheckChange(){},
    handleCheckedCitiesChange(){}
  }
};
</script>
