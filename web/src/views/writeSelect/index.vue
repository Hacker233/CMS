<template>
  <div class="write-select-box">
    <div class="write-choose-card">
      <!-- 选择发布什么内容 -->
      <write-type v-for="index in 5" :key="index"></write-type>
    </div>
  </div>
</template>
<script>
import WriteType from "./components/WriteType.vue";
export default {
  components: {
    WriteType,
  },
};
</script>
<style lang="less" scoped>
.write-select-box {
  width: 1200px;
  margin: 0 auto;
  .write-choose-card {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 20px 0;
  }
}
</style>