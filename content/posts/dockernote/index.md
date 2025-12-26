---
title: "Docker Learn"
date: 2025-12-20 12:00:00
draft: false
author: "ZdeEcf"
categories: ["笔记"]
tags: ["笔记", "Docker"]
featureImage: "./feature.jpg"
summary: "Learning of Docker"
---

# Docker Learn
对 https://www.bilibili.com/video/BV1THKyzBER6/?spm_id_from=333.337.search-card.all.click 的学习笔记

## 基础概念

1. 镜像（Image）：类似于安装包。它是一个轻量级、独立的可执行软件包，包含运行软件所需的一切。

2. 容器（Container）：类似于从镜像创建的运行应用实例。容器是隔离的，但共享主机的内核。

3. 仓库（Repository）：镜像的集合，通常托管在 Docker Hub 等平台上。

4. Dockerfile：构建镜像的蓝图，类似于安装包的设计图纸。

5. Docker 本身：只要容器处于运行状态，并且镜像包含 Shell 解释器（如 /bin/sh 或 /bin/bash），就可以使用 docker exec 进入其中，像操作系统一样与之交互。

## Image 镜像

镜像是 Docker 的基础。以下是如何操作它们。

1. 下载镜像：从仓库拉取。
   - 命令：`docker pull docker.io/library/nginx:latest`
   - 解释：（仓库 URL / 作者 / 镜像名称 : 版本）。官方镜像可以省略仓库和作者；latest 可以省略如果它是默认的。

2. 构建镜像：从当前目录的 Dockerfile 创建。
   - 命令：`docker build -t 镜像名称 .`

3. 列出镜像：查看本地可用镜像。
   - 命令：`docker images`

4. 删除镜像：清理未使用的镜像。
   - 命令：`docker rmi ID/镜像名称`

## Container 容器

1. 运行容器：从镜像启动容器。
   - 基本命令：`docker run nginx`（随机分配容器名称）。
   - 选项（可以任意顺序组合）：
     - `-d`：后台运行（分离模式）。示例：`docker run -d nginx`。
     - `--name`：分配自定义名称。示例：`docker run --name my-nginx nginx`。
     - `-p`：端口映射（主机:容器）。示例：`docker run -p 80:80 nginx`（将主机端口 80 映射到容器的 80）。
     - `-v`：卷挂载，用于数据持久化。
       - 绑定挂载：`docker run -v /web/html:/usr/share/nginx/html nginx`（初始化时主机目录覆盖容器目录）。
       - 命名卷：`docker run -v nginx_html:/usr/share/nginx/html nginx`（初始化时容器目录覆盖卷）。
         - 创建卷：`docker volume create nginx_html`。
         - 检查：`docker volume inspect nginx_html`。
     - `-e`：设置环境变量。示例：`docker run -e MONGO_INITDB_ROOT_USERNAME=admin mongo`。
     - `-it`：交互模式带终端。示例：`docker run -it alpine`。
     - `--rm`：停止时自动删除。示例：`docker run -it --rm alpine`。
     - `--restart`：自动重启策略。
       - `always`：任何停止时重启。示例：`docker run --restart always nginx`。
       - `unless-stopped`：除手动停止外重启。

2. 列出容器：
   - 运行中：`docker ps`。
   - 所有：`docker ps -a`。

3. 删除容器：
   - `docker rm ID/容器名称`。
   - 强制：`docker rm -f ID/容器名称`。

## 调试容器

1. 停止容器：`docker stop ID/容器名称`。

2. 启动容器：`docker start ID/容器名称`（保留先前配置）。

3. 检查细节：`docker inspect ID/容器名称`。

4. 创建但不运行：`docker create 镜像名称`。

5. 查看日志：`docker logs ID/容器名称 -f`（实时跟随模式）。

6. 进入容器：`docker exec -it ID/容器名称 /bin/sh`（或 /bin/bash）。

7. 退出：输入 `exit`。

## Dockerfile

Dockerfile 允许自动化镜像创建。

```dockerfile
FROM python:3.13-slim
# 基础镜像

WORKDIR /app
# 设置工作目录

COPY . .
# 复制当前目录文件到容器工作目录

RUN pip install -r requirements.txt
# 安装依赖

EXPOSE 8000
# 声明端口（信息性；运行时仍需 -p）

CMD ["python3", "main.py"]
# 容器启动时的默认命令
```

- 构建：`docker build -t 镜像名称 .`。
- 推送到仓库：
  - 登录：`docker login`。
  - 带标签构建：`docker build -t 用户名/镜像名称 .`。
  - 推送：`docker push 用户名/镜像名称`。

## 容器网络（待补充）

Docker 提供几种网络模式。

1. 桥接（Bridge，默认）：每个容器分配虚拟 IP；通过主机的 docker0 桥通信。最常用。

2. 主机（Host）：共享主机的网络栈（IP/端口）。性能最高，无隔离。

3. 无（None）：仅隔离环回；无外部网络。安全性最高。

4. 自定义桥接：
   - 创建：`docker network create my-net`。
   - 运行：`docker run --network my-net ...`。
   - 优势：同一网络中的容器可以通过名称互相访问（内置 DNS）。

## Docker Compose

对于多容器应用，Docker Compose 简化了编排。在 docker-compose.yaml 文件中定义服务。

![1](1.png)
```yaml
# 示例 docker-compose.yaml
version: '3'
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

- 启动：`docker compose up -d`（创建并在分离模式运行；自动联网）。
- 停止并删除：`docker compose down`。
- 停止：`docker compose stop`。
- 启动：`docker compose start`。

