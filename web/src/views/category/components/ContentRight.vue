<template>
  <div class="right-wraper">
    <!-- 类型区域 -->
    <div class="type-box">
      <ul>
        <li>全部</li>
        <li>HTML</li>
        <li>全部</li>
        <li>HTML</li>
        <li>全部</li>
        <li class="active">CSS</li>
      </ul>
      <div class="sort">
        <span class="data-sort"
          ><IconPig
            icon-style="sort-icon-date"
            icon-class="icon-smallpigpaixu"
          />按日期</span
        >
        <span>|</span>
        <span class="data-hot"
          ><IconPig
            icon-style="sort-icon-hot"
            icon-class="icon-smallpigredupaixu"
          />按热度</span
        >
      </div>
    </div>
    <!-- 内容列表区域 -->
    <div class="content-list-type"></div>
  </div>
</template>
<style lang="less" scoped>
.right-wraper {
  width: 100%;
  .type-box {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    ul {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: -10px;
      li {
        border: 1px solid rgb(218, 218, 218);
        padding: 10px 15px;
        border-radius: 20px;
        margin: 0 15px 10px 0;
        cursor: pointer;
        &:hover {
          border: 1px solid rgb(148, 148, 158);
        }
      }
      .active {
        border: 1px solid #669;
      }
    }
    .sort {
      display: flex;
      justify-content: flex-end;
      min-width: 180px;
      span {
        user-select: none;
      }
      .data-sort {
        display: flex;
        align-items: center;
        margin-right: 15px;
        cursor: pointer;
        user-select: none;
        .sort-icon-date {
          width: 16px;
          height: 16px;
          fill: #669;
          margin-right: 5px;
        }
      }
      .data-hot {
        display: flex;
        align-items: center;
        margin-left: 15px;
        cursor: pointer;
        user-select: none;
        .sort-icon-hot {
          width: 16px;
          height: 16px;
          margin-right: 5px;
        }
      }
    }
  }
  .content-list-type {
    width: 100%;
    background-color: #fff;
    min-height: 100px;
  }
}
</style>