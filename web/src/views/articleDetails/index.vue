<template>
  <div class="article-details-box">
    <div class="contex-box">
      <article class="article-left">
        <!-- 文章内容详情区域 -->
        <article-content></article-content>
        <!-- 评论组件 -->
        <comment-com></comment-com>
      </article>
      <div class="article-right">
        <!-- 右侧用户详情区域 -->
        <user-box></user-box>
      </div>
    </div>
  </div>
</template>
<script>
import CommentCom from "./components/CommentCom"; // 评论组件
import ArticleContent from "./components/ArticleContent"; // 文章详情
import UserBox from "@/components/UserBox/UserBox"; // 用户卡片
export default {
  components: {
    UserBox,
    ArticleContent,
    CommentCom
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
      min-height: 300px;
      background-color: #fff;
    }
    .article-right {
      width: 325px;
    }
  }
}
</style>