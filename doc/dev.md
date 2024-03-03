# 开发流程文档

## 个人开发流程

- git checkout dev-xxx 切换到自己的分支 (未创建则加上`-b`参数)
- git pull origin dev-xxx 若曾提交过则先拉取最新代码
- 进行编辑
- git add 添加修改
- git commit -m "提交信息" 提交修改 (提交信息务必写清内容概要, 各个功能commit分开)
- git push origin dev-xxx 提交到远程仓库
- 如有必要提醒负责人review代码
