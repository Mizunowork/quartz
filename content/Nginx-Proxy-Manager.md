---
title: Nginx proxy manager关于获取ip-ranges.json时卡住的解决方案
draft: false
date: 2025-01-23
---
# 问题描述
Nginx Proxy manager 默认标准情况下启动时会尝试向[ip-ranges.amazonaws.com](https://ip-ranges.amazonaws.com/ip-ranges.json)获取ip-ranges.json。但是可能由于某种未确定的原因导致程序卡在这一步，日志如下：

	[12/3/2021] [12:48:57 AM] [IP Ranges] › ℹ  info      Fetching IP Ranges from online services...
	[12/3/2021] [12:48:57 AM] [IP Ranges] › ℹ  info      Fetching https://ip-ranges.amazonaws.com/ip-ranges.json

没有报错，但是又没有进一步的运行报告，显然是卡在这一步了。

程序虽然没有报错，由NPM反向代理的网站也可以正常运行，但是NPM的后台无法进入，显示*Bad gateway* 报错。

![[Pasted image 20250123114503.png|报错示例]]
*Nginx Proxy Manager报错示例*

# 解决方案
解决方案来自[Github上issue的回复](https://github.com/NginxProxyManager/nginx-proxy-manager/issues/1405#issuecomment-2376713402)

```
NPM_CTR_NAME=nginxproxymanager
docker exec $NPM_CTR_NAME sed -i 's/\.then(internalIpRanges\.fetch)//g' /app/index.js
docker restart $NPM_CTR_NAME
```
