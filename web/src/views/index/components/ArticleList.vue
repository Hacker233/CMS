<template>
  <div class="article-card-list">
    <div class="article-top">
      <el-avatar class="avatar" :src="articleItem.userInfo.avatar"></el-avatar>
      <span class="name">{{ articleItem.userInfo.username }}</span>
      <span class="time">3小时前</span>
      <span>{{ articleItem.category }}</span>
      <div class="point"></div>
      <span v-for="(item, index) in articleItem.types" :key="index">{{
        item.type_name
      }}</span>
    </div>
    <div class="article-content">
      <div class="content-left">
        <h1 @click="toArticleDetail(articleItem)">{{ articleItem.title }}</h1>
        <div class="content" @click="toArticleDetail(articleItem)">
          <p class="article-content">{{ articleItem.content }}</p>
        </div>
        <div class="article-data">
          <IconPig icon-style="views" icon-class="icon-smallpigliulanliang" />
          <span>{{ articleItem.views }}</span>
          <IconPig
            icon-style="collections"
            icon-class="icon-smallpigshoucang"
          />
          <span>{{ articleItem.collections }}</span>
          <IconPig icon-style="likes" icon-class="icon-smallpigicon-test" />
          <span>{{ articleItem.likes }}</span>
        </div>
      </div>
      <div class="cover">
        <el-image :src="articleItem.cover" :lazy="true" fit="cover"></el-image>
      </div>
    </div>
    <div class="article-buttom"></div>
  </div>
</template>
<script>
export default {
  props: {
    // 文章详情
    articleItem: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    // 跳转至文章详情
    toArticleDetail(articleItem) {
      this.$router.push({
        name: "articleDetails",
        query: {
          id: articleItem.article_id,
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
.article-card-list {
  width: 100%;
  min-height: 120px;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  padding: 7px 10px 10px 10px;
  .article-top {
    display: flex;
    align-items: center;
    .point {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: #86909c;
      margin-right: 10px;
    }
    span {
      margin-right: 10px;
      color: #86909c;
      font-size: 13px;
    }
    .avatar {
      margin-right: 10px;
      cursor: pointer;
    }
    .time {
      margin-right: 20px;
      font-size: 12px;
    }
    .name {
      cursor: pointer;
      &:hover {
        color: #8585ad;
      }
    }
  }
  .article-content {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px 0 10px;
    .content-left {
      flex: 1;
      h1 {
        font-weight: 700;
        font-size: 18px;
        cursor: pointer;
        &:hover {
          color: #669;
        }
      }
      .content {
        display: flex;
        p {
          color: #86909c;
          font-size: 15px;
          padding: 10px 0;
          word-break: break-all;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          flex-grow: 1;
          width: 0;
          cursor: pointer;
          &:hover {
            color: #669;
          }
        }
      }
      .article-data {
        padding-top: 8px;
        display: flex;
        align-items: center;
        span {
          margin-right: 20px;
          font-size: 13px;
          color: #4e5969;
        }
        .views,
        .collections,
        .likes {
          width: 15px;
          height: 15px;
          fill: #86909c;
          margin-right: 5px;
        }
      }
    }
    .cover {
      width: 120px;
      height: 80px;
      margin-left: 20px;
      display: flex;
      align-items: center;
      overflow: hidden;
    }
  }
}
</style>