# API 接口文档

## 获取视频列表
`GET /api/videos`

### 参数
| 参数名 | 类型   | 说明                 |
|--------|--------|----------------------|
| search | string | 关键词搜索（可选）   |
| sort   | string | 排序字段(created/size)|
| order  | string | 排序方向(asc/desc)   |

### 响应示例
```json
[
  {
    "name": "movie-sample.mp4",
    "size": 104857600,
    "created": "2023-08-15T08:30:00.000Z",
    "url": "/movies/action%20film.mp4",
    "duration": 7200
  }
]
