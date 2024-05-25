use palworkers;


-- 初始化数据

INSERT INTO teams (name,invitation_code) VALUES
                                      ('技术部门','happpy'),
                                      ( '市场部','looppy'),
                                      ( '人力资源部','gaming'),
                                      ('销售部','cookie');




-- 测试数据 for users 表
INSERT INTO users (username, email_addr, avatar, notes) VALUES
                                                                                             ('root', 'admin', 'bg.jpg', 'Too lazy to type..'),
                                                                                             ('test', 'user1@example.com', 'avatar1.jpg', 'Note for user1'),
('user', 'user1@example.com', 'avatar1.jpg', 'Note for user1');


INSERT INTO team_member (team_id, user_id, leader) VALUES
                                                       ( 1, 1, 1), -- 假设用户ID为1的是团队领导者
                                                       ( 1, 2, 0),-- 用户ID为2的是团队普通成员
    (1,3,0),
    (2,1,0),
    (3,1,1),
    (2,2,1);

-- 测试数据 for user_auth 表
INSERT INTO user_auth (user_id, password_hash) VALUES
                                                   (1, 'admin'), -- Assuming 'admin' is the hashed password for the 'root' user
                                                   (2, 'test'), -- 加密后的密码 'password1'
                                                   (3,'user');


INSERT INTO tasks (task_id,title, description, create_date, due_date,type,user_id,due_time) VALUES
                                                                                (1, '发布新产品', '发布我们的新产品。', '2023-04-01', '2023-04-15','daily',1, '12:00:00'),
                                                                                (2, '市场调研', '进行市场调研以了解客户需求。', '2023-04-02', NULL,'daily',1, '13:00:00'),
                                                                                (3, '员工培训', '为员工提供新产品知识培训。', '2023-04-03', '2023-04-10','weekly',1, '14:00:00'),
                                                                                (4, '库存管理', '更新库存记录并分析销售趋势。', '2023-05-01', '2023-05-15','weekly',1, '15:00:00'),
                                                                                (5, '客户支持', '处理客户反馈和投诉。', '2023-05-02', NULL,'weekly',2, '16:00:00'),
                                                                                (6, '财务报告', '准备月度财务报告。', '2023-05-03', '2023-05-10','kanban',1, '17:00:00'),
                                                                                (7, '系统维护', '进行服务器维护和软件更新。', '2023-05-04', NULL,'kanban',2, '18:00:00'),
                                                                                (8, '市场活动', '规划即将到来的营销活动。', '2023-05-05', '2023-05-20','kanban',1, '19:00:00'),
                                                                                (9, '产品摄影', '拍摄新产品照片用于营销。', '2023-05-06', NULL,'kanban',2, '20:00:00'),
                                                                                (10, '团队会议', '安排团队会议以讨论项目进展。', '2023-05-07', '2023-05-12','kanban',1, '21:00:00');


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
                                    (11, '饮食');
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

-- 插入团队任务数据
INSERT INTO tasks (title, description, create_date, due_date, type, team_id, due_time) VALUES
                                                                                          ('项目启动', '启动新的开发项目。', '2023-05-08', '2023-06-01', 'kanban', 1, '12:00:00'),
                                                                                          ('季度销售报告', '准备并提交季度销售报告。', '2023-05-09', '2023-06-30', 'weekly', 2, '13:00:00'),
                                                                                          ('招聘新员工', '进行新员工的招聘和面试。', '2023-05-10', '2023-05-20', 'daily',  3, '14:00:00'),
                                                                                          ('团队建设活动', '组织团队建设活动以增强团队凝聚力。', '2023-05-11', '2023-05-25', 'kanban', 4, '15:00:00'),
                                                                                          ('年度预算规划', '制定下一年度的预算计划。', '2023-05-12', '2023-06-15', 'kanban', 2, '16:00:00');


-- 生成每日任务的task_id
SET @daily_task_id = 1;

INSERT INTO daily_tasks (task_id) VALUES
                                                          (@daily_task_id + 0),
                                                          (@daily_task_id + 1),
                                                          (13);  -- 新增团队每日任务


-- 生成每周任务的task_id
SET @weekly_task_id = 3;

INSERT INTO weekly_tasks (task_id, urgent, important) VALUES
                                                          (@weekly_task_id + 0, 1, 1),
                                                          (@weekly_task_id + 1, 0, 1),
                                                          (@weekly_task_id + 2, 1, 0),
                                                          (12, 0, 1);  -- 新增团队每周任务

-- 生成看板任务的task_id
SET @kanban_task_id = 6;

INSERT INTO kanban_tasks (task_id, state) VALUES
                                              (@kanban_task_id + 0, 'todo'),
                                              (@kanban_task_id + 1, 'inprogress'),
                                              (@kanban_task_id + 2, 'review'),
                                              (@kanban_task_id + 3, 'todo'),
                                              (@kanban_task_id + 4, 'down'),
                                              (11,'down'),
                                              (14, 'todo'),  -- 新增团队看板任务
                                              (15, 'inprogress');  -- 新增团队看板任务

-- 假设上面的插入生成了以下的 task_id：11, 12, 13, 14, 15

-- 插入团队任务领导者数据
INSERT INTO team_tasks_leader (task_id, leader_id) VALUES
                                                       (11, 1),
                                                       (12, 2),
                                                       (13, 1),
                                                       (14, 2),
                                                       (15, 2);

-- 插入团队任务参与者数据
INSERT INTO team_tasks_anticipater (task_id, anticipater_id) VALUES
                                                                 (11, 2),
                                                                 (12, 1),
                                                                 (13, 2),
                                                                 (14, 1),
                                                                 (14, 3),
                                                                 (15, 1);



