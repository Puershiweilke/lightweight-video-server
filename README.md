# lightweight-video-server
# 🎬 轻量级私人视频服务站

[![GitHub License](https://img.shields.io/github/license/Puershiweilke/lightweight-video-server)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0-blue)](https://nodejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](.github/CONTRIBUTING.md)

大白话版：  
这是个什么项目？​​ 
就是一个能让你在自家电脑上搭个私人视频网站的小工具，相当于给你的电影库做个网页版目录。不需要搞数据库那些复杂的玩意，解压就能用。 
​​干什么用的？​​ 
家里电视/手机/平板想看自己存的电影，不用拿U盘拷来拷去  
办公室想共享培训视频，不开某度网盘会员也能快速访问  
放在老电脑或树莓派上当简易家庭影院  

正式： 
专为个人媒体库设计的轻量化视频服务解决方案，无需数据库，开箱即用  

[📚 完整文档](/docs) | [💻 开发指南](.github/CONTRIBUTING.md)

![界面截图](/docs/screenshot.jpg)

## ✨ 核心特性

- ​**​隐私优先​**​：数据本地存储，零第三方依赖
- ​**​极简部署​**​：单文件配置，5分钟快速搭建
- ​**​智能识别​**​：自动扫描多存储路径的视频文件
- ​**​跨端适配​**​：完美支持PC/手机/平板访问
- ​**​性能优异​**​：树莓派4B 可流畅运行

## 🚀 快速开始


```bash
# 克隆项目
git clone https://github.com/Puershiweilke/lightweight-video-server.git

# 安装依赖
npm install

# 复制配置模板
cp config.js.example config.js

# 启动服务 (开发模式)
npm run dev

# 生产环境启动
node app.js 
# 或
npm start
```

### Docker 部署
```bash
docker run -d \
  -p 3000:3000 \
  -v /your/media/path:/data \
  -v ./config.js:/app/config.js \
  Puershiweilke/lightweight-video-server
```

## ⚙ 配置示例
```javascript
// config.js
module.exports = {
  port: 3000, // 服务端口
  mounts: [
    {
      virtualPath: "/movies",   // 网页访问路径
      physicalPath: "/data/movies" // 实际存储路径
    }
  ],
  videoExtensions: [".mp4", ".mkv", ".mov"] // 支持格式
};
```

## 🌐 使用场景

- 🏠 家庭媒体中心
- 🎥 影视工作室素材管理
- 📽️ 教学视频资源库
- 🚗 车载娱乐系统

## 📚 文档目录

- [API 接口说明](/docs/API_REFERENCE.md)
- [安全部署指南](/docs/SECURITY.md)
- [性能优化技巧](/docs/OPTIMIZATION.md)
- [插件开发手册](/docs/PLUGIN_DEV.md)

## 🤝 参与贡献

欢迎提交 Issue 和 PR！请先阅读：
- [贡献者公约](.github/CONTRIBUTING.md)
- [行为准则](.github/CODE_OF_CONDUCT.md)

## 📜 许可协议

[MIT License](LICENSE) © 2023 Puershiweilke
