---
date : '2024-12-20T17:23:40+08:00'
draft : false
title : 'Linux Note'
featureImage : "feature.jpg" 
categories : ["Linux"]
tags : ["笔记", "Linux"]
summary : "一些对Linux指令的使用记录"
---

## Linux指令

### 1. 创建

#### 1.1 文件

```bash
# 创建一个 file.txt 文件
$ touch file.txt
```

#### 1.2（空）目录

```bash
# 创建一个名为 newdir 的空目录
$ mkdir newdir 

# 递归创建 pardir childdir 的多级空目录
$ mkdir -p pardir/childdir
```

------



### 2. 编辑 文件

```bash
$ nano file.txt
# 对于多行文件可以之间滚动鼠标
# ctrl + O ：保存修改，然后确认文件名
# 			 此时若写入别的文件名，则会跳转到对应文件，若没有则创建，若有，则覆盖
# ctrl + X ：退出
```

------



### 3. 删除文件

#### 3.1 删除文件

```bash
$ rm file.txt
```

#### 3.2 递归删除目录

```bash
$ rm -r pardir
# 强制删除，不会询问
```

#### 3.3 删除空目录

```bash
$ rmdir newdir
```

------



### 4. 复制

#### 4.1 复制文件

```bash
$ cp file.txt new_file.txt

$ cp file.txt /tmp/test/ 

$ cp /tmp/test/file.txt new_file.txt

```

#### 复制目录

```bash
$ cp -r ./newdir ./1111/
```

------



### 5. 移动

#### 5.1 移动文件/目录

```bash
# 将 file.txt 移动到 当前目录下的 111 文件夹里
$ mv file.txt ./111/

# 将当前目录下的 111 文件夹，移动到当前目录下的 222 文件夹里
$ mv ./111 ./222/
```

------



### 6. 显示 文件 内容

```bash
# 显示整个文件内容
$ cat file.txt

# 显示前十行内容
$ head file.txt

# 显示末十行内容
$ tail file.txt
```

------



### 7. 搜索

#### 7.1 搜索文件/目录

```bash
# 在 /home 路径下查找所有 .txt 文件
$ find /home -name "*.txt"

# 在 log.txt 文件中查找包含 error 的行
$ grep "error" log.txt
```

------



### 8. 压缩和解压

#### 8.1 压缩文件和文件夹

```bash
$ tar -czvf file_copy.tar.gz file.txt

$ tar -czvf file_copy.tar.gz ./file
```

#### 8.2 解压文件和文件夹

```bash
$ tar -xzvf file_copy.tar.gz
$ tar -xzvf file_copy.tar.gz -C ./333

# 解压后是 file.txt ，文件名和压缩包名没关系
# 若有同名文件，解压后会覆盖
```

