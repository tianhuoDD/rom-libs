## Rom-Axios 说明

> 该工具是基于 Axios 二次封装的网络请求工具

### 已完成的功能

1. romAxios.`initAxios({})`: 可以初始化 axios
2. romAxios.`addResponseInterceptor((data)=>{},({errMsg,response})=>{})`/`addRequestInterceptor((config)=>{})`: 添加响应或请求拦截器
3. romAxios.`get`/`post`/`put`/`del`: 请求方法
4. romAxios.`requestJson`/`requestForm`: 请求格式

### 使用方法

```js
/* request.js */
import romAxios from "@rom/axios";
import { ElMessage } from "element-plus";
romAxios.initAxios({
	baseURL: "/api",
	timeout: 3000,
});
romAxios.addResponseInterceptor(
	(data) => {
		return Promise.resolve(data);
	},
	({ errMsg, response }) => {
		ElMessage.error(errMsg);
		console.error("错误的response：", response);
	},
);
export default romAxios;
```

```js
import romAxios from "../request.js";
export const loginApi = async (data) => {
	const res = await romAxios.requestJson(romAxios.post, "/admin/user/login", data);
	return res; // 由于成功拦截器返回的是 response.data，这里 res 是 response.data
};
```

# 对于@Rom/axios的展望

1. 期望 请求取消 的实现，防止多次发送重复请求 —— 防抖
2. 期望用户只在api层处理逻辑，页面中只负责展示(为防止后端的数据与前端不对应，应该在api层进行映射)
