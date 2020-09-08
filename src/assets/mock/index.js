import Mock from "mockjs";

//格式：Mock.mock( url, post/get , 返回的数据)；
//接口地址配置
/**
 * 用户信息
 * **/
Mock.mock("/user", "post", require("./json/user.json")); // 返回模拟数据
