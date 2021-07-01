<template>
  <div class="handle-box w50 flex flex-clum f-j-c f-a-c">
    <!-- 点赞数 -->
    <div class="box">
      <IconPig icon-style="likes" icon-class="icon-smallpigdianzan" />
      <span>12</span>
    </div>
    <!-- 评论数 -->
    <div class="box">
      <IconPig icon-style="comments" icon-class="icon-smallpigpinglun1" />
      <span>12</span>
    </div>
    <!-- 收藏数 -->
    <div class="box">
      <IconPig icon-style="collections" icon-class="icon-smallpigshoucang1" />
      <span>12</span>
    </div>
  </div>
</template>
<style lang="less" scoped>
.handle-box {
  position: fixed;
  top: 200px;
  margin-left: -80px;
  .box {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    cursor: pointer;
    position: relative;
    .likes,
    .comments,
    .collections {
      width: 20px;
      height: 20px;
      fill: #86909c;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    span {
      padding: 2px 7px;
      border-radius: 12px;
      background-color: #86909c;
      position: absolute;
      top: -5px;
      right: -10px;
      font-size: 10px;
      transform: scale(0.75);
      color: #fff;
    }
  }
}
</style>