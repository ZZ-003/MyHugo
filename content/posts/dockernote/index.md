---
title: "Docker Learn"
date: 2025-12-20 12:00:00
draft: false
author: "ZdeEcf"
categories: ["笔记"]
tags: ["笔记" , "Docker"]
featureImage: "./feature.jpg" 
summary: "Learning of Docker"
---

## Docker 入门笔记

> 本笔记基于 B站 [Docker 入门教程](https://www.bilibili.com/video/BV1THKyzBER6/) 整理。

---

### 一、 核心概念

* **Image (镜像)**：类比为软件安装包。
* **Container (容器)**：类比为已安装并运行的 App。
* **Repository (仓库)**：镜像集。
* **Dockerfile**：镜像的图纸，类比安装包的设计图纸。
* **交互原理**：只要容器处于运行状态且包含 Shell 解析器，即可使用 `docker exec` 进入其中。

---

### 二、 Image 镜像操作

#### 1. 下载镜像
```bash
docker pull docker.io/library/nginx:latest

```

* **格式**：`仓库地址 / 作者名 / 镜像名 : 版本`
* **说明**：官方镜像可省略地址和作者；版本为 `latest` 时可省略。

#### 2. 构建与管理

* **从 Dockerfile 构建**：
```bash
docker build -t 镜像名 .

```


* **列出所有镜像**：
```bash
docker images

```


* **删除镜像**：
```bash
docker rmi ID/镜像名

```



---

### 三、 Container 容器操作

#### 1. 运行容器

```bash
docker run [可选参数] 镜像名

```

**常用可选参数（无先后顺序，但必须在镜像名前）：**

| 参数 | 说明 | 示例 |
| --- | --- | --- |
| `-d` | 后台运行 | `docker run -d nginx` |
| `--name` | 指定容器名 | `docker run --name my-nginx nginx` |
| `-p` | 端口映射 (宿主机:容器) | `docker run -p 80:80 nginx` |
| `-v` | 挂载卷/目录绑定 | `docker run -v /web/html:/usr/share/nginx/html nginx` |
| `-e` | 设置环境变量 | `docker run -e MONGO_INITDB_ROOT_USERNAME=admin mongo` |
| `-it` | 交互模式运行 | `docker run -it alpine sh` |
| `--rm` | 容器停止后自动删除 | `docker run --rm alpine` |
| `--restart` | 重启策略 | `always` 或 `unless-stopped` |

> **注意：** 使用 `-v` 绑定主机目录时，主机文件会覆盖容器文件；使用“命名卷”时，容器初始文件会同步到卷中。

---

### 四、 调试与运维

* **查看状态**：
* `docker ps`：查看运行中容器。
* `docker ps -a`：查看所有容器（含已停止）。


* **启停控制**：
* `docker stop/start <ID/名称>`


* **查看容器信息**：
* `docker inspect <ID/名称>`


* **查看日志**：
```bash
docker logs -f <ID/名称>

```


* **进入容器内部**：
```bash
docker exec -it <ID/名称> /bin/sh

```



---

### 五、 Dockerfile 规范

```dockerfile
# 1. 选择基础镜像
FROM python:3.13-slim

# 2. 设置容器内工作目录
WORKDIR /app

# 3. 拷贝当前目录下的所有文件到容器
COPY . .

# 4. 安装依赖
RUN pip install -r requirement.txt

# 5. 声明端口（仅文档作用）
EXPOSE 8000

# 6. 容器启动时默认执行的命令
CMD ["python3", "main.py"]

```

---

### 六、 容器网络

1. **Bridge (桥接，默认)**：每个容器分配虚拟 IP，通过宿主机网桥通信。
2. **Host (主机)**：容器直接使用宿主机的网络栈。
3. **None (禁用)**：容器只有 loopback，不与外部联网。
4. **Custom Bridge (自定义网桥)**：
* 创建：`docker network create my-net`
* 运行：`docker run --network my-net ...`
* **优势**：容器间可通过 **容器名** 直接通信。

---

### 七、 Docker Compose

用于定义和运行多容器应用。

* **启动服务**：`docker compose up -d`
* **停止并删除**：`docker compose down`
* **停止服务**：`docker compose stop`
* **启动服务**：`docker compose start`

**docker-compose.yaml 示例：**

```yaml
services:
  web:
    image: nginx
    ports:
      - "80:80"
  db:
    image: mongo
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin

```
