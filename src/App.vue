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
</style>
