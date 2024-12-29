/* https://jackchoumine.github.io/web/js/%E5%B0%81%E8%A3%85axios.html 
restful api
*/
import axios from "axios";
import { merge } from "lodash";
import { requestInterception } from "./interceptors/request";
import { responseSuccessInterception, responseFailedInterception } from "./interceptors/response";
// 初始化实例
const axiosInstance = axios.create({
	withCredentials: true, // 允许跨域
	// 设置为 json 请求
	headers: {
		"content-type": "application/json;charset=UTF-8",
	},
	baseURL: "/api",
	timeout: 10000,
});

// 使用请求拦截器
axiosInstance.interceptors.request.use(requestInterception);
// 使用响应拦截器
axiosInstance.interceptors.response.use(responseSuccessInterception, responseFailedInterception);

/**
 * 覆盖 Axios 实例的配置
 * @param {Object} config 用户自定义配置
 */
const initAxios = (config = {}) => {
	// 使用 lodash 处理深层嵌套对象
	merge(axiosInstance.defaults, config);
	return axiosInstance;
};
/**
 * 添加响应拦截器 (用户使用时是先执行预设的，再执行用户自定义的)
 * @param {Function} onFulfilled 处理成功响应的函数
 * @param {Function} onRejected 处理失败响应的函数
 * @returns {Number} 拦截器 ID
 */
const addResponseInterceptor = (onFulfilled, onRejected) => {
	return axiosInstance.interceptors.response.use(onFulfilled, onRejected);
};

/**
 * 添加请求拦截器 (用户使用时是先执行预设的，再执行用户自定义的)
 * @param {Function} onFulfilled 处理请求成功的函数
 * @param {Function} onRejected 处理请求失败的函数
 * @returns {Number} 拦截器 ID
 */
const addRequestInterceptor = (onFulfilled, onRejected) => {
	return axiosInstance.interceptors.request.use(onFulfilled, onRejected);
};
export { initAxios, addResponseInterceptor, addRequestInterceptor };
export default axiosInstance;
