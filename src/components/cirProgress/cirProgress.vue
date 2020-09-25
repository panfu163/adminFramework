<!--*
  * CirProgress 进度圆环/条
  * ============================================================================
  * 版权所有 2020-2024 www.pfuni.cn，并保留所有权利。
  * 网站地址: http://www.pfuni.cn；
  * ----------------------------------------------------------------------------
  * 这不是一个自由软件！您只能在不用于商业目的的前提下对程序代码进行修改和
  * 使用；不允许对程序代码以任何形式任何目的的再发布。
  * 侵权必究，请遵守版权约定！
  * ============================================================================
  *version 1.0.0
  *author : PanFu panfu163@126.com
  *last update date : 2020-01-01 00:00
-->
<template>
	<div class="cirpraogress" :style="{width:width+'px', height:width+'px'}">
    <canvas :id="canvasId" :width="width" :height= "width"  class="canvas"></canvas>
     <slot></slot>
	</div>
</template>
<script>
export default {
	name: "CirProgress",
	props: {
		canvasId:{
			type:String,
			default:'myCanvas',
		},
    title:{
      type:String,
      default:'标题内容',
    },
    width : {
      type : Number,
      default : 150
    },
    progressColor:{
      type: String,
      default: "#00C777"
    },
    value : {
      type : Number,
      default : 0
    },
	},
	data() {
		return {
      bgColor:"#ECF4FB",
      fontSize:30,
      fontColor:"#000000",
      lineWidth:10,
      ctx : null,
      sets : {},
      oldVal : 0,
      canvas : {},
      speed:20
		}
	},
	created:function(){
	},
  mounted() {
    this.createCanvasContext();
  },
  watch:{
		value(val, val2){
			this.drawAnimate(val);
		}
	},
	methods: {
    //创建画布
    createCanvasContext(){
      var $this		 = this;
      var sets		 = {};
      sets.center		 = this.width / 2; // 圆心
      sets.lineWidth   = this.lineWidth; // 外层圆环宽
      sets.r = (this.width / 2) - (sets.lineWidth / 2); // 背景半径 = 外层
      sets.lineWidth2  = sets.lineWidth - 2; // 内层圆环宽
      this.sets        = sets;
      this.ctx =document.getElementById(this.canvasId);
      // 创建画布
      this.drawAnimate(this.value);
      console.log(this.value)
    },
    //动画
    drawAnimate(num){
      var $this = this;
      var step = 0;
      if ($this.oldVal > num) {
        for (var i = $this.oldVal; i >= num; i--) {
          (function(i){setTimeout(function(){$this.draw(i);}, step);})(i);
          step += $this.speed;
        }
      } else {
        for (var i = $this.oldVal; i <= num; i++) {
          (function(i){setTimeout(function(){$this.draw(i);}, step);})(i);
          step += $this.speed;
        }
      }
      $this.oldVal = num;
    },
    //画圆
    draw(num) {
      console.log(num)
      if (num < 0) { num = 0;}
      if(num > 100){num = 100;}
      //获取Canvas对象(画布)

      //简单地检测当前浏览器是否支持Canvas对象，以免在一些不支持html5的浏览器中提示语法错误
      if (this.ctx.getContext) {
        var ctx = this.ctx.getContext("2d");
        //背景圆
        ctx.beginPath();
        ctx.lineCap="round";
        ctx.arc(this.sets.center, this.sets.center, this.sets.r,0, Math.PI * 2, true);
        ctx.strokeStyle = this.bgColor;
        ctx.lineWidth = this.sets.lineWidth ;
        ctx.stroke();

        //进度圆
        // //开始一个新的绘制路径
        ctx.beginPath();
        num = (num / 100);
        ctx.lineCap="round";
        ctx.arc(this.sets.center, this.sets.center, this.sets.r, 0 * Math.PI, num * 2 * Math.PI, false);
        ctx.strokeStyle = this.progressColor; //颜色
        ctx.lineWidth = this.sets.lineWidth ;
        //按照指定的路径绘制弧线
        ctx.stroke();

        // 文字
        // ctx.beginPath();
        // ctx.font="40px Arial";
        // ctx.textBaseline="middle";
        // ctx.textAlign="center";
        // ctx.fillStyle = "#000"; //颜色
        // ctx.fillText(Math.round(num * 100) + "%",this.sets.center, this.sets.center);
        // ctx.stroke();
      }
    }
	}
}
</script>
<style lang="scss" scoped>
  .cirpraogress{
    display: block;
    margin:0 auto;
    position:relative;
    .canvas{
      text-align: center;
    }
  }
</style>
