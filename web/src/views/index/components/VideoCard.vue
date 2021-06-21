<template>
  <div class="article-box" @click="toArticleDetails"></div>
</template>
<script>
export default {
  methods: {
    toArticleDetails() {
      this.$router.push({
        name: "articleDetails",
      });
    },
  },
};
</script>
<style lang="less" scoped>
.article-box {
  width: 250px;
  height: 300px;
  background-color: #fff;
}
</style>