/****
 * 配置文件存放目录
 */
const config= {
  publicPath:{
    dev: "/dev/adminFramework/",
    test: "/test/adminFramework/",
    prod: "/adminFramework/"
  },
  /**
   * @description api请求基础路径
   */
  apiUrl: {
    dev: "http://shop.pfuni.cn/dev/",
    test: "http://shop.pfuni.cn/test/",
    prod: "http://shop.pfuni.cn/"
  }
};

module.exports = config;