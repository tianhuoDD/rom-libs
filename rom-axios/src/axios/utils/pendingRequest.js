import axios from "axios";

const pendingRequests = new Map(); // 记录请求
/**
 * 生成请求的唯一标识
 */
export const generateRequestKey = (config) => {
	const { method, url, params, data } = config;
	return `${method}&${url}&${JSON.stringify(params)}&${JSON.stringify(data)}`;
};

/**
 * 添加请求到 Map 中
 */
export const addPendingRequest = (config) => {
	const requestKey = generateRequestKey(config);

	if (pendingRequests.has(requestKey)) {
		config.cancelToken = new axios.CancelToken((cancel) => cancel("请求重复，被取消"));
	} else {
		config.cancelToken =
			config.cancelToken ||
			new axios.CancelToken((cancel) => {
				pendingRequests.set(requestKey, cancel);
			});
	}
};

/**
 * 移除已完成的请求
 */
export const removePendingRequest = (config) => {
	const requestKey = generateRequestKey(config);
	if (pendingRequests.has(requestKey)) {
		const cancel = pendingRequests.get(requestKey);
		cancel(requestKey); // 取消请求
		pendingRequests.delete(requestKey);
	}
};
