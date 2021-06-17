<template>
  <div class="type-sort">
    <div class="left">
      <h1>{{ title }}</h1>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="less" scoped>
.type-sort {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  border-left: 3px solid #8585ad;
  background-image: linear-gradient(to right, #cdcddf, #ececec);
  margin: 20px 0 20px 0;
  .left {
    padding-left: 20px;
    h1 {
      font-size: 20px;
      color: #8585ad;
    }
  }
}
</style>
