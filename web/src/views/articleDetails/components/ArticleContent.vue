<template>
  <article class="article-content-box">
    <!-- 文章详情头部 -->
    <header>
      <div class="author">
        <el-avatar
          :size="50"
          :src="articleItem.userInfo.avatar"
          @error="errorHandler"
        >
        </el-avatar>
        <div class="userinfo">
          <h1 class="username">{{ articleItem.userInfo.username }}</h1>
          <p class="article-date">
            {{ $moment(articleItem.createTime).format("YYYY年MM月DD")
            }}<span class="ml10">阅读 {{ articleItem.views }}</span>
          </p>
        </div>
        <el-button size="small">关注</el-button>
      </div>
    </header>
    <article class="content">
      <!-- 文章标题 -->
      <h1 class="article-title">{{ articleItem.title }}</h1>
      <!-- 文章封面图 -->
      <el-image
        style="width: 100%;"
        :src="articleItem.cover"
      >
      </el-image>
      <section class="mt20" v-html="articleItem.content"></section>
    </article>
    <footer class="classify">
      <span class="tag-group__title">文章分类</span>
      <el-tag class="cusp" size="small">{{ articleItem.category }}</el-tag>
      <span class="tag-group__title">文章类型</span>
      <el-tag
        class="cusp"
        size="small"
        v-for="(item, index) in articleItem.types"
        :key="index"
        >{{ item.type_name }}</el-tag
      >
    </footer>
  </article>
</template>
<script>
export default {
  props: {
    articleItem: {
      type: Object,
      defaule: () => {
        return {};
      },
    },
  },
  methods: {
    errorHandler() {
      return true;
    },
  },
};
</script>
<style lang="less" scoped>
.article-content-box {
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  header {
    height: 80px;
    display: flex;
    align-items: center;
    padding: 0px 25px;
    box-sizing: border-box;
    width: 100%;
    border-bottom: 1px solid rgb(211, 211, 211);
    .author {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      .userinfo {
        height: 45px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        margin: 0 0 0 15px;
        flex: 1;
        .username {
          font-size: 16px;
          font-weight: 800;
          color: #333;
        }
        .article-date {
          font-size: 14px;
          color: #909090;
        }
      }
    }
  }
  .content {
    padding: 30px 25px;
    .article-title {
      margin: 0 0 20px 0;
    }
  }
  .classify {
    border-top: 1px solid rgb(211, 211, 211);
    height: 90px;
    padding: 0 25px;
    display: flex;
    align-items: center;
    span {
      margin: 0 20px 0 0;
    }
  }
}
</style>