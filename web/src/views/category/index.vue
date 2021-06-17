<template>
  <div class="category-box">
    <div class="content">
      <!-- 分类列表 -->
      <div class="menu-list-left">
        <menu-list></menu-list>
      </div>
      <!-- 右侧内容区 -->
      <div class="content-box-list">
        <content-right></content-right>
      </div>
    </div>
  </div>
</template>
<script>
import MenuList from "./components/MenuList.vue"; // 左侧分类菜单
import ContentRight from "./components/ContentRight.vue"; // 右侧内容区域
export default {
  components: {
    MenuList,
    ContentRight,
  },
};
</script>
<style lang="less" scoped>
.category-box {
  flex: 1 0 auto;
  .content {
    width: 1200px;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    .menu-list-left {
        width: 120px;
    }
    .content-box-list {
        width: 1050px;
    }
  }
}
</style>