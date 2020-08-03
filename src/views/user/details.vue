<!---
 --@author  PanFu
 --@data 2019-08-30 16:19
 --@description activity.v1.0-List
 --@version 1.0
--->
<template>
  <div class="details">
    <h4>{{this.$route.meta.title}}</h4>
    <el-row>
      <el-col :span="4">
        <div class="head-portrait">
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="portrait">
          <p>帐号：panfu163 付费会员</p>
          <p>等级：vip会员</p>
          <p>手机：18285530808</p>
          <p>积分：30</p>
          <p>信用评分：0</p>
        </div>
      </el-col>
    </el-row>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="基本资料" name="1">
        <el-row>
          <el-col :span="5"> 姓名：琥珀</el-col>
          <el-col :span="5">姓别：男</el-col>
          <el-col :span="5"> 省份证号： 522622198709060010 </el-col>
          <el-col :span="5"> 省份证号： 522622198709060010 </el-col>
          <el-col :span="5"> 出生年月：1990年10月20日</el-col>
          <el-col :span="5"> 手机号： 18285533808 </el-col>
          <el-col :span="5"> 毕业学校：清华大学 </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="付费会员" name="2">
        <el-row>
          <el-col :span="5">会员类型：年卡</el-col>
          <el-col :span="5">费用：￥30</el-col>
          <el-col :span="5">开通时间：2019.12.03</el-col>
          <el-col :span="5">到期时间：2019.12.03</el-col>
          <el-col :span="5">续费类型：自动</el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="收货信息" name="3">
        <el-row type="flex">
          <el-col
            :span="4"
            class="shippingAddress"
            v-for="(itme, index) in shippingAddress"
            :key="index"
          >
            <el-row>
              <el-col>{{ itme.name }} {{ itme.phone }}</el-col>
              <el-col>{{ itme.address }}</el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="发票信息" name="4">
        <el-row type="flex">
          <el-col :span="4">
            <div>公司名称：贵州大牛有限公司</div>
            <div>税号：9893893498334</div>
            <div>公司地址：贵州钱多多有限公司</div>
          </el-col>
          <el-col :span="4">
            <div>公司名称：贵州大牛有限公司</div>
            <div>税号：9893893498334</div>
            <div>公司地址：贵州钱多多有限公司</div>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="认证资料" name="5">
        <div>
          用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
        </div>
        <div>
          结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。
        </div>
      </el-collapse-item>
      <el-collapse-item title="操作信息" name="5">
        <div>
          用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
        </div>
        <div>
          结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<style lang="scss" scoped>
.details {
  padding: 10px;
  background: #fff;
  box-sizing: border-box;
  h4 {
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }
  .head-portrait {
    padding: 20px;
    .el-avatar {
      width: 80px;
      height: 80px;
    }
  }
  .portrait {
    padding: 20px;
    p {
      line-height: 30px;
      font-size: 14px;
    }
  }
  .shippingAddress {
    border: 1px solid #eee;
    padding: 20px;
    margin-right: 10px;
  }
}
</style>
<script>
export default {
  data() {
    return {
      activeName: "1",
      shippingAddress: [
        {
          name: "潘付",
          phone: "18285533808",
          address: "贵州省贵阳市南明区花溪大道北段126"
        },
        {
          name: "潘付",
          phone: "18285533808",
          address: "贵州省贵阳市南明区花溪大道北段126"
        }
      ]
    };
  }
};
</script>
