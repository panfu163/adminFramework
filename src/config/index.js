/****
 * @description 配置文件存放目录
 */
const config = {
  /**
   * @description 目标路径
   */
  publicPath: {
    dev: "/dev/admin/adminFramework",
    test: "/test/admin/adminFramework",
    prod: "/admin/adminFramework"
  },
  /**
   * @description api请求基础路径
   */
  apiUrl: {
    dev: "http://shop.pfuni.cn/dev/",
    test: "http://test.pfuni.cn:8763", // http://shop.pfuni.cn/test/
    prod: "http://shop.pfuni.cn/"
  },
  /**
   * @description 跳转地址
   */
  routerPath: {
    dev: "/dev/admin/",
    test: "/test/admin/", // http://shop.pfuni.cn/test/
    prod: "/admin/"
  },
};

module.exports = config;
