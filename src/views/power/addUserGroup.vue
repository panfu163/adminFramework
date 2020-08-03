<template>
  <div class="content">
    <h4>{{this.$route.meta.title}}</h4>
    <el-form ref="form" :inline="true" :model="form" label-width="100px">
      <el-form-item label="用户组名称">
        <el-input v-model="form.name"  placeholder="请选择用户组名称"></el-input>
      </el-form-item>
      <el-row>
        <el-form-item label="上级目录">
          <el-cascader
                  v-model="val"
                  :options="option"
                  @change="handleChange">
          </el-cascader>
        </el-form-item>
      </el-row>
    </el-form>

    <el-button class="btn" type="primary" @click="onSubmit">确定</el-button>
  </div>
</template>
<style lang="scss" scoped>
  .content{
    padding: 10px;
    background: #fff;
    box-sizing: border-box;
    width:100%;
    overflow:hidden;
    h4{
      border-bottom: 1px solid #eee;
      padding-bottom:20px;
      margin-bottom:20px;
      display:block;
      font-size:18px;
    }
    h5{
      border-bottom: 1px solid #eee;
      padding-bottom:20px;
      margin-bottom:20px;
      display:block;
    }
    h6{
      border-bottom: 1px solid #eee;
      border-top:1px solid #eee;
      padding:20px 0;
      margin:20px auto;
      display:block;
    }
    .btn{
      min-width:200px;
      margin:20px;
    }
  }
</style>
<script>
  export default {
    data() {
      return {
        form: {
          name: "",
          region: "",
          date1: "",
          date2: "",
          delivery: false,
          type: [],
          resource: "",
          desc: ""
        },
      };
    },
    methods: {
      //确定
      onSubmit() {
        console.log("submit!");
      },
  },
    mounted() {

    }
  };
</script>
