<template>
  <div class="menu-list-box">
    <el-menu default-active="1">
      <el-menu-item index="1">
        <span slot="title">全部</span>
      </el-menu-item>
      <el-menu-item index="1">
        <span slot="title">前端</span>
      </el-menu-item>
      <el-menu-item index="1">
        <span slot="title">后端</span>
      </el-menu-item>
      <el-menu-item index="1">
        <span slot="title">数据库</span>
      </el-menu-item>
      <el-menu-item index="1">
        <span slot="title">产品</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<style lang="less" scoped>
.menu-list-box {
  .el-menu-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>