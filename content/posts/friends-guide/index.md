---
title: "友人帐使用指南：如何添加友人的博客文章"
date: 2026-10-19T10:00:00+08:00
draft: true
author: "阿K"
categories: ["使用指南"]
tags: ["Hugo", "友人帐", "博客维护"]
summary: "如何在友人帐下添加友人的博客文章。"
---
## 目录放在哪里

每篇友人文章都是一个独立的 Page Bundle（页面包），放在 `content/friends/` 下，一位友人一个文件夹：

```text
content/
└── friends/
    ├── _index.md              # 友人帐栏目的标题和简介，不是文章
    ├── zhangsan/
    │   ├── index.md           # 文章正文和 Front Matter
    │   └── feature.jpg        # 封面图（可选）
    └── aming/
        ├── index.md
        └── feature.jpg
```

文件夹名就是 URL：`content/friends/zhangsan/index.md` 会生成 `/friends/zhangsan/`。建议使用友人的英文名或昵称拼音，避免空格和中文路径。

注意：`content/friends/_index.md` 只负责栏目本身的标题和简介，**不要**把文章内容写在这里。

## 最小可用模板

新建 `content/friends/友人标识/index.md`，写入：

```yaml
---
title: "文章标题"
date: 2026-10-19T10:00:00+08:00
draft: false
author: "友人的名字"
summary: "一句话介绍这篇文章，会显示在友人帐列表里。"
tags: ["生活", "随笔"]
feature: "feature.jpg"
---

这里写正文，支持 Markdown。
```

## 字段说明

| 字段                      | 是否必填 | 作用                               |
| ------------------------- | -------- | ---------------------------------- |
| `title`                 | 必填     | 列表和详情页标题                   |
| `date`                  | 必填     | 决定排序，越新越靠前               |
| `draft`                 | 必填     | 必须是 `false`，否则线上不会构建 |
| `author`                | 建议     | 署名；不写则显示站点默认作者       |
| `authorImage`           | 可选     | 作者头像，仅在写了 `author` 时生效 |
| `summary`               | 建议     | 列表摘要；不写会自动截取正文开头   |
| `tags` / `categories` | 可选     | 参与标签、分类统计                 |
| `feature`               | 可选     | 封面图文件名，相对当前文件夹       |
| `externalUrl`           | 可选     | 文章在友人自己网站上的地址         |

## 封面图

把图片和 `index.md` 放在同一个文件夹，然后写：

```yaml
feature: "feature.jpg"
```

如果图片文件名里包含 `feature`（例如 `feature-cover.jpg`），即使不写 `feature` 字段也会自动匹配。推荐显式写出文件名，避免以后改名后封面消失。列表缩略图按 4:3 裁剪，建议使用横图。

## 为其他作者添加头像

可以。把头像图片和 `index.md` 放在**同一个文件夹**，然后在 Front Matter 里用 `authorImage` 指定文件名：

```yaml
---
title: "文章标题"
author: "阿K"
authorImage: "author.jpg"
---
```

目录结构示例：

```text
content/friends/ak/
├── index.md
├── author.jpg     # 友人头像
└── feature.jpg    # 封面图（可选）
```

显示效果与规则：

- 文章底部的作者栏会显示这张小头像（圆形，大小与站点头像一致），旁边是 `author` 里的名字。
- 只在同时写了 `author` 时生效；不写 `authorImage` 就只显示“作者 + 名字”，不会显示站点头像、简介和社交链接。
- 图片必须是该文章文件夹里的资源（Page Bundle）。如果是单独的 `content/posts/xxx.md` 而不是“文件夹 + `index.md`”，就读不到同目录图片。
- 建议使用正方形图片（例如 400×400），文件大小控制在 200 KB 以内；文件名不匹配或图片缺失时，只会显示名字，不会报错。

## 友人的文章在外站怎么办

如果友人只在自家博客发文，不想在本站复制全文，可以加 `externalUrl`：

```yaml
---
title: "友人的某篇文章"
date: 2026-10-19T10:00:00+08:00
draft: false
author: "友人名字"
summary: "文章简介"
externalUrl: "https://friend.example.com/posts/hello/"
---
```

这样友人帐列表里的标题会直接跳转到对方网站，并显示外链箭头；本站仍会生成一个详情页，正文可以只写一句简介。

## 添加友链：

- 在 content/links.md 下

## 上传文件步骤：

- 在 D:\MyBlog\my-congo-blog\content\posts 下新建文件夹，名字不重要，例如test1
- 进入test1，新建 index.md，其中内容可以参照 D:\MyBlog\my-congo-blog\content\posts下别的index.md文件
- 文章配图记得改图片名字 feature.jpg

### 本地调试：

- - 进入 D:\MyBlog\my-congo-blog>
  - 输入  hugo server -D
