<template>
  <div class="article-details-box">
    <div class="contex-box">
      <article class="article-left">
        <!-- 文章内容详情区域 -->
        <article-content v-if="Object.keys(articleItem).length" :articleItem="articleItem"></article-content>
        <!-- 评论组件 -->
        <comment-com
          @doSend="doSend($event)"
          @doChidSend="doChidSend(arguments)"
          :commentList="commentList"
          :commentNum="commentNum"
          :label="label"
          :avatar="avatar"
          :placeholder="placeholder"
          :minRows="minRows"
          :maxRows="maxRows"
        ></comment-com>
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
export default {
  data() {
    return {
      articleItem: {}, // 文章详细信息
      label: "SVIP",
      placeholder: "说点什么吧",
      minRows: 4,
      maxRows: 4,
      commentNum: 2,
      avatar: require("./components/img/icon/avtar.png"),
      commentList: [
        {
          id: 1,
          commentUser: {
            id: 1,
            nickName: "花非花",
            avatar:
              "http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50",
          },
          content:
            "<a style='text-decoration:none;color: #409eff ' href='https://blog.csdn.net/abcwanglinyong/'>我的CSDN博客地址</a>[害羞][害羞][害羞]<br/>" +
            "我的微信公众号：<br/>" +
            "<img src=" +
            require("./components/img/hbl.jpg") +
            ">",
          createDate: "2019-9-23 17:36:02",
          childrenList: [
            {
              id: 2,
              commentUser: {
                id: 2,
                nickName: "坏菠萝",
                avatar: "",
              },
              targetUser: {
                id: 1,
                nickName: "花非花",
                avatar:
                  "http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50",
              },
              content: "真的就很棒！很Nice!",
              createDate: "2019-9-23 17:45:26",
            },
          ],
        },
      ],
    };
  },
  components: {
    UserBox,
    ArticleContent,
    CommentCom,
    HandleBox
  },
  mounted() {
    this.articleInfo();
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