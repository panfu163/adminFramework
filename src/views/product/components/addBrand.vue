<template>
  <div class="content">
    <div class="title-box">
      <i class="el-icon-info"></i>
      <div class="title-content">
        <p>
          品牌是一种错综复杂的象征。它是品牌属性、名称、包装、价品牌管理品牌管理格、历史、信誉，广告方式的无形总称。
        </p>
      </div>
    </div>
    <h4>{{ this.$route.meta.title }}</h4>
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="品牌名称：">
        <el-input
            v-model="form.name"
            placeholder="请输入用品牌名称"
            minlength="2"
            maxlength="200"
            show-word-limit
            style="width:300px"
        ></el-input>
      </el-form-item>
      <el-form-item label="品牌网址：">
        <el-input
            v-model="form.name"
            placeholder="请输入用户组名称"
            minlength="2"
            maxlength="200"
            show-word-limit
            style="width:300px"
        ></el-input>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input
            v-model="form.name"
            placeholder="请输入用户组名称"
            minlength="2"
            maxlength="200"
            show-word-limit
            style="width:300px"
        ></el-input>
      </el-form-item>
      <el-form-item label="是否显示：">
        <el-radio-group v-model="form.resource">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="品牌描述：" prop="desc">
        <el-input
            v-model="form.desc"
            type="textarea"
            placeholder="请输入内容"
            minlength="2"
            maxlength="200"
            show-word-limit
            style="width:400px"
        ></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="start">
        <el-select v-model="form.start" placeholder="请选择状态">
          <el-option label="正常" value="shanghai"></el-option>
          <el-option label="停用" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="btn-box">
      <el-button size="small" @click="onReset('formName')">重置</el-button>
      <el-button size="small" type="primary" @click="onSubmit('formName')"
      >确定</el-button
      >
    </div>
  </div>
</template>
<style lang="scss" scoped>
.content {
  padding: 10px;
  background: #fff;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  h4 {
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
    margin-bottom: 20px;
    display: block;
    font-size: 18px;
  }
  h5 {
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
    margin-bottom: 20px;
    display: block;
  }
  h6 {
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
    padding: 20px 0;
    margin: 20px auto;
    display: block;
  }
  .btn {
    min-width: 200px;
    margin: 20px;
  }
  .title-box {
    background: #ecf5ff;
    padding: 20px;
    margin-bottom: 10px;
    display: flex;
    & > i {
      padding-top: 0.5em;
      @include color("color");
    }
    .title-content {
      padding-left: 10px;
      p {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
        font-size: 12px;
        line-height: 1.5 !important;
      }
    }
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
        desc: "",
        start: "正常"
      },
      value: [],
      option: [
        {
          value: "youhu",
          label: "主用户组",
          children: [
            {
              value: "shejiyuanze",
              label: "会员用户组"
            },
            {
              value: "zhidying",
              label: "自定义"
            }
          ]
        },
        {
          value: "zhinan",
          label: "财务组"
        }
      ]
    };
  },
  methods: {
    //确定
    onSubmit() {
      const loading = this.$loading({
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      setTimeout(() => {
        loading.close();
        this.$router.push({ path: "/power/userList" });
      }, 3000);
    },
    handleChange() {}
  },
  mounted() {}
};
</script>
