DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS task_tags;
DROP TABLE IF EXISTS kanban_tasks;
DROP TABLE IF EXISTS weekly_tasks;

CREATE TABLE tasks (
    task_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    create_date DATE NOT NULL,
    due_date DATE,
)

CREATE TABLE tags (
    tag_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
)

CREATE TABLE task_tags (
    task_id BIGINT NOT NULL,
    tag_id BIGINT NOT NULL,
    PRIMARY KEY (task_id, tag_id),
    FOREIGN KEY (task_id) REFERENCES tasks(task_id),
    FOREIGN KEY (tag_id) REFERENCES tags(tag_id)
)

CREATE TABLE kanban_tasks (
    task_id BIGINT PRIMARY KEY,
    state VARCHAR(255) NOT NULL,
    FOREIGN KEY (task_id) REFERENCES tasks(task_id)
)

CREATE TABLE weekly_tasks (
    task_id BIGINT PRIMARY KEY,
    urgent BOOLEAN NOT NULL,
    important BOOLEAN NOT NULL,
    FOREIGN KEY (task_id) REFERENCES tasks(task_id)
)