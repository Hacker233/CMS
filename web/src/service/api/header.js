import axiosService from "../index";
// 注册用户
export const menuList = () => {
  return axiosService.get("/menu");
};
