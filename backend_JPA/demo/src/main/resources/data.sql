use palworkers;


-- 初始化数据

INSERT INTO teams (name,invitation_code) VALUES
                                             ('后端团队','happpy'),
                                             ( '前端团队','looppy'),
                                             ( 'ICS Group','gaming'),
                                             ('软工团队','cookie');




-- 测试数据 for users 表
INSERT INTO users (username, email_addr, avatar, notes) VALUES
                                                            ('yly', 'yly', 'bg.jpg', 'Too lazy to type..'),
                                                            ('ytw', 'ytw', 'avatar1.jpg', 'Just do it'),
                                                            ('wjy', 'wjy', 'avatar3.jpg', 'we can do it'),
                                                            ('ljt', 'ljt', 'avatar2.jpg', 'One more try');

INSERT INTO team_member (team_id, user_id, leader) VALUES
                                                       ( 1, 1, 1), -- 假设用户ID为1的是团队领导者
                                                       ( 1, 4, 0),-- 用户ID为2的是团队普通成员
                                                       (2, 2, 1),
                                                       (2,3,0),
                                                       (3,1,1),
                                                       (4,1,1),
                                                       (4,3,0),
                                                       (4,4,0);

-- 测试数据 for user_auth 表
INSERT INTO user_auth (user_id, password_hash) VALUES
                                                   (1, 'yly'), -- Assuming 'admin' is the hashed password for the 'root' user
                                                   (2, 'ytw'), -- 加密后的密码 'password1'
                                                   (3,'wjy'),
                                                   (4,'ljt');

##personal
INSERT INTO tasks (task_id,title, description, create_date, due_date,type,user_id,due_time) VALUES
                                                                                                (1, '发布新产品', '发布我们的新产品。', '2024-06-14', '2024-06-15','daily',1, '12:00:00'),
                                                                                                (2, '市场调研', '进行市场调研以了解客户需求。', '2024-06-15', NULL,'daily',1, '13:00:00'),
                                                                                                (3, '员工培训', '为员工提供新产品知识培训。', '2024-06-16', '2024-06-10','daily',1, '14:00:00'),
                                                                                                (4, '库存管理', '更新库存记录并分析销售趋势。', '2024-06-17', '2024-06-15','daily',1, '15:00:00'),
                                                                                                (5, '客户支持', '处理客户反馈和投诉。', '2024-06-18', NULL,'daily',1, '16:00:00'),
                                                                                                (6, '财务报告', '准备月度财务报告。', '2024-06-19', '2024-06-10','daily',1, '17:00:00'),
                                                                                                (7, '系统维护', '进行服务器维护和软件更新。', '2024-06-20', NULL,'daily',1, '18:00:00'),


                                                                                                (8, '市场活动', '规划即将到来的营销活动。', '2024-06-17', '2024-06-20','weekly',1, null),
                                                                                                (9, '产品摄影', '拍摄新产品照片用于营销。', '2024-06-19', NULL,'weekly',1, null),
                                                                                                (10, '团队会议', '安排团队会议以讨论项目进展。', '2024-06-15', '2024-06-23','weekly',1, null),
                                                                                                (11, 'examine', '安排团队会议以讨论项目进展。', '2024-06-18', '2024-06-23','weekly',1, null),

                                                                                                (12, 'examine1', '安排团队会议以讨论项目进展。', '2024-05-28', '2024-06-25','kanban',1, null),
                                                                                                (13, 'examine2', '安排团队会议以讨论项目进展。', '2024-06-18', '2024-06-29','kanban',1, null),
                                                                                                (14, 'examine3', '安排团队会议以讨论项目进展。', '2024-06-03', '2024-06-24','kanban',1, null),
                                                                                                (15, 'examine4', '安排团队会议以讨论项目进展。', '2024-06-11', '2024-06-23','kanban',1, null);

    INSERT INTO tasks (task_id,title, description, create_date, due_date,type,team_id,due_time) VALUES

                                                                                                (16, '子任务1', '安排团队会议以讨论项目进展。', '2024-05-28', '2024-06-25','kanban',4, null),
                                                                                                (17, '子任务2', '安排团队会议以讨论项目进展。', '2024-06-18', '2024-06-29','kanban',4, null),
                                                                                                (18, '子任务3', '安排团队会议以讨论项目进展。', '2024-06-03', '2024-06-24','kanban',4, null),
                                                                                                (19, '子任务4', '安排团队会议以讨论项目进展。', '2024-06-11', '2024-06-23','kanban',4, null),
                                                                                                (20, '子任务5', '安排团队会议以讨论项目进展。', '2024-06-11', '2024-06-23','kanban',4, null);






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
                                      (@daily_task_id + 2),
                                      (@daily_task_id + 3),
                                      (@daily_task_id + 4),
                                      (@daily_task_id + 5),
                                      (@daily_task_id + 6);




-- 生成每周任务的task_id
SET @weekly_task_id = 8;

INSERT INTO weekly_tasks (task_id, urgent, important) VALUES
                                                          (@weekly_task_id + 0, 1, 1),
                                                          (@weekly_task_id + 1, 0, 1),
                                                          (@weekly_task_id + 2, 1, 0),
                                                          (@weekly_task_id + 3, 0, 0);

-- 生成看板任务的task_id
SET @kanban_task_id = 12;

INSERT INTO kanban_tasks (task_id, state, in_project) VALUES
                                                          (@kanban_task_id + 0, 'todo', false),
                                                          (@kanban_task_id + 1, 'inprogress', false),
                                                          (@kanban_task_id + 2, 'review', false),
                                                          (@kanban_task_id + 3, 'done', false),
                                                          (16,'todo',true),
                                                          (17,'todo',true),
                                                          (18,'inprogress',true),
                                                          (19,'review',true),
                                                          (20,'done',true);


-- 假设上面的插入生成了以下的 task_id：11, 12, 13, 14, 15

-- 插入团队任务领导者数据
INSERT INTO team_tasks_leader (task_id, leader_id) VALUES
                                                       (16, 1),
                                                       (17, 1),
                                                       (18, 1),
                                                       (19, 1),
                                                       (20, 1);
#
# # -- 插入团队任务参与者数据
INSERT INTO team_tasks_anticipater (task_id, anticipater_id) VALUES
                                                                 (16, 4),
                                                                 (16, 3),
                                                                 (17, 4),
                                                                 (18, 4),
                                                                 (19, 3),
                                                                 (20, 3);

INSERT INTO projects(title, total, done,state, user_id,team_id, completed) VALUES
                                                                               ('软工大作业',5, 1,'todo',null,4,false);

INSERT INTO project_task_group(task_id, project_id) VALUES
                                                        (16,1),
                                                        (17,1),
                                                        (18,1),
                                                        (19,1),
                                                        (20,1);


