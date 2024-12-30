import { get, post, put, del, requestJson, requestForm } from "./src/apis/index";
import { initAxios, addResponseInterceptor, addRequestInterceptor } from "./src/axios/index";
/**
 * import romAxios from "@rom/axios";
 * romAxios.requestJson(romAxios.get, '/current-user', data);
 */
export default {
	initAxios, // 用户可以覆盖 axios 配置

	addResponseInterceptor, // 添加响应拦截器
	addRequestInterceptor, // 添加请求拦截器

	get,
	post,
	put,
	del,

	requestJson,
	requestForm,
};
