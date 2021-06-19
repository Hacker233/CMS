<template>
  <div class="write-box">
    <!-- 上传封面区域 -->
    <div class="upload-cover"></div>
    <!-- 标题 -->
    <div class="title"></div>
    <!-- 内容编辑区 -->
    <div class="editor-box">
      <!-- 富文本编辑器 -->
      <wang-editor></wang-editor>
      <!-- 右侧区域 -->
      <div class="outline-box">
        <div class="release-box">
          <div class="release-btn">
            <IconPig
              icon-style="release-icon"
              icon-class="icon-smallpigfabujishu"
            />
            <h1>发布</h1>
          </div>
          <div class="category-box common-style">
            <p>分类:</p>
            <ul>
              <li>前端</li>
              <li>前端</li>
              <li>前端</li>
              <li>前端</li>
              <li>前端</li>
              <li>前端</li>
              <li>前端</li>
            </ul>
          </div>
          <div class="type-box common-style">
            <p>类型:</p>
            <ul>
              <li>HTML</li>
              <li>javascript</li>
              <li>前端</li>
              <li>前端</li>
              <li>前端</li>
              <li>前端</li>
              <li>前端</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IconPig from "../../components/IconSvg/IconPig.vue";
import WangEditor from "./components/WangEditor.vue";
export default {
  components: {
    WangEditor,
  },
};

IconPig;
</script>
<style lang="less" scoped>
.write-box {
  padding: 20px 0;
  .upload-cover {
    width: 1200px;
    height: 450px;
    margin: 0 auto;
    margin-bottom: 20px;
    background-color: #fff;
  }
  .title {
    width: 1200px;
    height: 80px;
    background-color: #fff;
    margin: 0 auto;
  }
  .editor-box {
    width: 1200px;
    margin: 0 auto;
    padding: 15px 0;
    display: flex;
    justify-content: space-between;
    .wang-editor-box {
      width: 830px;
      /deep/ .w-e-text-container {
        min-height: 600px;
      }
    }
    .outline-box {
      width: 300px;
      background-color: #fff;
      padding: 0 20px;
      .release-box {
        width: 100%;
        height: 300px;
        display: flex;
        padding: 30px 0;
        flex-direction: column;
        align-items: center;
        .release-btn {
          width: 110px;
          height: 110px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 1px solid #eee;
          border-radius: 50%;
          cursor: pointer;
          transition: 0.2s;
          box-shadow: 3px 3px #b9b9c2;
          &:hover {
            border: 1px solid #8585ad;
            box-shadow: 3px 3px #8585ad;
          }
          .release-icon {
            width: 50px;
            height: 50px;
            cursor: pointer;
          }
          h1 {
            color: #8585ad;
            font-size: 18px;
            margin-top: 10px;
            user-select: none;
          }
        }
        .category-box {
          display: flex;
          margin: 40px 0 20px 0;
        }
        .type-box {
          display: flex;
        }
        .common-style {
          p {
            font-size: 16px;
            font-weight: 700;
            min-width: 46px;
            user-select: none;
          }
          ul {
            display: flex;
            flex-wrap: wrap;
            user-select: none;
            li {
              border: 1px solid rgb(218, 218, 218);
              padding: 4px 8px;
              border-radius: 20px;
              margin: 0 15px 10px 0;
              cursor: pointer;
              font-size: 14px;
              user-select: none;
            }
          }
        }
      }
    }
  }
}
</style>