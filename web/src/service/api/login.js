import axiosService from "./axios-request";
// 下面是POST形式
export const userLogin = data => {
    return axiosService({
        url: "/login",
        method: "post",
        data
    });
};

// 下面是GET形式
export const userInfo = params => {
    return axiosService({
        url: "/xxxx/user/xxxx", // 根据实际接口地址来写
        method: "get",
        params
    });
};