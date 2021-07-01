import axiosService from "../index";
// 获取推荐列表
export const recommendedList = () => {
  return axiosService.get("/article/recommendedList");
};
// 发布文章
export const publishArticle = (data) => {
  return axiosService.post("/article/publish", data);
};
// 获取文章详情
export const getArticleInfo = (params) => {
  return axiosService.get("/article/articleInfo", { params });
};
