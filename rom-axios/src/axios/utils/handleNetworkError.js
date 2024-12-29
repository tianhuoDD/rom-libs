// 定义处理网络错误的函数
const handleNetworkError = (code) => {
	let errMsg = "未知错误";
	if (code) {
		// src/utils/handleNetworkError.js
		const errorMessages = {
			400: "参数不正确",
			401: "未授权，请重新登录",
			403: "拒绝访问",
			404: "请求地址出错",
			405: "请求方法未允许",
			408: "请求超时",
			500: "服务器端出错",
			501: "网络未实现",
			502: "网络错误",
			503: "服务不可用",
			504: "网络超时",
			505: "HTTP版本不支持该请求",
		};
		errMsg = errorMessages[code] || `其他连接错误 --${code}`;
	} else {
		errMsg = "无法访问服务器";
	}
	return errMsg;
};
export default handleNetworkError;
