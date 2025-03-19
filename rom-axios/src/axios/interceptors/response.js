import handleNetworkError from "../utils/handleNetworkError";
import { removePendingRequest } from "../utils/pendingRequest";
/**
 * 响应拦截器：移除请求记录
 */
export const responseSuccessInterception = (response) => {
	removePendingRequest(response.config);
	return Promise.resolve(response.data);
};

/**
 * 响应失败拦截器
 */
export const responseFailedInterception = (error) => {
	if (error.config) {
		removePendingRequest(error.config); // 请求失败也要移除
	}
	const { response = "请求时间不足,无法获取响应" } = error;
	const errMsg = handleNetworkError(response ? response.status : null);
	return Promise.reject({ errMsg, response });
};
