# 安全部署指南

## 基础防护
1. 不要使用默认端口 3000
2. 定期更新依赖包 `npm audit fix`
3. 配置反向代理（Nginx/Apache）

## 访问控制
```nginx
# Nginx 示例配置
location / {
  satisfy any;
  allow 192.168.1.0/24;  # 局域网访问
  allow 127.0.0.1;       # 本机访问
  deny all;               # 拒绝其他IP
  auth_basic "Private";   # 基础认证
  auth_basic_user_file /etc/nginx/.htpasswd;
}
安全建议
使用 HTTPS 加密通信
定期备份 config.js
启用文件系统审计

---
