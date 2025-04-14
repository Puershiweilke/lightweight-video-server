module.exports = {
  port: 3000,
  mounts: [
    {
      physicalPath: "D:/BaiduNetdiskDownload/yejiang", // 替换为你的绝对路径
      virtualPath: "/videos0"
    },
    {
      physicalPath: "C:/Users/xio_z/Downloads", // 替换为你的绝对路径
      virtualPath: "/videos1" 
    },
    {
      physicalPath: "G:/个人信息/新建文件夹", // 替换为你的绝对路径
      virtualPath: "/videos2" 
    },
    {
      physicalPath: "D:/entertain/steamapps/workshop/content/431960", // 替换为你的绝对路径
      virtualPath: "/videos3" 
    }
    // 可添加更多路径...
  ],
  videoExtensions: [".mp4", ".mkv", ".avi", ".mov"] // 支持的视频格式
};