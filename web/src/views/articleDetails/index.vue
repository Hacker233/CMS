<template>
  <div class="article-details-box">
    <div class="contex-box">
      <article class="article-left">
        <header>
          <div class="author">
            <el-avatar :size="50" src="https://empty" @error="errorHandler">
              <img
                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
              />
            </el-avatar>
          </div>
        </header>
      </article>
      <div class="article-right">
        <user-box></user-box>
      </div>
    </div>
  </div>
</template>
<script>
import UserBox from "@/components/UserBox/UserBox";
export default {
  components: {
    UserBox,
  },
};
</script>
<style lang="less" scoped>
.article-details-box {
  flex: 1 0 auto;
  .contex-box {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .article-left {
      width: 840px;
      height: 80px;
      background-color: #fff;
      header {
        height: 80px;
        padding: 0 20px;
        display: flex;
        align-items: center;
        .author {
          height: 100%;
          display: flex;
          align-items: center;
        }
      }
    }
    .article-right {
      width: 325px;
    }
  }
}
</style>