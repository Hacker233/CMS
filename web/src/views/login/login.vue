<template>
  <div class="login-box">
    <div class="box-card">
      <div class="logo"></div>
      <div class="register-box">
        <!-- 注册 -->
        <template v-if="isLogin">
          <el-input placeholder="请输入用户名" v-model="formRegister.username">
            <template slot="prepend"
              ><i class="el-icon-user-solid"></i>
            </template>
          </el-input>
          <el-input
            placeholder="请输入密码"
            v-model="formRegister.password"
            type="password"
          >
            <template slot="prepend"
              ><i class="el-icon-s-opportunity"></i>
            </template>
          </el-input>
          <el-input
            placeholder="请确认密码"
            v-model="formRegister.checkPass"
            type="password"
          >
            <template slot="prepend"
              ><i class="el-icon-s-opportunity"></i>
            </template>
          </el-input>
          <el-checkbox v-model="checked">勾选《同意用户协议》</el-checkbox>
          <el-button
            type="primary"
            class="register-button"
            @click="register"
            :disabled="regsiterDisabled"
            >注册</el-button
          >
          <a href="#" @click="toLogin">已有账号？立即登录</a>
        </template>
        <!-- 登录 -->
        <template v-else>
          <h1 class="login-title">账号登录</h1>
          <el-input placeholder="请输入用户名" v-model="formLogin.username">
            <template slot="prepend"
              ><i class="el-icon-user-solid"></i>
            </template>
          </el-input>
          <el-input
            placeholder="请输入密码"
            v-model="formLogin.password"
            type="password"
          >
            <template slot="prepend"
              ><i class="el-icon-s-opportunity"></i>
            </template>
          </el-input>
          <el-button
            type="primary"
            class="register-button"
            @click="userLogin"
            :disabled="loginDisabled"
            >登录</el-button
          >
          <a href="#" @click="toLogin">没有账号？去注册</a>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { userRegister,userLogin } from "@/service/api/user";
export default {
  data() {
    return {
      isLogin: true,
      checked: "",
      formLogin: {
        username: "",
        password: "",
      },
      formRegister: {
        username: "",
        password: "",
        checkPass: "",
      },
    };
  },
  computed: {
    // 注册按钮是否可用
    regsiterDisabled() {
      if (
        this.formRegister.username === "" ||
        this.formRegister.password === "" ||
        this.formRegister.checkPass === "" ||
        !(this.formRegister.password === this.formRegister.checkPass) ||
        !this.checked
      ) {
        return true;
      } else {
        return false;
      }
    },
    loginDisabled(){
      if (
        this.formLogin.username === "" ||
        this.formLogin.password === "" 
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {},
  methods: {
    // 注册用户
    async register() {
      let params = {
        username: this.formRegister.username,
        password: this.formRegister.password,
      };
      const data = await userRegister(params);
      console.log(data);
    },
    // 登录
    async userLogin(){
      let params = {
        username: this.formRegister.username,
        password: this.formRegister.password,
      };
      const data = await userLogin(params);
      console.log(data);
    },
    // 登录注册切换
    toLogin() {
      this.isLogin = !this.isLogin;
    },
  },
};
</script>
<style lang="less" scoped>
.login-box {
  height: 100vh;
  width: 100vw;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  .box-card {
    width: 400px;
    height: 500px;
    background-color: #fff;
    position: relative;
    .logo {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background-color: #ccc;
      position: absolute;
      top: -60px;
      left: 50%;
      transform: translate(-50%, 0%);
    }
    .register-box {
      height: 80%;
      width: 75%;
      margin: 0 auto;
      padding-top: 70px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-evenly;
      a {
        width: 100%;
        text-align: center;
        text-decoration: none;
      }
      .register-button {
        width: 100%;
      }
      .login-title {
        margin: 0 auto;
        font-size: 20px;
      }
    }
  }
}
</style>
