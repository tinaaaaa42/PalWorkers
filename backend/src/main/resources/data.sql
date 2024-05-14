use palworkers;

INSERT INTO tasks (task_id, title, description, create_date, due_date,type) VALUES
   (1, '发布新产品', '发布我们的新产品。', '2023-04-01', '2023-04-15','kanban'),
   (2, '市场调研', '进行市场调研以了解客户需求。', '2023-04-02', NULL,'weekly'),
   (3, '员工培训', '为员工提供新产品知识培训。', '2023-04-03', '2023-04-10','kanban'),
   (4, '库存管理', '更新库存记录并分析销售趋势。', '2023-05-01', '2023-05-15','kanban'),
   (5, '客户支持', '处理客户反馈和投诉。', '2023-05-02', NULL,'kanban'),
   (6, '财务报告', '准备月度财务报告。', '2023-05-03', '2023-05-10','daily'),
   (7, '系统维护', '进行服务器维护和软件更新。', '2023-05-04', NULL,'weekly'),
   (8, '市场活动', '规划即将到来的营销活动。', '2023-05-05', '2023-05-20','daily'),
   (9, '产品摄影', '拍摄新产品照片用于营销。', '2023-05-06', NULL,'daily'),
   (10, '团队会议', '安排团队会议以讨论项目进展。', '2023-05-07', '2023-05-12','kanban');


INSERT INTO tags (tag_id, name) VALUES
    (1, '个人'),
    (2, '工作'),
    (3, '学习'),
    (4, '健身'),
    (5, '家务'),
    (6, '社交'),
    (7, '休闲'),
    (8, '旅行'),
    (9, '购物'),
    (10, '健康'),
    (11, '饮食')
INSERT INTO task_tags (task_id, tag_id) VALUES
    (1, 1),
    (1, 3),
    (2, 2),
    (2, 4),
    (3, 3),
    (3, 5),
    (4, 6),
    (4, 7),
    (5, 8),
    (5, 9),
    (6, 10),
    (6, 1);

-- 生成每周任务的task_id
SET @weekly_task_id = 1;

INSERT INTO weekly_tasks (task_id, urgent, important) VALUES
  (@weekly_task_id + 0, 1, 1),
  (@weekly_task_id + 1, 0, 1),
  (@weekly_task_id + 2, 1, 0),
  (@weekly_task_id + 3, 0, 0),
  (@weekly_task_id + 4, 1, 1);

-- 生成看板任务的task_id
SET @kanban_task_id = 6;

INSERT INTO kanban_tasks (task_id, state) VALUES
  (@kanban_task_id + 0, '待办'),
  (@kanban_task_id + 1, '进行中'),
  (@kanban_task_id + 2, '已完成'),
  (@kanban_task_id + 3, '待办'),
  (@kanban_task_id + 4, '进行中');


