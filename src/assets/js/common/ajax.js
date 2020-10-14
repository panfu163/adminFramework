import instance from "./instance";
import $config from "@/config";
import { console } from "vuedraggable/src/util/helper";
import { Message } from "element-ui";

/*
 * ajax方法实现请求后台数据
 * @param  {Array}  path      链接地址
 * @param  {String} params    参数
 * @param  {String} success   成功
 * @param  {String} fail      失败
 * @return {Array}            请求数据结果
 */
export default function(path, params, success, fail,method) {
    //请求接口地址处理
    let baseUrl = "";
    switch (process.env.VUE_APP_CURENV) {
        case "dev":
            baseUrl = $config.apiUrl.dev;
            break;
        case "test":
            baseUrl = $config.apiUrl.test;
            break;
        case "prod":
            baseUrl = $config.apiUrl.prod;
            break;
    }
    const parameters={
        url:baseUrl + path+`?ts=${Date.now()}`,
        data:params || {},
        method:method || "POST",
        responseType: params.responseType || '',
    };
    /**
     * params是添加到url的请求字符串中的，用于get请求。
     * 而data是添加到请求体（body）中的， 用于post请求。
     */
    const dataRequest = ['PUT', 'POST', 'PATCH'];
    if (dataRequest.includes(method)) {
        parameters.data = params || {};
    } else {
        parameters.params = params || {};
    }

    // formData转换
    if (params.formData) {
        parameters.transformRequest = [data => {
            const formData = new FormData();
            if (data) {
                Object.entries(data).forEach(item => {
                    formData.append(item[0], item[1]);
                });
            }
            return formData;
        }];
    }
    instance(parameters).then(response => {
        if (response.status === 200) {
            //只做成功处理--失败的请查看instance.js
            let data = response.data;
            if (data.code === 200) {
                if (typeof success === "function") {
                    return success(data);
                }
            } else {
                if (fail && typeof fail === "function") {
                    return fail(data);
                }else{
                    Message(data.message);
                }
            }
        }
    }).catch(err => {
        //使用catch方法和then的第二个参数的效果一样，但是它还有你另外一个作用,那就是在then的第一个resolve回调函数中代码出错，不用卡死js的执行，而是会进入到catch中，捕获err原因。
        console.log("err", err);
    });
}
