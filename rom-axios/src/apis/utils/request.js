import { get, del } from "./http";
import qs from "qs";
/**
 * 处理 JSON 请求
 * @param {Function} method - HTTP 方法函数（get, post, put, del）
 * @param {string} url - 请求的 URL
 * @param {Object} data - 请求数据
 * @param {Object} options - 额外的 Axios 配置选项
 * @returns {Promise} - Axios 响应 Promise
 */
const requestJson = (method, url, data = null, options = {}) => {
	// 固定的请求头
	const config = {
		headers: {
			"Content-Type": "application/json;charset=UTF-8",
		},
		...options, // 合并额外的配置
	};

	if (method === get || method === del) {
		// 对于 GET 和 DELETE 请求，data 应该作为 params 传递
		config.params = data;
		return method(url, config);
	} else {
		// 对于 POST 和 PUT 请求，data 作为请求体传递
		return method(url, data, config);
	}
};
/**
 * 处理表单数据请求
 * @param {Function} method - HTTP 方法函数（post, put）
 * @param {string} url - 请求的 URL
 * @param {Object|FormData} data - 请求数据
 * @param {Object} options - 额外的 Axios 配置选项
 * @returns {Promise} - Axios 响应 Promise
 */
const requestForm = (method, url, data = {}, options = {}) => {
	let formData;
	let headers = {};

	// 检查数据是否包含文件
	const hasFile = Object.values(data).some((value) => value instanceof File || value instanceof Blob);

	if (hasFile) {
		// 使用 FormData 处理包含文件的表单
		formData = new FormData();
		Object.entries(data).forEach(([key, value]) => {
			formData.append(key, value);
		});
		// `multipart/form-data` 需要浏览器自动设置 `Content-Type`，包括 boundary
		// 因此不需要手动设置
	} else {
		// 使用 application/x-www-form-urlencoded 处理普通表单
		formData = qs.stringify(data);
		headers["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
	}

	// 合并额外的配置
	const config = {
		headers: {
			...headers,
			...options.headers,
		},
		...options,
	};

	return method(url, formData, config);
};

export { requestJson, requestForm };
