import axiosService from "../index";
// 登录
export const userLogin = (data) => {
  return axiosService.post("/user/login", data);
};

// 注册用户
export const userRegister = (data) => {
  return axiosService.post("/user/register", data);
};
// 下面是GET形式
export const userInfo = (params) => {
  return axiosService({
    url: "/xxxx/user/xxxx", // 根据实际接口地址来写
    method: "get",
    params,
  });
};
