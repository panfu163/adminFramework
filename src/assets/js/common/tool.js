import Ajax from "./ajax.js";
import md5 from "blueimp-md5";
import { Message } from 'element-ui';
let Tool = {};

/*
 * distinct 数组对像去重的方法
 * @param  {Arr}  Arr      数组
 * @return {result}  Arr      请求数据结果 数组
 */
Tool.distinct = arr => {
  let result = [];
  let objs = {};
  for (let i = 0; i < arr.length; i++) {
    if (!objs[arr[i].id]) {
      result.push(arr[i]);
      objs[arr[i].id] = true;
    }
  }
  return result;
};

//微信签名设置
Tool.weiXin = () => {
  let url = encodeURIComponent(window.location.href);
  Ajax.ajax(
    "/integration/app/public/sign",
    { url: url, appId: "wx821f43725ab728ca" },
    res => {
      let _param = {
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.data.appId,
        timestamp: res.data.timestamp,
        nonceStr: res.data.noncestr,
        signature: res.data.signature,
        jsApiList: [
          "chooseImage",
          "translateVoice",
          "uploadImage",
          "downloadImage",
          "previewImage",
          "openLocation",
          "getLocation",
          "scanQRCode",
          "checkJsApi",
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "onMenuShareQQ",
          "onMenuShareWeibo",
          "onMenuShareQZone"
        ]
      };
      //alert(JSON.stringify(_param))
      wx.config(_param);
      wx.error(function(res) {
        console.log(res);
        //alert("出错了：" + res.errMsg);//这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
      });
    },
    e => {
      console.log(e);
    }
  );
};

// Sinng计算
Tool.sinngTxt = (parms, needToken = true) => {
  // console.log('sign计算参数：' + JSON.stringify(parms))
  if (parms) {
    let arr = [];
    for (let key in parms) {
      if (parms[key] === undefined) continue;
      arr.push(key);
    }
    arr.sort();
    let str = "";
    for (let i in arr) {
      if (parms[arr[i]] != null) {
        if (typeof parms[arr[i]] === "object") {
          let r = JSON.stringify(parms[arr[i]])
            .split("")
            .sort()
            .join("");
          str += arr[i] + "=" + r + "&";
        } else {
          str += arr[i] + "=" + parms[arr[i]] + "&";
        }
      } else {
        str += arr[i] + "=&";
      }
    }
    str =
      str.substr(0, str.length - 1) +
      "&key=" +
      "dd90ea5aed334214832ed46e18367f1f"; // + '&token='
    if (needToken) str += "&token=" + Tool.getAccessToken();
    console.log("待签名数据：" + str);
    // console.log('待签名数据：' + encodeURIComponent(str))
    let resultMd5 = md5(str);
    console.log("签名后：" + resultMd5);
    return resultMd5;
  } else {
    return "";
  }
};

//js 把对象按照属性名的字母顺序进行排列
Tool.objKeySort = obj => {
  var newkey = Object.keys(obj).sort();
  //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
  var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
  for (var i = 0; i < newkey.length; i++) {
    //遍历newkey数组
    newObj[newkey[i]] = obj[newkey[i]]; //向新创建的对象中按照排好的顺序依次增加键值对
  }
  return newObj; //返回排好序的新对象
};

//按名称排序,由“参数”+“值”合并为字符串
Tool.objKeyValue = objs => {
  var str = ""; //定义一个空字符用来接收对象里的key或者value
  for (var item in objs) {
    //遍历item变量里的对象的属性和元素，
    str += item + "&"; //将obj对象的属性遍历出来，并且追加到str字符中。
    str += objs[item] + "&"; //将obj对象的值遍历出来，并且追加到str字符中。
  }
  //第一种方法、将字符串中最后一个元素","逗号去掉，
  str = str.substring(0, str.lastIndexOf("&"));
  //第二种方法、将字符串中最后一个元素","逗号去掉，
  //str = (str.substring(str.length - 1) == ',') ? str.substring(0, str.length - 1) : str;
  //第三种方法、将字符串中最后一个元素","逗号去掉，
  //var str=str.substring(0,str.length-1);//3、将字符串中最后一个元素","逗号去掉，
  //第四种方法、将字符串中最后一个元素","逗号去掉，
  // var reg=/,$/gi;
  // str=str.replace(reg,"");
  //console.log(str)
  console.log(str);
  return str;
};

//JS禁用微信复制链接、禁用转发
Tool.jWeixinOnBridgeReady = () => {
  function onBridgeReady() {
    WeixinJSBridge.call("hideOptionMenu");
  }
  if (typeof WeixinJSBridge === "undefined") {
    if (document.addEventListener) {
      document.addEventListener("WeixinJSBridgeReady", onBridgeReady, false);
    } else if (document.attachEvent) {
      document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
      document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
    }
  } else {
    onBridgeReady();
  }
};

//或取AccessToken
Tool.getAccessToken = () => {
  localStorage.getItem("token");
};

/**
 * 下载方法
 * @param response
 */
Tool.downloadFile = (response) => {
  const res = response.data;
  const type = res.type;
  if (type.includes("application/json")) {
    const reader = new FileReader();
    reader.onload = e => {
      if (e.target.readyState === 2) {
        const data = JSON.parse(e.target.result);
        Message({
          message: data.msg,
          type: "warning"
        });
      }
    };
    reader.readAsText(res);
  } else {
    const disposition = response.headers["content-disposition"];
    let fileName = "下载文件.zip";
    if (disposition) {
      const respcds = disposition.split(";");
      for (let i = 0; i < respcds.length; i++) {
        const header = respcds[i];
        if (header !== null && header !== "") {
          const headerValue = header.split("=");
          if (headerValue !== null && headerValue.length > 0) {
            if (headerValue[0].trim().toLowerCase() === "filename") {
              fileName = decodeURI(headerValue[1]);
              break;
            }
          }
        }
      }
    }
    // 处理引号
    if (
        (fileName.startsWith("'") || fileName.startsWith('"')) &&
        (fileName.endsWith("'") || fileName.endsWith('"'))
    ) {
      fileName = fileName.substring(1, fileName.length - 1);
    }
    const blob = new Blob([res]);
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(link.href);
  }
};

export default Tool;
