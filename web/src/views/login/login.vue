<template>
  <div class="login-box">
    <div class="box-card">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="登录" name="first" class="login">
          <el-form :label-position="labelPosition" label-width="80px" :model="formLogin">
            <el-form-item label="用户名">
              <el-input v-model="formLogin.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="formLogin.password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit">登录</el-button>
              <el-button @click="resigned">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="second">
          <el-form :label-position="labelPosition" label-width="80px" :model="formLogin">
            <el-form-item label="用户名">
              <el-input v-model="formRegister.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="formRegister.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="formRegister.checkPass"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="register">注册</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  // import { userLogin } from "@/service/api/login";
  export default {
    data() {
      return {
        activeName: "first",
        labelPosition: "right",
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
    mounted() { },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
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
      width: 25vw;
      height: 35vh;
      background-color: #fff;

      /deep/ .el-tabs__nav {
        width: 100%;
        display: flex;
      }

      /deep/ .el-tabs__item {
        width: 50%;
        height: 5vh;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 10vh;
        font-size: 1.5vh;
      }

      /deep/ .el-tabs__active-bar {
        width: 50%;
      }

      /deep/ .el-form {
        width: 70%;
        margin: 0 auto;
        display: flex;
        height: 20vh;
        flex-direction: column;
        justify-content: space-evenly;
      }
    }
  }
</style>