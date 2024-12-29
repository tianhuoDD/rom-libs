import axiosInstance from "../../axios/index";
// 定义 HTTP 方法

const get = (url, config = {}) => axiosInstance.get(url, config);
const post = (url, data, config = {}) => axiosInstance.post(url, data, config);
const put = (url, data, config = {}) => axiosInstance.put(url, data, config);
const del = (url, config = {}) => axiosInstance.delete(url, config);

export { get, post, put, del };
