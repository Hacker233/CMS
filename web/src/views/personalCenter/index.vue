<template>
  <div class="personal-center-box">
    <div class="personl-left">
      <div class="personal"></div>
      <div class="menu">
        <el-menu default-active="2" class="el-menu-vertical-demo">
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="personal-right">
      <div class="content"></div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.personal-center-box {
  flex: 1;
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  .personl-left {
    width: 325px;
    .personal {
      width: 100%;
      height: 350px;
      background-color: #fff;
      border-bottom: 1px solid #eee;
    }
    .menu {
        margin: 20px 0 0 0;
        background-color: #fff;
        padding: 20px 0 20px 0;
    }
  }
  .personal-right {
    width: 840px;
    .content {
      min-height: 500px;
      background-color: #fff;
    }
  }
}
</style>