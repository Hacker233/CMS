<template>
  <article class="article-content-box">
    <!-- 文章详情头部 -->
    <header>
      <div class="author">
        <el-avatar :size="50" src="https://empty" @error="errorHandler">
          <img
            src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
          />
        </el-avatar>
        <div class="userinfo">
          <h1 class="username">张三</h1>
          <p class="article-date">2021年06月06日<span>阅读 1842</span></p>
        </div>
        <el-button size="small">关注</el-button>
      </div>
    </header>
    <article class="content">
      <h1 class="article-title">JAVA同一IP访问同一接口进行频率限制</h1>
      <section>
        这里用到了redis,解释一下redis的key（IP+URL）记录了某个ip访问某个接口，value存的是访问的次数，加上一个过期时间，过期时间就是我们在注解上赋值的值。
        这里的redis的部分代码也贴出来这里用到了redis,解释一下redis的key（IP+URL）记录了某个ip访问某个接口，value存的是访问的次数，加上一个过期时间，过期时间就是我们在注解上赋值的值。
        这里的redis的部分代码也贴出来这里用到了redis,解释一下redis的key（IP+URL）记录了某个ip访问某个接口，value存的是访问的次数，加上一个过期时间，过期时间就是我们在注解上赋值的值。
        这里的redis的部分代码也贴出来这里用到了redis,解释一下redis的key（IP+URL）记录了某个ip访问某个接口，value存的是访问的次数，加上一个过期时间，过期时间就是我们在注解上赋值的值。
        这里的redis的部分代码也贴出来这里用到了redis,解释一下redis的key（IP+URL）记录了某个ip访问某个接口，value存的是访问的次数，加上一个过期时间，过期时间就是我们在注解上赋值的值。
        这里的redis的部分代码也贴出来
      </section>
    </article>
    <footer class="classify">
      <span class="tag-group__title">文章标7</span>
      <el-tag size="small">标签一</el-tag>
      <el-tag size="small">标签一</el-tag>
      <el-tag size="small">标签一</el-tag>
    </footer>
  </article>
</template>
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