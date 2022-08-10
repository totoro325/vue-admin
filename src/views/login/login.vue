<template>
<div class="loginbg">

     <el-card class="logincontentbg">
          <el-form
            :model="form"
            status-icon
            :rules="rules"
            label-width="100px"
            class="login-container"
          >
            <h3>系统登录</h3>
            <el-form-item
              label="用户名"
              label-width="80px"
              prop="username"
              class="username"
            >
              <el-input
                type="input"
                v-model="form.username"
                autocomplete="off"
                placeholder="请输入账号"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="80px" prop="password">
              <el-input
                type="password"
                v-model="form.password"
                autocomplete="off"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
             <el-form-item label="验证码"  label-width="80px" prop="verifyCode" >
                  <el-row :span="24">
                    <el-col :span="12">
                      <el-input
                        placeholder="请输入4位验证码"
                        v-model="form.verifyCode"
                        @keyup.enter.native="submitForm('form')"
                        
                      ></el-input>
                          </el-col>
                             <el-col :span="10"> <div id="v_container"></div></el-col>
                  </el-row>
              </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="login">登录</el-button>
            </el-form-item>
          </el-form>
     </el-card>
  </div>
</template>

<script>
import { GVerify } from '@/verifyCode';
import { getMenu } from '@/api/data'
export default {
  name: "login",
  data() {
    return {
      form: {
        username:'',
        password:'',
        verifyCode:'',
      },
      rules: {
        username: [
          { required: true, message: "please enter username", trigger: "blur" },
          { min: 3, message: "too short", trigger: "blur" },
        ],
        password: [
          { required: true, message: "please enter pw", trigger: "blur" },
        ],
        verifyCode: [

          { required: true, message: "请输入验证码", trigger: "blur" },

        ],
      
      },
    };
  },
  /*  methods: {
    login() {
      this.$http.post('api/permission/getMenu', this.form).then(res => {
        res = res.data
        if(res.code === 20000){
                this.$store.commit('clearMenu')
                this.$store.commit('setMenu', res.data.menu)
                this.$store.commit('setToken', res.data.token)
                this.$store.commit('addMemu', this.$router) 
                this.$router.push({ name:'home'})
            }
        console.log(res)
      })
    }*/

  methods: {
    login() {
        // 获取验证码
      var verifyCode = this.form.verifyCode;
      var verifyFlag = this.verifyCode.validate(verifyCode);
      console.log(verifyFlag);
      console.log(verifyCode);
      if (!verifyFlag) {
        this.$message.error("验证码错误！");
        return;
      }

      this.$http.post( getMenu ,this.form).then((res) => {
        res = res.data;
        //判断接口返回状态码为20000登录成功
        if (res.code === 20000 ) {
          //调用store中的tab.js文件中的clearMenu方法将登录信息清空。避免二次登录
          this.$store.commit("clearMenu");
          //调用store的tab.js文件的setMenu方法将接口返回的menu数据传给该方法
          this.$store.commit("setMenu", res.data.menu);
          this.$store.commit("setToken", res.data.token);
          //调用store的tab.js文件中的addMenu方法，添加静态路由
          this.$store.commit("addMemu", this.$router);
          //跳转到首页
          this.$router.push({ name: "home" });
        } else {
          //登录失败将接口返回饿信息输出
          this.$message.warning(res.data.message)
        }
      });

    },
  },
  mounted() {
    this.verifyCode = new GVerify("v_container");

  },
}
</script>
<style scoped>
.el-form {
  border-radius: 15px;
  background-clip: padding-box;
  width: 400px;
  padding: 35px;
}
.loginbg{
  background-image: url(../../assets/loginbg.svg);
  background-size: cover;
  background-position: top left;
  height:100%
}
.logincontentbg{
  width:500px;
  height:600px;
  position: absolute;
  background: #fff;
  right: 20%;
  top:15%;
  z-index:10;
  border-radius: 10px;
  box-shadow:;

}
</style>
