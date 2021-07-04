<template>
  <div class="article-details-box mb20">
    <div class="contex-box">
      <article class="article-left">
        <!-- 文章内容详情区域 -->
        <article-content
          v-if="Object.keys(articleItem).length"
          :articleItem="articleItem"
        ></article-content>
        <!-- 评论组件 -->
        <comment-index :commentList="commentList"></comment-index>
      </article>
      <div class="article-right">
        <!-- 右侧用户详情区域 -->
        <user-box></user-box>
      </div>
      <!-- 用户操作浮窗 -->
      <handle-box></handle-box>
    </div>
  </div>
</template>
<script>
import CommentIndex from "./components/CommentIndex.vue"; // 评论组件
import ArticleContent from "./components/ArticleContent"; // 文章详情
import UserBox from "@/components/UserBox/UserBox"; // 用户卡片
import HandleBox from "./components/HandleBox.vue"; // 点赞等操作浮窗
import { getArticleInfo } from "@/service/api/article.js";
export default {
  data() {
    return {
      articleItem: {}, // 文章详细信息
      commentList: [], // 评论列表
    };
  },
  components: {
    UserBox,
    ArticleContent,
    CommentIndex,
    HandleBox,
  },
  mounted() {
    this.articleInfo(); // 获取文章信息
  },
  methods: {
    // 获取文章详情
    async articleInfo() {
      let params = {
        article_id: this.$route.query.id,
      };
      const data = await getArticleInfo(params);
      if (data.code === "00000") {
        this.articleItem = data.data;
      } else {
        this.$message.error(data.message);
      }
    },
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
    }
    .article-right {
      width: 325px;
    }
  }
}
</style>