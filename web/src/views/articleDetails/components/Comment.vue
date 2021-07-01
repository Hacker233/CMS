<template>
  <div class="bgcW p10 mt20 mb20 mt20">
    <!-- 顶部编辑框 -->
    <comment-editor @on-thumbup="omThumbup" @submit="submit"></comment-editor>
    <!-- 评论列表 -->
    <message-tree
      :data-list="commentList"
      @on-reply="onReply"
    >
    </message-tree>
  </div>
</template>

<script>
export default {
  props: {
    commentList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      dataList: [
        {
          thumbupCount: 4,
          email: "email@sina.com",
          nickname: "nickname",
          content: "message",
          createdAt: "2020-09-10 14:00:00",
          updatedAt: "2020-02-29T10:37:39.238Z",
          id: "5e59e13f961db51ad45c9ebb",
          children: [],
        },
        {
          thumbupCount: 0,
          email: "email@sina.com.cn",
          nickname: "昵称二",
          content: "这是第二个留言",
          createdAt: "2020-03-23T06:23:15.952Z",
          updatedAt: "2020-03-23T06:23:15.952Z",
          id: "5e7855d3ffbc160b9c2d3098",
          children: [
            {
              thumbupCount: 0,
              email: "email@sina.com",
              nickname: "昵称",
              content: "这是一条回复",
              parentID: "5e7855d3ffbc160b9c2d3098",
              createdAt: "2020-03-23T06:23:37.972Z",
              updatedAt: "2020-03-23T06:23:37.972Z",
              id: "5e7855e9ffbc160b9c2d3099",
              children: [
                {
                  thumbupCount: 0,
                  email: "email@sina.com",
                  nickname: "昵称1",
                  content: "这是一条@昵称的回复",
                  parentID: "5e7855e9ffbc160b9c2d3099",
                  createdAt: "2020-03-23T06:24:00.857Z",
                  updatedAt: "2020-03-23T06:24:00.857Z",
                  id: "5e785600ffbc160b9c2d309a",
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    };
  },
  methods: {
    // 点赞
    omThumbup() {},
    // 提交一级评论
    submit(content) {
      this.$emit("submit", content);
    },
    // 回复
    onReply(data) {
      debugger
      console.log(data);
    },
  },
};
</script>



