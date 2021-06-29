import axiosService from "../index";
// 获取推荐列表
export const recommendedList = () => {
  return axiosService.get("/article/recommendedList");
};
