/***
 * 上传图片压缩
 * @type {{init: uploadImg.init, size: string, fileSize: (function(*): (boolean|undefined)), compress: (function(*=): string), width: number, dataURLtoFile: (function(*, *=): File), AutoSize: uploadImg.AutoSize, type: (function(*): (boolean|undefined)), accept: [string, string, string, string], height: number}}
 */
const uploadImg = {
  size:"3145728",//3M
  accept: ["image/gif", "image/jpeg", "image/png", "image/bmp"],
  width:1024,
  height:768,
  //图片类型
  type:(file)=>{
    if (uploadImg.accept.indexOf(file.type)===-1) { //文件类型
      alert("请选择我的支持的图片格式gif,jpeg,png,bmp");
      return false;
    };
  },
  //文件大小
  fileSize:(file)=>{
    if (file.size>uploadImg.size){
      alert("请选择3M以内的图片");
      return false;
    }
  },
  //将base64转换为文件
  dataURLtoFile:(dataurl,filename)=>{
    let arr = dataurl.split(","), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
          u8arr[n] = bstr.charCodeAt(n);
        }
    return new File([u8arr], filename, {type:mime});
  },
  //图片压缩
  compress:(img)=>{
    // 用于压缩图片的canvas
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    // 瓦片canvas
    var tCanvas = document.createElement("canvas");
    var tctx = tCanvas.getContext("2d");
    let initSize = img.src.length;
    //设置高度
    let wid = uploadImg.width;
    let hei = uploadImg.height;
    //console.log("父亲:"+wid+'...'+hei)
    //console.log("原始图片:"+img.width+'...'+img.height)
    // 等比压缩图片
    uploadImg.AutoSize(img, wid, hei);
    var width = uploadImg.width;
    var height = uploadImg.height;
    //console.log("变小图片:"+width+'...'+height)
    // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
    var ratio;
    if ((ratio = width * height / 4000000) > 1) {
      ratio = Math.sqrt(ratio);
      width /= ratio;
      height /= ratio;
    } else {
      ratio = 1;
    }
    canvas.width = width;
    canvas.height = height;
    // 铺底色
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // 如果图片像素大于100万则使用瓦片绘制
    var count;
    if ((count = width * height / 1000000) > 1) {
      count = ~~(Math.sqrt(count) + 1); // 计算要分成多少块瓦片
      // 计算每块瓦片的宽和高
      var nw = ~~(width / count);
      var nh = ~~(height / count);
      tCanvas.width = nw;
      tCanvas.height = nh;
      for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
          tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
          ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
        }
      }
    } else {
      ctx.drawImage(img, 0, 0, width, height);
    }
    // 进行最小压缩0.1
    var ndata = canvas.toDataURL("image/jpeg", 0.5);
    console.log("压缩前：" + initSize);
    console.log("压缩后：" + ndata.length);
    return ndata;
  },
  // 等比压缩图片
  AutoSize:(image, maxWidth, maxHeight)=>{
    // 当图片比图片框小时不做任何改变
    if (image.width < maxWidth && image.height < maxHeight) {
      //原图片宽高比例 大于 图片框宽高比例
      uploadImg.width = image.width;
      uploadImg.height = image.height;
    } else {
      //原图片宽高比例 大于 图片框宽高比例,则以框的宽为标准缩放，反之以框的高为标准缩放
      if (maxWidth / maxHeight <= image.width / image.height) {
        uploadImg.width = maxWidth; //以框的宽度为标准
        uploadImg.height = maxWidth * (image.height / image.width);
      } else {
        uploadImg.width = maxHeight * (image.width / image.height);
        uploadImg.height = maxHeight; //以框的高度为标准
      }
    }
  },
  init:(file,res)=>{
    uploadImg.type(file);
    uploadImg.fileSize(file);
    let reader = new FileReader();
    let ImgFile;
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      var img = new Image();
      img.src = e.target.result;
      img.onload = function(){
        if(file.size>(uploadImg.width*uploadImg.height)){//图太大压缩一下
          let fileImge=uploadImg.compress(img);
              ImgFile=uploadImg.dataURLtoFile(fileImge,file.name); //返回压缩的图片流
        }else{
              ImgFile=file;
        }
        return res(ImgFile);
      };
    };
  }
};

export default uploadImg;
