# 开发流程文档

## 个人开发流程

- git checkout dev-xxx 切换到自己的分支 (未创建则加上`-b`参数)
- git pull origin dev-xxx 若曾提交过则先拉取最新代码
- 进行编辑
- git add 添加修改
- git commit -m "提交信息" 提交修改 (提交信息务必写清内容概要, 各个功能commit分开)
- git push origin dev-xxx 提交到远程仓库 (首次提交需要添加`--set-upstream`参数)
- 如有必要提醒负责人review代码

## 团队开发流程

- git fetch origin dev-other 拉取其他人的分支(已拉取则跳过)
- git checkout -b dev-native-other origin/dev-other 创建本地分支(已创建则跳过)
- git pull origin dev-other 拉取最新代码
- 进行测试或修改
- git add commit
- git push origin dev-other (如有修改)提交到远程仓库

merge暂定为网页操作
