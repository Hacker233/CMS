<template>
  <div class="home-box">
    <div class="content-box">
      <div class="left">
        <!-- 轮播图 -->
        <div class="carousel">
          <Carousel></Carousel>
        </div>
        <!-- 推荐内容区域 -->
        <div class="recommend-article" v-for="(item,index) in 2" :key="index">
          <!-- 标题区域 -->
          <type-sort title="热门视频"></type-sort>
          <!-- 文章区域 -->
          <div class="article-card-box" v-if="index === 0">
            <div class="article-card-list" v-for="(item,index) in 6" :key="index"></div>
          </div>
          <!-- 视频区域 -->
          <div class="video-box" v-else>
            <div class="card" v-for="(item, index) in 9" :key="index">
              <article-card></article-card>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <!-- 用户区 -->
        <user-box></user-box>
      </div>
    </div>
  </div>
</template>
<script>
import Carousel from "./components/Carousel"; // 轮播图组件
import ArticleCard from "./components/ArticleCard"; // 卡片
import UserBox from "@/components/UserBox/UserBox"; // 用户组件
import TypeSort from "./components/TypeSort.vue";
export default {
  components: {
    Carousel,
    UserBox,
    ArticleCard,
    TypeSort
  },
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
          .article-card-list {
            width: 100%;
            min-height: 120px;
            background-color: #fff;
            border-bottom: 1px solid #ccc;
          }
        }
      }
    }
    .right {
      width: 325px;
    }
  }
}
</style>