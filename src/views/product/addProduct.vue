<template>
  <div class="product">
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="1.编辑基本信息" name="first">
          <el-row>
            <el-col :span="24">
              <div class="grid-title">
                基础信息
                <el-button class="primary" type="primary" @click="addProduct">查询商品</el-button>
              </div>
            </el-col>
          </el-row>
          <div class="content-box">
            <el-row class="el-row-head">
              <el-col :span="12">
                <div class="info">
                  <span>商品名称:</span>小红书2109版中国邮电大学出版
                </div>
                <div class="info"><span>库存数量:</span>900</div>
                <div class="info"><span>仓库名称:</span>电商仓库</div>
                <div class="info"><span>仓库管理:</span>张三 18285533808</div>
                <div class="info"><span>商品编码:</span>DSCK89083</div>
                <div class="info"><span>库存状态:</span>货源充足</div>
                <div class="info"><span>销售价:</span>89.00</div>
              </el-col>
              <el-col :span="12">
                <el-carousel trigger="click" height="150px">
                  <el-carousel-item v-for="item in 4" :key="item">
                    <h3 class="small">{{ item }}</h3>
                  </el-carousel-item>
                </el-carousel>
                <el-row class="el-row-medium">
                  <el-upload
                          action="#"
                          list-type="picture-card"
                          :auto-upload="false">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                      <img
                              class="el-upload-list__item-thumbnail"
                              :src="file.url" alt=""
                      >
                      <span class="el-upload-list__item-actions">
        <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
        >
          <i class="el-icon-download"></i>
        </span>
        <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
                    </div>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                </el-row>
              </el-col>
            </el-row>
          </div>
          <div class="content-box">
            <el-form ref="form" :inline="true" :model="form" label-width="80px">
              <div class="grid-title">产品信息</div>
              <el-form-item label="名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-row>
                <el-form-item label="销售价">
                  <el-input v-model="form.name"></el-input>
                  如有颜色、尺码等多种规格，请添加商品规格
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="市场价">
                  <el-input v-model="form.name"></el-input>
                  商品没有优惠的情况下，划线价在商品详情会以划线形式显示。
                </el-form-item>
              </el-row>
              <div class="grid-title">其他信息</div>
              <el-row>
                <el-form-item label="运费设置：" label-width="120px">
                  <el-radio-group v-model="form.resource">
                    <el-row class="el-row-datetime">
                      <el-radio label="统一邮费" ></el-radio>
                      <el-form-item>
                        <el-input type="number" placeholder="请添写价格"></el-input>
                      </el-form-item>

                    </el-row>
                    <el-row class="el-row-datetime"><el-radio label="邮费模板"></el-radio>
                      <el-form-item>
                        <el-select v-model="select"  placeholder="请选择运费模板">
                          <el-option label="国外模板" value="1"></el-option>
                          <el-option label="不含香港、西藏模板" value="2"></el-option>
                          <el-option label="香港、西藏模板" value="3"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-button  icon="el-icon-edit"></el-button>
                    </el-row>
                  </el-radio-group>
                </el-form-item>
              </el-row>
              <el-row>
              <el-form-item label="上架时间：" label-width="120px">
                <el-radio-group v-model="form.resource">
                  <el-row class="el-row-datetime"><el-radio label="立即上架售卖"></el-radio></el-row>
                  <el-row class="el-row-datetime"><el-radio label="自定义上架时间"></el-radio>
                    <el-form-item prop="data1">
                      <el-date-picker
                              v-model="form.date1"
                              type="datetime"
                              placeholder="选择日期时间">
                      </el-date-picker>
                    </el-form-item>
                  </el-row>
                  <el-row class="el-row-datetime"><el-radio label="暂时售卖，放入仓库"></el-radio></el-row>
                </el-radio-group>
              </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="下架时间：" label-width="120px">
                  <el-radio-group v-model="form.resource">
                    <el-row class="el-row-datetime"><el-radio label="立即上架售卖"></el-radio></el-row>
                    <el-row class="el-row-datetime"><el-radio label="自定义上架时间"></el-radio>
                      <el-form-item prop="data1">
                        <el-date-picker
                                v-model="form.date1"
                                type="datetime"
                                placeholder="选择日期时间">
                        </el-date-picker>
                      </el-form-item>
                    </el-row>
                  </el-radio-group>
                </el-form-item>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="2.编辑商品详情" name="second">
          <quill-editor
            ref="myTextEditor"
            v-model="content"
            :options="editorOption"
            @change="onEditorChange"
            style="height:400px; margin-bottom:30px;"
          ></quill-editor>
          <el-button style="margin:20px" type="primary" @click="submit"
            >提交</el-button
          >
          <el-upload
            class="avatar-uploader"
            action="serverUrl"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :before-upload="beforeUpload"
            multiple
          >
          </el-upload>
          <div v-html="content"></div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog title="添加商品"
               :visible.sync="dialogFormVisible"
               :append-to-body="appendToBody"
    >
      <el-row>
        <el-form ref="form" :inline="true" :model="form">
          <el-form-item label="商品名称:">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              height="400"
              style="width: 100%"
              stripe
              highlight-current-row
              @selection-change="handleSelectionChange"
              :header-cell-style="{background:'#eef1f6',color:'#18333f'}"
      >
        <el-table-column type="index" label="#" :index="indexMethod"> </el-table-column>
        <el-table-column prop="" label="单选" width="60">
          <template  slot-scope="scope">
            <el-radio v-model="id" :label="scope.row.id">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column label="" width="60">
          <template slot-scope="scope">
            <img
                    :src="scope.row.head_pic"
                    width="40"
                    height="40"
                    style="vertical-align: middle"
            />
          </template>
        </el-table-column>
        <el-table-column label="商品名称" width="250">
          <template slot-scope="scope">
            {{ scope.row.date }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="供应商名称" width="120">
        </el-table-column>
        <el-table-column prop="address" label="公司地址" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="phone" label="联系电话" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="userName" label="联系人" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="eml" label="联系邮箱" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="产地" show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <el-pagination
              class="pagination"
              background
              layout="prev, pager, next"
              :total="1000"
      >
      </el-pagination>
      <el-row class="el-row-box">
        <el-button type="success" @click="onSubmit">确定</el-button>
      </el-row>
    </el-dialog>

  </div>
</template>
<style lang="scss" scoped>
.product {
  padding: 10px;
  background: #fff;
  box-sizing: border-box;
  .grid-title {
    width: 100%;
    background: #ecf5ff;
    padding: 0 20px;
    box-sizing: border-box;
    vertical-align: middle;
    position: relative;
    height: 50px;
    line-height: 50px;
    margin-bottom:20px;
    .primary {
      position: absolute;
      top: 0px;
      right: 20px;
      display: block;
      margin-top: 10px;
    }
  }
  .el-row-head{
    padding:20px;
  }
  .content-box {
    padding:0;
    .info {
      margin-bottom: 10px;
      span {
        padding-right: 10px;
        font-weight: 700;
      }
    }
    .el-row-datetime{
      line-height:40px;
    }
    .el-row-medium {
      padding: 20px 20px 0;
      text-align: center;
    }
    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 150px;
      margin: 0;
    }
    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }
    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
    }
  }
}
.el-row-box{
  text-align: right;
  padding: 20px 0;
}
</style>
<script>
import { quillEditor } from "vue-quill-editor";
export default {
  data() {
    // 工具栏配置
    const toolbarOptions = [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"] // remove formatting button
    ];
    return {
      content: "",
      activeName: "first",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      serverUrl: "", //上传的服务器地址
      editorOption: {
        placeholder: "编辑文章内容",
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function(value) {
                if (value) {
                  //alert('自定义图片');
                  document.querySelector(".avatar-uploader input").click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      },
      dialogFormVisible:false,
      appendToBody:true,
      id:1,
      tableData: [
        {
          id:1,
          date: "华为手机X100",
          name: "华为科技有限公司",
          address: "广东省深圳市福田区华强北188号",
          phone:"18285533797",
          eml:"1602858720@qq.com",
          userName:"潘先生",
          head_pic:
                  "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          id:2,
          date: "华为手机X100",
          name: "华为科技有限公司",
          address: "广东省深圳市福田区华强北188号",
          phone:"18285533797",
          eml:"1602858720@qq.com",
          userName:"潘先生",
          head_pic:
                  "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          id:3,
          date: "华为手机X100",
          name: "华为科技有限公司",
          address: "广东省深圳市福田区华强北188号",
          phone:"18285533797",
          eml:"1602858720@qq.com",
          userName:"潘先生",
          head_pic:
                  "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          id:4,
          date: "华为手机X100",
          name: "华为科技有限公司",
          address: "广东省深圳市福田区华强北188号",
          phone:"18285533797",
          eml:"1602858720@qq.com",
          userName:"潘先生",
          head_pic:
                  "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          id:5,
          date: "华为手机X100",
          name: "华为科技有限公司",
          address: "广东省深圳市福田区华强北188号",
          phone:"18285533797",
          eml:"1602858720@qq.com",
          userName:"潘先生",
          head_pic:
                  "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          id:6,
          date: "华为手机X100",
          name: "华为科技有限公司",
          address: "广东省深圳市福田区华强北188号",
          phone:"18285533797",
          eml:"1602858720@qq.com",
          userName:"潘先生",
          head_pic:
                  "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          id:7,
          date: "华为手机X100",
          name: "华为科技有限公司",
          address: "广东省深圳市福田区华强北188号",
          phone:"18285533797",
          eml:"1602858720@qq.com",
          userName:"潘先生",
          head_pic:
                  "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        }
      ],
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      select: ''
    };
  },
  methods: {
    onSubmit(){},
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSelectionChange(){},
    indexMethod(index) {
      //自定义索引
      return index * 1;
    },
    onEditorChange({ editor, html, text }) {
      this.content = html;
    },
    submit() {
      console.log("--------------");
      console.log(this.content);
    },
    beforeUpload() {
      // 显示loading动画
      this.quillUpdateImg = true;
    },
    uploadSuccess(res, file) {
      console.log(file);
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill;
      console.log(quill);
      // 如果上传成功
      if (res.state === "SUCCESS" && res.url !== null) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片  res.info为服务器返回的图片地址
        quill.insertEmbed(length, "image", res.url);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        this.$message.error("图片插入失败");
      }
      // loading动画消失
      this.quillUpdateImg = false;
    },
    uploadError() {
      // loading动画消失
      this.quillUpdateImg = false;
      this.$message.error("图片插入失败");
    },
    addProduct(){
      this.dialogFormVisible=true;
    },
    //焦点图
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    }
  },
  mounted() {
    //this.Jsonp(); //测试跨域
  },
  computed: {},
  components: {
    quillEditor
  }
};
</script>
