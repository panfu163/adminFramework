<template>
  <div class="login">
    <div class="box">
      <div class="left">
        <img src="@/assets/img/management/login.png" height="659" width="737" />
      </div>
      <div class="right">
        <div class="login-box">
          <h3>用户名</h3>
          <input
            class="input"
            placeholder="请输入用户名/手机号/邮箱"
            type="text"
            @input="getPhone"
            v-model="phone"
          />
          <div class="input-box">
            <input
              v-if="isGetCocing"
              class="input"
              placeholder="请输入您的验证码"
              type="text"
              v-model="password"
            />
            <input
              v-else
              class="input"
              placeholder="请输入您的密码"
              type="password"
              v-model="password"
            />
            <div class="but" v-if="isGetCocing" @click.stop="getVcode()">
              {{ codeText }}
            </div>
          </div>
          <Vcode
            :show="isShow"
            :sliderText="sliderText"
            @success="success"
            @close="close"
          ></Vcode>
          <button class="btn" @click="Login()">登 录</button>
          <div class="forget">忘记密码?</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>版权所有 贵州钱多多科技有限公司</p>
      <p>@{{ year }} PFUNI.CN 黔ICP备19010969号-1</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.login {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: #24282c;
  padding: 10px;
  box-sizing: border-box;
  min-width: 1200px;
  margin: 0 auto;
  .box {
    padding: 0 20px;
    display: flex;
    position: relative;
    overflow: hidden;
    .left {
      flex: 1;
      img {
        display: block;
        width: 60%;
        height: auto;
        margin: 18% auto 0;
      }
    }
    .right {
      padding: 10px;
      flex: 1;
      .login-box {
        background: #fff;
        padding: 20px;
        border-radius: 10px;
        width: 50%;
        box-sizing: border-box;
        margin: 20% auto 0;
        h3 {
          margin: 20px 0;
        }
        .input-box {
          position: relative;
          width: 100%;
          box-sizing: border-box;
          .but {
            position: absolute;
            top: 5px;
            right: 10px;
            width: 120px;
            box-sizing: border-box;
            padding: 0 20px;
            height: 40px;
            line-height: 40px;
            border: 1px solid #00c1de;
            border-radius: 10px;
            outline: none;
            -webkit-appearance: none;
            background: #00c1de;
            color: #fff;
            font-size: 14px;
            cursor: pointer;
            text-align: center;
          }
        }
        .input {
          width: 100%;
          margin-bottom: 20px;
          box-sizing: border-box;
          padding: 0 20px;
          height: 50px;
          border: 1px solid #999;
          border-radius: 10px;
          outline: none;
          -webkit-appearance: none;
          color: #24282c;
        }
        .btn {
          width: 100%;
          margin: 50px auto 10px;
          box-sizing: border-box;
          padding: 0 20px;
          height: 50px;
          border: 1px solid #00c1de;
          border-radius: 10px;
          outline: none;
          -webkit-appearance: none;
          background: #00c1de;
          color: #fff;
          font-size: 18px;
          cursor: pointer;
        }
        .forget {
          text-align: right;
          cursor: pointer;
          color: #999;
          font-size: 12px;
        }
      }
    }
  }
  .footer {
    text-align: center;
    color: #fff;
    line-height: 30px;
    margin: 10% auto 10px;
    font-size: 12px;
  }
}
</style>
<script>
//import Vcode from "@/components/vcode/vcode";
import Vcode from "vue-puzzle-vcode";
import { Loading } from "element-ui";
export default {
  data() {
    return {
      sliderText: "拖动滑块完成验证",
      isShow: false, // 验证码模态框是否出现
      isGetCocing: false,
      codeText: "获取验证码",
      time: 59,
      timer: undefined,
      reg: /^1[0-9]{10}$/, // 手机号码匹配正则
      pas: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@#&_-])[\da-zA-Z@#&_-]{8,}$/, //密码强度不符合
      year: "",
      status: 1,
      phone: "",
      password: ""
    };
  },
  methods: {
    getLogin() {
      let loadingInstance = Loading.service({
        fullscreen: true,
        background: "rgba(0, 0, 0, 0.8)",
        text: "拼命加载中..."
      }); //显示加载中
      this.$http(
        "/user",
        {
          page: 1,
          pageSize: 10,
          cityCode: "310100",
          Longitude: 106.70833,
          Latitude: 26.558015
        },
        res => {
          localStorage.setItem("userInfo", res.data);
          loadingInstance.close();
          this.$router.push({ path: "/" });
        },
        error => {
          console.log(error);
        }
      );
    },
    Login() {
      if (!this.phone) {
        this.$notify({
          title: "警告",
          message: "用户名不能未空!",
          type: "warning"
        });
        return;
      }
      if (!this.password) {
        this.$notify({
          title: "警告",
          message: "密码不能为空!",
          type: "warning"
        });
        return;
      }
      if (this.phone != "admin") {
        this.$notify({
          title: "警告",
          message: "用户名不正确!",
          type: "warning"
        });
        return;
      }
      if (this.password != "admin") {
        this.$notify({
          title: "警告",
          message: "密码不正确!",
          type: "warning"
        });
        return;
      }
      localStorage.setItem("userInfo", "user"); //这里只是测试用的
      this.$router.push({ path: "/" }); //这里只是测试用的
      //this.getLogin();
    },
    // 用户通过了验证
    success(msg) {
      this.isShow = false; // 通过验证后，需要手动隐藏模态框
      this.getCode();
    },
    // 用户点击遮罩层，应该关闭模态框
    close() {
      this.isShow = false;
    },
    //获取手机号
    getPhone() {
      let len = this.phone.length;
      if (len === 11) {
        if (this.reg.test(this.phone)) {
          this.isGetCocing = true;
        }
      } else {
        this.isGetCocing = false;
      }
    },
    //图形验证
    getVcode() {
      this.isShow = true;
    },
    //获取验证码
    getCode() {
      if (this.status === 1) {
        if (this.timer) {
          clearInterval(this.timer);
        }
        this.codeText = "59s 后重试";
        this.timer = setInterval(() => {
          if (this.time > 1) {
            this.time--;
            this.codeText = `${this.time}s 后重试`;
          } else {
            this.time = 59;
            this.codeText = "重新获取验证码";
            clearInterval(this.timer);
            this.isGetCocing = false;
          }
        }, 1000);
      } else {
        this.isGetCocing = false;
      }
    }
  },
  mounted() {
    let myDate = new Date();
    this.year = myDate.getFullYear();
  },
  computed: {},
  components: {
    Vcode
  }
};
</script>
