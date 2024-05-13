-- query all tasks

SELECT * FROM tasks;

-- query all weekly_tasks

SELECT * FROM tasks
JOIN weekly_task ON tasks.id = weekly_tasks.task_id

-- query all kanban_tasks
SELECT * FROM tasks
JOIN kanban_tasks ON tasks.id = kanban_tasks.task_id;


-- query specific task
SELECT * FROM tasks
WHERE id = ?;

-- query specific weekly_task
SELECT * FROM tasks
JOIN weekly_tasks ON tasks.id = weekly_tasks.task_id
WHERE tasks.id = ?;

-- query specific kanban_tasks
SELECT * FROM tasks
JOIN kanban_tasks ON tasks.id = kanban_tasks.task_id
WHERE tasks.id = ?;



