<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
body {
  background: #eee;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
}
/**滚动条设置**/
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 5px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  width: 5px;
  height: 8px;
  background-color: #aaa; /* or add it to the track */
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 0px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: #eee;
}
// 处理input type = number的上下箭头
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
//分页
.pagination {
  text-align: right;
  margin-top: 20px;
}
//按钮
.btn-box {
  background: #fff;
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  border-top: 1px solid #eee;
  z-index: 999;
  margin-top: 20px;
  display: block;
}
.drawer{
  position: relative;
  .btn-box {
    position:absolute;
    right:0;
    bottom:0;
    width:100%;
    background: #fff;
    box-sizing: border-box;
    padding: 10px;
    border-top: 1px solid #eee;
    z-index:999;
    display: block;
  }
}
//头部按钮
.title-but {
  position: absolute;
  top: 0;
  right: 0;
}
*:focus {
  outline: 0;
}
</style>
