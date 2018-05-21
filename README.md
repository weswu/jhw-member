# jhw-management-platform
> [机汇网后台管理](http://www.jihui88.com/member_new/index.html#/)（v4.0）

## 软件架构
- VUE全家桶(vue vue-router vuex)
- [axios](https://github.com/axios/axios) ajax类
- [iview](http://v1.iviewui.com/docs/guide/install) 基于Vux的UI框架
- [阿里图标](http://iconfont.cn/)
- [sortablejs] 拖拉组件
- [vue-clipboard2] 复制


## 安装教程
```
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## 使用说明
`master`主分支
`dev`开发分支

#### 参与开发
1. Fork 本项目
2. 新建分支：git checkout -b name dev
3. 在dev下合并分支：git merge --no-ff name
4. 提交代码：git add . -> git commit -m wxw -> git push
6. 分支拉取：git pull / git fetch origin dev:jhw -> git merge jhw
7. 合并失败：git stash -> git merge jhw -> git stash pop


#### 测试远程接口
1.安装nginx  conf/nginx.conf 添加以下内容
```
upstream  m2.jihui88.com {
	server   127.0.0.1:8080;
}
server {
        listen       80;
        server_name m2.jihui88.com;
	 error_page  404              http://www.jihui88.com/404.html;

        location / {
	    proxy_pass http://localhost:8080/;
        }

    	location ^~ /rest/api/ {
            proxy_pass http://www.jihui88.com;
            proxy_set_header Host $http_host;  # 把host头传过去，后端服务程序将收到your.domain.name，否则收到的是localhost:8080
	    #proxy_set_header  X-Real-IP  $remote_addr;
            proxy_cookie_path /rest/api /rest/api;   # 把cookie中的path部分从/api替换成/service
            proxy_cookie_domain www.jihui88.com m2.jihui88.com; # 把cookie的path部分从localhost:8080替换成your.domain.name
    	}

	#配置所有不带.的请求
	location ~ ^[^.]*$
        {
	      proxy_pass  http://m2.jihui88.com;
	      proxy_set_header X-Real-IP $remote_addr;

        }
	#配置action请求
	location ~ \.action$
        {
              proxy_pass  http://m2.jihui88.com;
	      proxy_set_header X-Real-IP $remote_addr;

        }

	#配置jsp请求
	location ~ \.jsp$
        {
              proxy_pass http://m2.jihui88.com;
	      proxy_set_header X-Real-IP $remote_addr;

        }
}
```
2.hosts文件内   添加域名
127.0.0.1 m2.jihui88.com




#### 码云特技
1. 使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2. 码云官方博客 [blog.gitee.com](https://blog.gitee.com)
3. 你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解码云上的优秀开源项目
4. [GVP](https://gitee.com/gvp) 全称是码云最有价值开源项目，是码云综合评定出的优秀开源项目
5. 码云官方提供的使用手册 [http://git.mydoc.io/](http://git.mydoc.io/)
6. 码云封面人物是一档用来展示码云会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)
