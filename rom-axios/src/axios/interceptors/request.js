import { addPendingRequest, removePendingRequest } from "../utils/pendingRequest";

/**
 * 请求拦截器：添加 token，处理重复请求
 */
export const requestInterception = (config) => {
	removePendingRequest(config); // 先移除已有请求，避免短时间内重复请求
	addPendingRequest(config); // 添加新请求

	const token = localStorage.getItem("token") || "";
	if (token) {
		config.headers.Authorization = "Bearer " + token;
	}
	return config;
};
