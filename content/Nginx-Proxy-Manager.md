---
title: Nginx proxy manager关于获取ip-ranges.json时卡住的解决方案
draft: false
date: 2025-01-23
tags:
  - 运维
---
# 问题描述
Nginx Proxy manager 默认标准情况下启动时会尝试向[ip-ranges.amazonaws.com](https://ip-ranges.amazonaws.com/ip-ranges.json)获取ip-ranges.json。但是可能由于某种未确定的原因导致程序卡在这一步，日志如下：

	[12/3/2021] [12:48:57 AM] [IP Ranges] › ℹ  info      Fetching IP Ranges from online services...
	[12/3/2021] [12:48:57 AM] [IP Ranges] › ℹ  info      Fetching https://ip-ranges.amazonaws.com/ip-ranges.json

没有报错，但是又没有进一步的运行报告，显然是卡在这一步了。

程序虽然没有报错，由NPM反向代理的网站也可以正常运行，但是NPM的后台无法进入，显示*Bad gateway* 报错。

![[Pasted image 20250123114503.png|报错示例]]
>[!note] 图注
>Nginx Proxy Manager报错示例

# 解决方案
##  跳过ip-ranges.json获取
>[!info] 来源
该解决方案来自[Github上issue的回复](https://github.com/NginxProxyManager/nginx-proxy-manager/issues/1405#issuecomment-2376713402)

```
NPM_CTR_NAME=nginxproxymanager
docker exec $NPM_CTR_NAME sed -i 's/\.then(internalIpRanges\.fetch)//g' /app/index.js
docker restart $NPM_CTR_NAME
```
## 更改DNS
>[!info] 来源
>该方案来自[关于部署nginx proxy manager 反向代理 bad gateway 错误的提示 - Halo 社区](https://bbs.halo.run/d/6306-%E5%85%B3%E4%BA%8E%E9%83%A8%E7%BD%B2nginx-proxy-manager-%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86-bad-gateway-%E9%94%99%E8%AF%AF%E7%9A%84%E6%8F%90%E7%A4%BA)

>[!quote]
>建议在官方文档 给出相应提示，部署在阿里云、腾讯云等国内云，建议使用自定义DNS，如google dns。
>
>实际docker部署测试 nginx proxy manager 容器启动时去会访问一个亚马逊的IP库，[https://ip-ranges.amazonaws.com/ip-ranges.json](https://ip-ranges.amazonaws.com/ip-ranges.json)，这个ip在国内云主机dns中被屏蔽了，导致 bad gateway错误，无论新装升级或更换各种版本总是大概率出现，更改为google dns 故障解除。

---
# 版权页
<p xmlns:cc="http://creativecommons.org/ns#" >This work is licensed under <a href="https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://www.arenadruid.top/attachments/cc.svg" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://www.arenadruid.top/attachments/by.svg" alt=""></a></p>