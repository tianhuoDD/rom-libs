/**
 * 配置axios请求拦截器
 * @desc 默认设置：从 `localstorage` 中获取字段 `token` ,向请求头的 `Authorization` 字段添加该 `token`
 */

export const requestInterception = (config) => {
	// 设置token
	const token = localStorage.getItem("token") || "";
	if (token) {
		// 将 Authorization 字段设为token
		config.headers.Authorization = "Bearer " + token;
	}
	return config;
};
