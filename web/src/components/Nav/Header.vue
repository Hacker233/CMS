<template>
  <header class="header-box">
    <nav class="nav-box">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
        </el-submenu>
      </el-menu>
    </nav>
  </header>
</template>
<script>
import { menuList } from "@/service/api/header";
export default {
  data() {
    return {
      activeIndex: "1",
      menuList: []
    };
  },
  mounted(){
    this.init();
  },
  methods: {
    // 初始化导航菜单
    async init(){
      const data = await menuList();
      if(data.code === "00000") {
        this.menuList = data.data;
      } else {
        this.$message.error(data.message);
      }
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style lang="less" scoped>
.header-box {
  height: 70px;
  width: 100%;
  background-color: #fff;
  .nav-box {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    background-color: #ccc;
    /deep/ .el-menu {
      height: 100%;
      .el-menu-item {
        height: 100%;
        display: flex;
        align-items: center;
      }
      .el-submenu {
        height: 100%;
        .el-submenu__title {
          height: 100%;
          display: flex;
          align-items: center;
          .el-submenu__icon-arrow {
              margin: 0 8px;
          }
          .el-icon-arrow-down {
              margin: 0 8px;
          }
        }
      }
    }
  }
}
</style>