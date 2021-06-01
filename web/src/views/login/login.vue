<template>
  <div class="login-box">
    <div class="box-card">
      <div class="logo"></div>
      <div class="register-box">
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
          :disabled="disabled"
          >注册</el-button
        >
        <a href="#">已有账号？立即登录</a>
      </div>
    </div>
  </div>
</template>
<script>
import { userRegister } from "@/service/api/user";
export default {
  data() {
    return {
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
    disabled() {
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
    }
  }
}
</style>
