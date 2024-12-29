import handleNetworkError from "../utils/handleNetworkError";
/**
 * 响应成功拦截器 浏览器状态码为 2xx 时就会触发
 * @param {*} response
 * @returns
 */
export const responseSuccessInterception = (response) => {
	// 返回响应体内容
	return Promise.resolve(response.data);
};
/**
 * 响应失败拦截器
 * @param {*} error
 * @returns `{errMsg,response}` 返回错误信息和错误响应
 */
export const responseFailedInterception = (error) => {
	const { response = "请求时间不足,无法获取响应" } = error;
	// @rom:error 需要确保 response.status 不为 undefined ,否则会无法进入函数内部，导致 errMsg 为 undefined
	const errMsg = handleNetworkError(response ? response.status : null);
	return Promise.reject({ errMsg, response });
};
