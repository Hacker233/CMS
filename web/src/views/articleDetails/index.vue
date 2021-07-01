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
        <comment-com :commentList="commentList" @submit="submit"></comment-com>
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
import CommentCom from "./components/Comment.vue"; // 评论组件
import ArticleContent from "./components/ArticleContent"; // 文章详情
import UserBox from "@/components/UserBox/UserBox"; // 用户卡片
import HandleBox from "./components/HandleBox.vue"; // 点赞等操作浮窗
import { getArticleInfo } from "@/service/api/article.js";
import { getCommentList, addComment } from "@/service/api/comment.js";
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
    CommentCom,
    HandleBox,
  },
  mounted() {
    this.articleInfo(); // 获取文章信息
    this.getCommentList(); // 获取评论列表
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
    // 获取评论列表
    async getCommentList() {
      let params = {
        article_id: this.$route.query.id,
      };
      const data = await getCommentList(params);
      if (data.code === "00000") {
        if (data.data) {
          this.commentList = data.data;
        } else {
          this.commentList = [];
        }
      } else {
        this.$message.error(data.message);
      }
    },
    // 提交一级评论
    async submit(content) {
      let params = {
        article_id: this.$route.query.id,
        content: content,
      };
      const data = await addComment(params);
      if (data.code === "00000") {
        this.$message.success("评论成功");
        this.getCommentList();
      } else {
        this.$message.error(data.message);
      }
    },
    doSend(content) {
      console.log("初始发送按钮点击事件：" + content);
    },
    doChidSend(args) {
      console.log("评论区发送按钮点击事件：");
      console.log("content=" + args[0]);
      console.log("targetUserId=" + args[1]);
      console.log("父级评论id=" + args[2]);
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