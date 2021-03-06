<template>
  <div class="write-box">
    <!-- 上传封面区域 -->
    <div class="flex f-j-c f-a-c w1200 h450 ma mb20 bgcW posr upload-cover">
      <template v-if="coverImg">
        <el-image
          :src="coverImg.fileUrl"
          class="ph100 pw100 cusp cover-img"
          @mouseover="showDelCover"
        ></el-image>
        <!-- 删除图片蒙层 -->
        <div
          v-show="isShowDelCover"
          @mouseleave="notShowDelCover"
          class="del-img ph100 pw100 posa tp0 bt0 flex f-j-c f-a-c flex-clum"
        >
          <IconPig
            icon-style="dele-icon"
            icon-class="icon-smallpigshanchu1"
            @click.native="delCoverImg"
          />
        </div>
      </template>
      <template v-else>
        <el-upload
          class="upload-demo"
          :show-file-list="false"
          :limit="1"
          drag
          action="http://localhost:3000/upload"
          :multiple="false"
          :headers="headers"
          :on-success="handleCoverSuccess"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </template>
    </div>
    <!-- 标题 -->
    <div class="title">
      <el-input
        type="text"
        placeholder="请输入标题（不超过50字）"
        v-model="title"
        maxlength="50"
        show-word-limit
      >
      </el-input>
    </div>
    <!-- 内容编辑区 -->
    <div class="editor-box">
      <!-- 富文本编辑器 -->
      <wang-editor @articleContent="articleContent"></wang-editor>
      <!-- 右侧区域 -->
      <div class="outline-box">
        <div class="release-box">
          <div class="release-btn" @click="publishArticle">
            <IconPig
              icon-style="release-icon"
              icon-class="icon-smallpigfabujishu"
            />
            <h1>发布</h1>
          </div>
          <div class="category-box common-style pw100">
            <p>分类:</p>
            <ul>
              <li
                :class="[{ active: categoryName === item.category_name }]"
                v-for="(item, index) in categoryList"
                :key="index"
                @click="chooseCategory(item)"
              >
                {{ item.category_name }}
              </li>
            </ul>
          </div>
          <div class="type-box common-style pw100" v-if="types.length">
            <p>类型:</p>
            <ul>
              <li
                :class="[{ active: isActiveType(item) }]"
                v-for="(item, index) in types"
                :key="index"
                @click="chooseTypes(item)"
              >
                {{ item.type_name }}
              </li>
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
import { categoryList } from "@/service/api/category.js";
import { publishArticle } from "@/service/api/article.js";
export default {
  data() {
    return {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      coverImg: "",
      coverFilelist: [], // 封面文件列表
      isShowDelCover: false,
      title: "", // 文章标题
      content: "", // 文章内容
      categoryList: [], // 分类列表
      types: [], // 类型
      selectedTypes: [], // 选中的类型
      categoryName: "", // 选中的分类名称
    };
  },
  components: {
    WangEditor,
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化数据
    init() {
      this.getCategoryList();
    },
    // 封面上传成功回调
    handleCoverSuccess(response, fileList) {
      this.coverImg = response.data;
      this.coverFilelist = fileList;
    },
    // 显示删除图层
    showDelCover() {
      this.isShowDelCover = true;
    },
    notShowDelCover() {
      this.isShowDelCover = false;
    },
    // 删除封面图
    delCoverImg() {
      this.coverImg = "";
    },

    // 获取文章内容
    articleContent(newHtml) {
      this.content = newHtml;
    },
    // 判断类型是否选中
    isActiveType(item) {
      for (let i = 0; i < this.selectedTypes.length; i++) {
        if (item.type_id === this.selectedTypes[i].type_id) {
          return true;
        }
      }
      return false;
    },
    // 获取分类列表
    async getCategoryList() {
      const data = await categoryList();
      if (data.code === "00000") {
        this.categoryList = data.data;
      } else {
        this.$message.error(data.message);
      }
    },
    // 选择分类
    chooseCategory(item) {
      this.categoryName = item.category_name;
      this.types = item.types;
    },
    // 选择类型
    chooseTypes(item) {
      let selectedIndex = "";
      for (let i = 0; i < this.selectedTypes.length; i++) {
        if (item.type_id === this.selectedTypes[i].type_id) {
          selectedIndex = i;
        }
      }
      if (selectedIndex !== "") {
        this.selectedTypes.splice(selectedIndex, 1);
      } else {
        this.selectedTypes.push(item);
      }
    },

    // 发布文章
    async publishArticle() {
      // 判空
      if (!this.title.trim()) {
        this.$message.error("请输入文章标题");
        return;
      } else if (!this.content) {
        this.$message.error("请输入文章内容");
        return;
      } else if (!this.categoryName) {
        this.$message.error("请选择文章分类");
        return;
      } else if (!this.selectedTypes.length) {
        this.$message.error("请选择文章类型");
        return;
      }

      let params = {
        title: this.title,
        cover: this.coverImg.fileUrl,
        content: this.content,
        category: this.categoryName,
        types: this.selectedTypes,
      };
      const data = await publishArticle(params);
      if (data.code === "00000") {
        this.$message.success("发布成功");
        this.toArticleDetail(data.data);
      } else {
        this.$message.error(data.message);
      }
    },
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

IconPig;
</script>
<style lang="less" scoped>
.write-box {
  padding: 20px 0;
  .upload-cover {
    .upload-demo {
      height: 100%;
      width: 100%;
      /deep/ .el-upload {
        height: 100%;
        width: 100%;
        .el-upload-dragger {
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      }
    }
    .del-img {
      background-color: rgba(0, 0, 0, 0.5);
      .dele-icon {
        width: 50px;
        height: 50px;
        fill: #fff;
        cursor: pointer;
      }
    }
  }
  .title {
    width: 1200px;
    height: 80px;
    background-color: #fff;
    margin: 0 auto;
    /deep/ .el-input {
      height: 100%;
      .el-input__inner {
        height: 100%;
        border: none;
        font-size: 600;
        font-size: 32px;
        font-weight: 700;
        &::-webkit-input-placeholder {
          color: #121212;
          opacity: 0.5;
          font-size: 32px;
          font-weight: 600;
        }
      }
    }
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
              cursor: pointer;
            }
            .active {
              background-color: #669;
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>