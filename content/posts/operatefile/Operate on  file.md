---
title: "对文件处理的记录"
date: 2025-12-20 12:00:00
draft: false
author: "ZdeEcf"
categories: ["笔记"]
tags: ["笔记" , "文件处理"]
featureImage: "./feature.jpg" 
summary: "文件处理"
---

## 文件处理

```python
from pathlib import Path

def check_docker(root_path_str):
    root_path = Path(root_path_str) # 转化成 Path 变量，即可检查是否存在、是否是文件夹等
    # root_path_str: ./test_2000
    # root_path: test_2000

    dont_have = []
    for item in root_path.iterdir():  # item 遍历 root_path下的 子目录 和 子文件
        # item: 子文件（夹）路径，test_2000\0 以及 test_2000\test_results.log 等
        # item.name: 子文件（夹）名 ，0 以及 test_results.log 等

        if item.is_dir():
            shfile = item / f"startup_docker_{item.name}.sh"  # 拼接子目录下的脚本文件
            # shfile: test_2000\0\startup_docker_0.sh 等

            if shfile.exists() and shfile.is_file():
                shfile.unlink(missing_ok=True)
            else:
                dont_have.append(shfile.name)

    print(len(dont_have))
    
if __name__ == "__main__":
    target_dir = "./test_2000"
    check_docker(target_dir)
```

