<!---
 --@author  PanFu
 --@data 2019-08-17:11
 --@description adminFramework-tag
 --@version 1.0
--->
<template>
  <div class="tag-box" :class="{on:sfold}">
    <span class="el-icon-arrow-left" v-if="isRarr" @click="arrowLeft"></span>
    <div class="el-tag-box" ref="tagBox">
      <div class="tag-min" ref="tagMin">
        <el-tag
          v-for="(item, index) in dynamicTags"
          :key="index"
          closable
          :color="path === item.url ? '#ecf5ff' : ''"
          :disable-transitions="false"
          @close="handleClose(item)"
          @click="getoUrl(item)"
          >{{ item.title }}
        </el-tag>
      </div>
    </div>
    <span class="el-icon-arrow-right" v-if="isRarr" @click="arrowRight"></span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputVisible: false,
      inputValue: "",
      index: 1,
      spanWidth: 100, //小标签宽度
      recordPosition: "0", //记录位置
      isRarr: true,
      path: "",
      dynamicTags: [],
      sfold:false
    };
  },
  methods: {
    //删除
    handleClose(tag) {
      if (this.$route.path === tag.url) {
        this.$message("当前显示页不可删除");
        return;
      }
      //删除
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      localStorage.setItem("tagTitle", JSON.stringify(this.dynamicTags)); //设置头部信息
    },
    getoUrl(item) {
      //标签跳转
      this.$router.push({ path: item.url });
    },
    //点击右箭头
    arrowRight() {
      let width = this.$refs.tagMin.scrollWidth; //内容宽度
      let tagBox = this.$refs.tagBox.clientWidth; //屏幕宽度
      let len = (width - tagBox) / this.spanWidth; //可以移动多少个
      let index = this.index++; //当前移动个数
      if (len <= 0 || index > parseInt(len + 1)) {
        //限制
        return;
      }
      this.$refs.tagMin.style.transform = `translate(${-(
        this.spanWidth * index
      )}px,0)`; //滑动效果
      this.recordPosition = `${this.spanWidth * index}`;
    },
    //点击左箭头
    arrowLeft() {
      if (this.recordPosition <= this.spanWidth) {
        this.index = 1;
        this.recordPosition = 0;
      } else {
        this.recordPosition = this.recordPosition - this.spanWidth;
        this.index = this.index === 0 ? 0 : this.index - 1;
      }
      this.$refs.tagMin.style.transform = `translate(${-this
        .recordPosition}px,0)`; //滑动效果
    },
    //数组去重
    distinct(arr) {
      let result = [];
      let objs = {};
      for (let i = 0; i < arr.length; i++) {
        if (!objs[arr[i].title]) {
          result.push(arr[i]);
          objs[arr[i].title] = true;
        }
      }
      return result;
    }
  },
  mounted() {
    this.path = this.$route.path;
    let item = this.$route;
    let val = [{
        title: item.meta.title,
        url: item.path
      }];
    this.dynamicTags = val;
    this.bus.$on("sfold",res=>{this.sfold=res;});
  },
  computed: {},
  watch: {
    $route(to) {
      console.log("我是tag~~~")
      if (to.path) {
        let val = {
          title: to.meta.title,
          url: to.path
        };
        this.dynamicTags.push(val);
        this.dynamicTags = this.distinct(this.dynamicTags); //数据去重
        //监听地址变化
        this.path = to.path;
      } else {
        this.$message("跳转地址没有配置");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.tag-box {
  position: absolute;
  top: 55px;
  left: 279px;
  width: calc(100% - 280px);
  min-width: 600px;
  height: 35px;
  overflow: hidden;
  display: flex;
  transform:translate(0,0);
  transition:0.3s;
  &.on{
    width: calc(100% - 213px);
    left: 204px;
  }
  .el-icon-arrow-left {
    font-size: 20px;
    padding-top: 8px;
    margin-right: 10px;
    cursor: pointer;
  }
  .el-icon-arrow-right {
    font-size: 20px;
    padding-top: 8px;
    cursor: pointer;
  }
  .el-tag-box {
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    display: -webkit-box;
    flex-wrap: nowrap;
    position: relative;
    .tag-min {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      flex-wrap: nowrap;
      transition: all 0.3s ease;
      transform: translate(0, 0);
      .el-tag {
        color: #000;
        cursor: pointer;
      }
      .el-tag + .el-tag {
        margin-left: 10px;
        background: #fff;
        border-radius: 0;
        height: 35px;
        line-height: 35px;
        border: 0;
        padding: 0 20px;
        color: #000;
        display: block;
      }
      .el-tag--small {
        height: 35px;
        line-height: 35px;
        border: 0;
        padding: 0 20px;
        background: #fff;
      }
    }
  }
}
</style>
