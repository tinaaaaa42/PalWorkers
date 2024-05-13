use palworkers;

-- query all tasks

SELECT * FROM tasks;

-- query all weekly_tasks

SELECT * FROM tasks
JOIN weekly_tasks ON tasks.task_id = weekly_tasks.task_id;

-- query all kanban_tasks
SELECT * FROM tasks
JOIN kanban_tasks ON tasks.task_id = kanban_tasks.task_id;


-- query specific task
SELECT * FROM tasks
WHERE task_id = ?;

-- query specific weekly_task
SELECT * FROM tasks
JOIN weekly_tasks ON tasks.task_id = weekly_tasks.task_id
WHERE tasks.task_id = ?;

-- query specific kanban_tasks
SELECT * FROM tasks
JOIN kanban_tasks ON tasks.task_id = kanban_tasks.task_id
WHERE tasks.task_id = ?;



