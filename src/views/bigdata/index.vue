<template>
  <div class="search">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="data-list">
          <i class="el-icon-data-analysis"></i>
          <numAnimate :num="num"></numAnimate>
          <h5>总订单数</h5>
        </div>
      </el-col>
      <el-col :span="6"
        ><div class="data-list">
          <i class="el-icon-data-line"></i>
          <numAnimate :num="num"></numAnimate>
          <h5>总会员数</h5>
        </div></el-col
      >
      <el-col :span="6"
        ><div class="data-list">
          <i class="el-icon-pie-chart"></i>
          <numAnimate :num="num"></numAnimate>
          <h5>支付金额</h5>
        </div></el-col
      >
      <el-col :span="6">
        <div class="data-list">
          <i class="el-icon-files"></i>
          <numAnimate :num="num"></numAnimate>
          <h5>在线用户</h5>
        </div></el-col
      >
    </el-row>

    <el-row>
      <el-col :span="8"><v-chart :options="pies"/></el-col>
      <el-col :span="16"><v-chart :options="year"/></el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <v-chart :options="polar" />
      </el-col>
      <el-col :span="8"> <v-chart :options="polar"/></el-col>
      <el-col :span="8">
        <v-chart :options="polar" />
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8">
        <v-chart :options="polars" />
      </el-col>
      <el-col :span="8"> <v-chart :options="polars"/></el-col>
      <el-col :span="8">
        <v-chart :options="polars" />
      </el-col>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
.search {
  padding: 10px;
  background: #fff;
  box-sizing: border-box;
  .title-box {
    background: #ecf5ff;
    padding: 20px;
    margin-bottom: 10px;
  }
  .pagination {
    text-align: right;
    margin-top: 20px;
  }
}
.echarts {
  width: 100%;
  height: 400px;
}
.data-list {
  width: 90%;
  margin: 20px auto;
  border: 1px solid #eee;
  text-align: center;
  padding: 20px;
  position: relative;
  border-radius: 4px;
  span {
    font-size: 40px;
    color: $red-primary;
  }
  i {
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translate(0, -50%);
    color: $red-danger;
    font-size: 40px;
  }
  h5 {
    color: #333;
  }
}
</style>
<script>
import numAnimate from "../../components/numAnimate/numAnimate";
import ECharts from "vue-echarts";
// 引入柱状图
require("echarts/lib/chart/bar"); //引入饼状图
require("echarts/lib/chart/line"); //线性柱状图
require("echarts/lib/chart/pie"); //线性柱状图
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

export default {
  components: {
    "v-chart": ECharts,
    numAnimate
  },
  data() {
    return {
      num: 9029323,
      polar: {
        title: {
          text: "订单数据"
        },
        tooltip: {},
        xAxis: {
          data: ["一月", "二月", "三月", "五月", "六月", "七月"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "line",
            data: [10, 15, 48, 40, 30, 45]
          }
        ]
      },
      polars: {
        title: {
          text: "注册数据"
        },
        tooltip: {},
        xAxis: {
          data: ["一月", "二月", "三月", "五月", "六月", "七月"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            barWidth: 30, //柱图宽度
            data: [10, 15, 48, 40, 30, 45],
            itemStyle: {
              normal: {
                //修改柱状颜色
                color: function(params) {
                  //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                  var colorList = [
                    "#c23531",
                    "#2f4554",
                    "#61a0a8",
                    "#d48265",
                    "#91c7ae",
                    "#749f83",
                    "#ca8622"
                  ];
                  return colorList[params.dataIndex];
                }
              }
            }
          }
        ]
      },
      pies: {
        title: {
          text: "推广数据"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap:false,
            emphasis: { //鼠标经过
              label: {
                show:false,
                fontSize: "30",
                fontWeight: "bold"
              }
            },
            label: {
              normal: {
                show:false, //显示中间文字
                position:'center',
                formatter:function (data) {
                  if(data.name === "直接访问") {
                    return `${data.value}\n推广来源`;
                   }
                },
                textStyle:{
                  fontSize:30,
                  color:'#000'
                }
              },
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: "直接访问",label:{show:true}},
              { value: 232, name: "百度推广" },
              { value: 32, name: "广告投放" },
              { value: 192, name: "自媒体" },
            ]
          }
        ]
      },
      year: {
        title: {
          text: "年份数据"
        },
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ["产品", "2012", "2013", "2014", "2015"],
            ["会员", 41.1, 30.4, 65.1, 53.3],
            ["订单", 86.5, 92.1, 85.7, 83.1],
            ["注册", 24.1, 67.2, 79.5, 86.4]
          ]
        },
        xAxis: [
          { type: "category", gridIndex: 0 },
          { type: "category", gridIndex: 1 }
        ],
        yAxis: [{ gridIndex: 0 }, { gridIndex: 1 }],
        grid: [{ bottom: "55%" }, { top: "55%" }],
        series: [
          // These series are in the first grid.
          { type: "bar", seriesLayoutBy: "row" },
          { type: "bar", seriesLayoutBy: "row" },
          { type: "bar", seriesLayoutBy: "row" },
          // These series are in the second grid.
          { type: "bar", xAxisIndex: 1, yAxisIndex: 1 },
          { type: "bar", xAxisIndex: 1, yAxisIndex: 1 },
          { type: "bar", xAxisIndex: 1, yAxisIndex: 1 },
          { type: "bar", xAxisIndex: 1, yAxisIndex: 1 }
        ]
      }
    };
  },
  methods: {},
  mounted() {}
};
</script>
