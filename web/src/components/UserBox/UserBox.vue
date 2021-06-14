<template>
  <div class="user-box">
    <!-- 已登录 -->
    <template v-if="userInfo">
      <el-avatar class="avatar" :src="userInfo.avatar"></el-avatar>
    </template>
    <!-- 未登录 -->
    <template v-else>
      <IconPig icon-style="no-login-icon" icon-class="icon-smallpigtouxiang" />
      <el-button type="primary" class="to-login-btn"
        >去登录<i class="el-icon-d-arrow-right"></i
      ></el-button>
    </template>
    <!-- 写文章 -->
  </div>
</template>
<script>
export default {
  computed: {
    userInfo() {
      return this.$store.getters.getUserInfo;
    },
  },
};
</script>
<style lang="less" scoped>
.user-box {
  width: 100%;
  height: 350px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .no-login-icon {
    width: 65px;
    fill: #ccc;
  }
}
</style>