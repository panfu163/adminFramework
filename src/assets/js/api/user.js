import Ajax from "assets/js/common/ajax";
//用户信息
export default {
    //登录
    login(params,success,fail){
        Ajax(`/dolphin-auth/management/oauth/login`,params,success,fail,"POST");
    },
    //退出登录
    logout(params,success,fail){
        Ajax(`/dolphin-auth/management/oauth/logout`,params,success,fail,"GET");
    },
    //修改密码
    updatePassword(params,success,fail){
        Ajax(`/dolphin-auth/management/oauth/update/password`,params,success,fail,"POST");
    },
    //获取当前登录用户信息
    query(params,success,fail){
        Ajax(`/dolphin-auth/management/oauth/current/user`,params,success,fail,"POST");
    },
    //下载
    download(params,success,fail){
        Ajax(`/dolphin-auth/management/oauth/current/user/${params.id}`, {responseType: "blob"},success,fail,"GET");
    }
};