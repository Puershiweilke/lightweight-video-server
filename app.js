//app.js

const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const os = require('os');
const cors = require('cors');
const config = require('./config');

const app = express();

// 中间件
app.use(cors());
app.use(express.static('public')); // 前端页面

// 动态挂载配置的路径
config.mounts.forEach(mount => {
  app.use(mount.virtualPath, express.static(mount.physicalPath));
});

// 扫描视频文件
async function scanVideos() {
  let videos = [];
  for (const mount of config.mounts) {
    const files = await getFilesRecursive(mount.physicalPath);
    const videoFiles = files.filter(file => 
      config.videoExtensions.includes(path.extname(file).toLowerCase())
    );
    for (const file of videoFiles) {
      const stat = await fs.stat(file);
      videos.push({
        name: path.basename(file),
        path: file,
        url: encodeURI(
            path.join(mount.virtualPath, path.relative(mount.physicalPath, file))
              .split(path.sep)
              .join('/')
        ),
        size: stat.size,
        created: stat.birthtime
      });
    }
  }
  return videos;
}

// 递归获取目录下所有文件
async function getFilesRecursive(dir) {
  let files = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(await getFilesRecursive(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

// API: 获取视频列表（支持搜索和排序）
app.get('/api/videos', async (req, res) => {
  let videos = await scanVideos();
  const { search, sort, order = 'asc' } = req.query;
  
  // 搜索过滤
  if (search) {
    videos = videos.filter(v => 
      v.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // 排序
  if (sort) {
    videos.sort((a, b) => {
      if (order === 'asc') return a[sort] > b[sort] ? 1 : -1;
      return a[sort] < b[sort] ? 1 : -1;
    });
  }

  res.json(videos);
});

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  
  // 优先检查的物理接口名称（多系统兼容）
  const targetInterfaces = [
    'eth0', 'en0', 'en1',      // Linux/macOS
    'Wi-Fi', 'WLAN', 'Ethernet' // Windows
  ];
  
  // 需要排除的虚拟接口关键词
  const virtualKeywords = [
    'VMware', 'Virtual', 'vEthernet',
    'Loopback', 'vboxnet', 'ppp', 'tun'
  ];

  // 第一优先级：检查常见物理接口
  for (const name of targetInterfaces) {
    const addresses = interfaces[name];
    if (addresses) {
      const valid = addresses.find(iface => 
        (iface.family === 'IPv4' || iface.family === 4) && 
        !iface.internal
      );
      if (valid) return valid.address;
    }
  }

  // 第二优先级：遍历其他非虚拟接口
  for (const [name, addresses] of Object.entries(interfaces)) {
    // 排除虚拟接口
    if (virtualKeywords.some(kw => name.includes(kw))) continue;
    
    const valid = addresses.find(iface => 
      (iface.family === 'IPv4' || iface.family === 4) && 
      !iface.internal
    );
    if (valid) return valid.address;
  }

  return '0.0.0.0';
}

// 启动服务器
app.listen(config.port, '0.0.0.0', async () => {
  console.log(`服务已启动在 0.0.0.0:${config.port}`);
  const localIP = await getLocalIP();
  console.log(`Server running at:
  - Local: http://localhost:${config.port}
  - Network: http://${localIP}:${config.port}`);
});