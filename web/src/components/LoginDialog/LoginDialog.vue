<template>
  <el-dialog
    :show-close="false"
    :append-to-body="true"
    :visible.sync="visible"
    top="0"
    width="400px"
    custom-class="login-dialog"
    :lock-scroll="false"
  >
    <div class="login-box">
      <div class="box-card">
        <div class="logo"></div>
        <div class="exit">
          <i class="el-icon-close" @click="close"></i>
        </div>
        <div class="register-box">
          <!-- 注册 -->
          <template v-if="isLogin">
            <el-input
              placeholder="请输入用户名"
              v-model="formRegister.username"
            >
              <template slot="prepend"
                ><i class="el-icon-user-solid"></i>
              </template>
            </el-input>

            <el-input placeholder="请输入邮箱" v-model="formRegister.email">
              <template slot="prepend"
                ><i class="el-icon-user-solid"></i>
              </template>
            </el-input>

            <div>
              <el-button type="primary" @click="getEmailCode"
                >获取验证码</el-button
              >
            </div>

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
            <p class="to-login" @click="toLogin">已有账号？立即登录</p>
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
            <p @click="toLogin">没有账号？去注册</p>
          </template>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { userRegister, userLogin, emailCode } from "@/service/api/user";
export default {
  data() {
    return {
      visible: false,
      isLogin: true,
      checked: "",
      formLogin: {
        username: "",
        password: "",
      },
      formRegister: {
        username: "",
        email: "",
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
    loginDisabled() {
      if (this.formLogin.username === "" || this.formLogin.password === "") {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    // 打开登录弹窗
    open() {
      this.visible = true;
    },
    // 关闭登录弹窗
    close() {
      this.visible = false;
    },
    // 注册用户
    async register() {
      let params = {
        username: this.formRegister.username,
        password: this.formRegister.password,
      };
      const data = await userRegister(params);
      if (data.code === "00000") {
        this.$message.success("注册成功");
        this.register(data); // 登录成功回调
        this.close();
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
    },
    // 登录
    async userLogin() {
      let params = {
        username: this.formLogin.username,
        password: this.formLogin.password,
      };
      const data = await userLogin(params);
      if (data.code === "00000") {
        this.$message.success("登录成功");
        this.login(data); // 登录成功回调
        this.close();
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
    },
    // 登录注册切换
    toLogin() {
      this.isLogin = !this.isLogin;
    },
    // 获取邮箱验证码
    async getEmailCode() {
      let params = {
        email: this.formRegister.email,
      };
      const data = await emailCode(params);
      if (data.code === "00000") {
        this.$message.success("已发送验证码！");
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.el-dialog__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  /deep/ .login-dialog {
    margin: 0;
    .el-dialog__header {
      padding: 0;
    }
    .el-dialog__body {
      padding: 0;
    }
  }
}

// 登录框样式
.login-box {
  height: 100%;
  width: 100%;
  background-color: #eee;
  display: flex;
  justify-content: center;
  flex: 1 0 auto;
  box-sizing: border-box;
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
    .exit {
      height: 50px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0 15px 0 0;
      position: absolute;
      right: 0;
      i {
        font-size: 20px;
        cursor: pointer;
        &:hover {
          color: blue;
        }
      }
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
      p {
        width: 100%;
        text-align: center;
        cursor: pointer;
        color: rgb(132, 132, 255);
        &:hover {
          color: rgb(90, 90, 255);
        }
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
