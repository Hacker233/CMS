import axiosService from "../index";
// 获取分类列表
export const categoryList = () => {
  return axiosService.get("/category/categoryList");
};
