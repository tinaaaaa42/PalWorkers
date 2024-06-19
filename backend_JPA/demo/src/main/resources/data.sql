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
                                                                                (1, '发布新产品', '发布我们的新产品。', '2024-06-01', '2024-07-15','daily',1, '12:00:00'),
                                                                                (2, '市场调研', '进行市场调研以了解客户需求。', '2024-06-01', NULL,'daily',1, '13:00:00'),
                                                                                (3, '员工培训', '为员工提供新产品知识培训。', '2024-05-26', '2024-08-10','weekly',1, '14:00:00'),
                                                                                (4, '库存管理', '更新库存记录并分析销售趋势。', '2024-05-27', '2024-08-15','weekly',1, '15:00:00'),
                                                                                (5, '客户支持', '处理客户反馈和投诉。', '2024-05-28', NULL,'weekly',2, '16:00:00'),
                                                                                (6, '财务报告', '准备月度财务报告。', '2024-05-29', '2024-09-10','kanban',1, '17:00:00'),
                                                                                (7, '系统维护', '进行服务器维护和软件更新。', '2024-05-28', NULL,'kanban',2, '18:00:00'),
                                                                                (8, '市场活动', '规划即将到来的营销活动。', '2024-05-31', '2024-07-20','kanban',1, '19:00:00'),
                                                                                (9, '产品摄影', '拍摄新产品照片用于营销。', '2024-05-28', NULL,'kanban',1, '20:00:00'),
                                                                                (10, '团队会议', '安排团队会议以讨论项目进展。', '2024-05-30', '2024-07-12','kanban',1, '21:00:00');

INSERT INTO notes (note_id, task_id, note, create_date) VALUES (1, 1, '<p>Remember to update the product description.</p>', '2024-06-01'),
                                                               (2, 2, '<p>Check the latest market trends.</p>', '2024-06-01'),
                                                               (3, 3, '<p>Prepare training materials for the new product.</p>', '2024-05-26'),
                                                               (4, 4, '<p>Analyze the sales data for the past month.</p>', '2024-05-27'),
                                                               (5, 5, '<p>Follow up with customer complaints.</p>', '2023-05-28'),
                                                               (6, 6, '<p>Review the financial report for accuracy.</p>', '2024-05-29'),
                                                               (7, 7, '<p>Schedule server maintenance for next week.</p>', '2024-05-28'),
                                                               (8, 8, '<p>Finalize the marketing campaign details.</p>', '2024-05-31'),
                                                               (9, 9, '<p>Coordinate with the photographer for the product shoot.</p>', '2024-05-28'),
                                                               (10, 10, '<p>Prepare the agenda for the team meeting.</p>', '2024-05-30');

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
                                            (2, 2),
                                            (3, 3),
                                            (4, 6),
                                            (5, 8),
                                            (6, 10);
-- 插入团队任务数据
INSERT INTO tasks (title, description, create_date, due_date, type, team_id, due_time) VALUES
                                                                                          ('项目启动', '启动新的开发项目。', '2024-05-30', '2024-10-01', 'kanban', 1, '12:00:00'),
                                                                                          ('季度销售报告', '准备并提交季度销售报告。', '2024-05-31', '2024-08-30', 'weekly', 2, '13:00:00'),
                                                                                          ('招聘新员工', '进行新员工的招聘和面试。', '2024-05-29', '2024-07-20', 'daily',  3, '14:00:00'),
                                                                                          ('团队建设活动', '组织团队建设活动以增强团队凝聚力。', '2024-05-28', '2024-07-25', 'kanban', 4, '15:00:00'),
                                                                                          ('年度预算规划', '制定下一年度的预算计划。', '2024-05-26', '2024-07-15', 'kanban', 2, '16:00:00');


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

INSERT INTO kanban_tasks (task_id, state, in_project) VALUES
                                              (@kanban_task_id + 0, 'todo', true),
                                              (@kanban_task_id + 1, 'inprogress', true),
                                              (@kanban_task_id + 2, 'todo', true),
                                              (@kanban_task_id + 3, 'todo', true),
                                              (@kanban_task_id + 4, 'done', true),
                                              (11,'done', false),
                                              (14, 'todo', true),  -- 新增团队看板任务
                                              (15, 'inprogress', true);  -- 新增团队看板任务

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

INSERT INTO projects(title, total, done,state, user_id,team_id, completed) VALUES
                                                       ('project1',100, 60,'inprogress',1,null,false),
                                                       ('project2',200,100,'todo',1,null,false),
                                                       ('project3',50,20,'todo',null,1,false);

INSERT INTO project_task_group(task_id, project_id) VALUES
                                                        (6,1),
                                                        (7,1),
                                                        (8,2),
                                                        (9,2),
                                                        (10,2),
                                                        (14,3),
                                                        (15,3);



