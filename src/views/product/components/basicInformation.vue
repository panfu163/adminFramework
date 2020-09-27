<template>
  <div class="product">
    <div>
      <el-row>
        <el-col :span="24">
          <div class="grid-title">
            基础信息
            <el-button
              class="primary"
              type="primary"
              @click="addProduct"
            >
              查询商品
            </el-button>
          </div>
        </el-col>
      </el-row>
      <div class="content-box">
        <el-row class="el-row-head">
          <el-col :span="12">
            <div class="info">
              <span>商品名称:</span>小红书2109版中国邮电大学出版
            </div>
            <div class="info">
              <span>库存数量:</span>900
            </div>
            <div class="info">
              <span>仓库名称:</span>电商仓库
            </div>
            <div class="info">
              <span>仓库管理:</span>张三 18285533808
            </div>
            <div class="info">
              <span>商品编码:</span>DSCK89083
            </div>
            <div class="info">
              <span>库存状态:</span>货源充足
            </div>
            <div class="info">
              <span>销售价:</span>89.00
            </div>
          </el-col>
          <el-col :span="12">
            <el-carousel
              trigger="click"
              height="150px"
            >
              <el-carousel-item
                v-for="item in 4"
                :key="item"
              >
                <h3 class="small">
                  {{ item }}
                </h3>
              </el-carousel-item>
            </el-carousel>
            <el-row class="el-row-medium">
              <el-upload
                action="#"
                list-type="picture-card"
                :auto-upload="false"
              >
                <i
                  slot="default"
                  class="el-icon-plus"
                />
                <div
                  slot="file"
                  slot-scope="{file}"
                >
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url"
                    alt=""
                  >
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                    >
                      <i class="el-icon-zoom-in" />
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleDownload(file)"
                    >
                      <i class="el-icon-download" />
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                    >
                      <i class="el-icon-delete" />
                    </span>
                  </span>
                </div>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img
                  width="100%"
                  :src="dialogImageUrl"
                  alt=""
                >
              </el-dialog>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div class="content-box">
        <el-form
          ref="form"
          :inline="true"
          :model="form"
          label-width="80px"
        >
          <div class="grid-title">
            产品信息
          </div>
          <el-form-item label="名称">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-row>
            <el-form-item label="销售价">
              <el-input v-model="form.name" />
              如有颜色、尺码等多种规格，请添加商品规格
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="市场价">
              <el-input v-model="form.name" />
              商品没有优惠的情况下，划线价在商品详情会以划线形式显示。
            </el-form-item>
          </el-row>
          <div class="grid-title">
            其他信息
          </div>
          <el-row>
            <el-form-item
              label="运费设置："
              label-width="120px"
            >
              <el-radio-group v-model="form.resource">
                <el-row class="el-row-datetime">
                  <el-radio label="统一邮费" />
                  <el-form-item>
                    <el-input
                      type="number"
                      placeholder="请添写价格"
                    />
                  </el-form-item>
                </el-row>
                <el-row class="el-row-datetime">
                  <el-radio label="邮费模板" />
                  <el-form-item>
                    <el-select
                      v-model="select"
                      placeholder="请选择运费模板"
                    >
                      <el-option
                        label="国外模板"
                        value="1"
                      />
                      <el-option
                        label="不含香港、西藏模板"
                        value="2"
                      />
                      <el-option
                        label="香港、西藏模板"
                        value="3"
                      />
                    </el-select>
                  </el-form-item>
                  <el-button icon="el-icon-edit" />
                </el-row>
              </el-radio-group>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="上架时间："
              label-width="120px"
            >
              <el-radio-group v-model="form.resource">
                <el-row class="el-row-datetime">
                  <el-radio label="立即上架售卖" />
                </el-row>
                <el-row class="el-row-datetime">
                  <el-radio label="自定义上架时间" />
                  <el-form-item prop="data1">
                    <el-date-picker
                      v-model="form.date1"
                      type="datetime"
                      placeholder="选择日期时间"
                    />
                  </el-form-item>
                </el-row>
                <el-row class="el-row-datetime">
                  <el-radio label="暂时售卖，放入仓库" />
                </el-row>
              </el-radio-group>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="下架时间："
              label-width="120px"
            >
              <el-radio-group v-model="form.resource">
                <el-row class="el-row-datetime">
                  <el-radio label="立即上架售卖" />
                </el-row>
                <el-row class="el-row-datetime">
                  <el-radio label="自定义上架时间" />
                  <el-form-item prop="data1">
                    <el-date-picker
                      v-model="form.date1"
                      type="datetime"
                      placeholder="选择日期时间"
                    />
                  </el-form-item>
                </el-row>
              </el-radio-group>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
    </div>

    <el-dialog
      title="添加商品"
      :visible.sync="dialogFormVisible"
      :append-to-body="appendToBody"
    >
      <goods />
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
</style>
<script>
  import  goods from "./goods";
    export default {
        components: {
          goods
        },
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
                    desc: "",
                },
                serverUrl: "", //上传的服务器地址
                dialogFormVisible:false,
                appendToBody:true,
                id:1,
                dialogImageUrl: '',
                dialogVisible: false,
                disabled: false,
                select: ''
            };
        },
        computed: {},
        mounted() {
            //this.Jsonp(); //测试跨域
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
        }
    };
</script>
