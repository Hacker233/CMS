<template>
  <div class="home-box">
    <div class="content-box">
      <div class="left">
        <!-- 轮播图 -->
        <div class="carousel">
          <Carousel></Carousel>
        </div>
        <!-- 推荐文章区域 -->
        <div class="recommend-article">
          <div class="card" v-for="(item, index) in 9" :key="index">
            <article-card></article-card>
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
import Carousel from "./components/Carousel";
import ArticleCard from "./components/ArticleCard";
import UserBox from "@/components/UserBox/UserBox";
export default {
  components: {
    Carousel,
    UserBox,
    ArticleCard,
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
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .card {
          margin-bottom: 20px;
        }
      }
    }
    .right {
      width: 325px;
    }
  }
}
</style>