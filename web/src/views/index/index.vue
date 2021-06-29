<template>
  <div class="home-box">
    <div class="content-box">
      <div class="left">
        <!-- 轮播图 -->
        <div class="carousel">
          <Carousel></Carousel>
        </div>
        <!-- 推荐内容区域 -->
        <div class="recommend-article" v-for="(item, index) in recommendedList" :key="index">
          <!-- 标题区域 -->
          <type-sort :title="item.title"></type-sort>
          <!-- 文章区域 -->
          <div class="article-card-box" v-if="item.flag === '1'">
            <article-list
              v-for="(articleItem, articleIndex) in item.topArticleList"
              :key="articleIndex"
              :articleItem="articleItem"
            ></article-list>
          </div>
          <!-- 视频区域 -->
          <div class="video-box" v-else>
            <div class="card" v-for="(item, index) in 9" :key="index">
              <video-card></video-card>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <!-- 用户区 -->
        <user-box></user-box>
        <upload></upload>
      </div>
    </div>
  </div>
</template>
<script>
import Carousel from "./components/Carousel"; // 轮播图组件
import VideoCard from "./components/VideoCard"; // 视频卡片
import UserBox from "@/components/UserBox/UserBox"; // 用户组件
import TypeSort from "./components/TypeSort.vue"; // 标题组件
import ArticleList from "./components/ArticleList.vue"; // 文章列表
import { recommendedList } from "@/service/api/article.js";
import upload from './components/upload.vue'
export default {
  data(){
    return {
      recommendedList: []
    }
  },
  components: {
    Carousel,
    UserBox,
    VideoCard,
    TypeSort,
    ArticleList,
    upload
  },
  mounted(){
    this.getRecommendedList(); // 获取推荐列表
  },
  methods: {
    async getRecommendedList(){
      const data = await recommendedList();
      if (data.code === "00000") {
        this.recommendedList = data.data;
      } else {
        this.$message.error(data.message);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.home-box {
  width: 100%;
  margin-top: 20px;
  flex: 1 0 auto;
  box-sizing: border-box;
  .content-box {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .left {
      width: 840px;
      .carousel {
        margin: 0 0 30px 0;
      }
      .recommend-article {
        .video-box {
          width: 100%;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          .card {
            margin-bottom: 20px;
          }
        }
        .article-card-box {
          width: 100%;
        }
      }
    }
    .right {
      width: 325px;
    }
  }
}
</style>