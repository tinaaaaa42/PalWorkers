package com.palworker.backend.Repository;

import com.palworker.backend.models.KanbanTask;
import com.palworker.backend.models.Task;
import com.palworker.backend.models.WeeklyTask;
import com.palworker.backend.services.TaskCreator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;


@Repository
public class TaskRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<KanbanTask> findAllKanbanTasks() {
        String sql = "SELECT t.*, k.state, GROUP_CONCAT(tag.name ORDER BY tag.name SEPARATOR ', ') AS tags " +
                "FROM tasks t " +
                "JOIN kanban_tasks k ON t.task_id = k.task_id " +
                "LEFT JOIN task_tags tt ON t.task_id = tt.task_id " +
                "LEFT JOIN tags tag ON tt.tag_id = tag.tag_id " +
                "GROUP BY t.task_id";
        return jdbcTemplate.query(sql, new KanbanTaskRowMapper());
    }

    public List<WeeklyTask> findAllWeeklyTasks() {
        String sql = "SELECT t.*, w.urgent, w.important, GROUP_CONCAT(tag.name ORDER BY tag.name SEPARATOR ', ') AS tags " +
                "FROM tasks t " +
                "JOIN weekly_tasks w ON t.task_id = w.task_id " +
                "LEFT JOIN task_tags tt ON t.task_id = tt.task_id " +
                "LEFT JOIN tags tag ON tt.tag_id = tag.tag_id " +
                "GROUP BY t.task_id";
        return jdbcTemplate.query(sql, new WeeklyTaskRowMapper());
    }

    private static class KanbanTaskRowMapper implements RowMapper<KanbanTask> {
        @Override
        public KanbanTask mapRow(ResultSet rs, int rowNum) throws SQLException {
            long id = rs.getLong("task_id");
            String title = rs.getString("title");
            String description = rs.getString("description");
            Date createDate = rs.getDate("create_date");
            Date dueDate = rs.getDate("due_date");
            String state = rs.getString("state");
            String tagString = rs.getString("tags");
            List<String> tags = tagString != null ? Arrays.asList(tagString.split(", ")) : new ArrayList<>();
            return new KanbanTask(id, title, tags, createDate, dueDate, state);
        }
    }

    private static class WeeklyTaskRowMapper implements RowMapper<WeeklyTask> {
        @Override
        public WeeklyTask mapRow(ResultSet rs, int rowNum) throws SQLException {
            long id = rs.getLong("task_id");
            String title = rs.getString("title");
            Date createDate = rs.getDate("create_date");
            Date dueDate = rs.getDate("due_date");
            boolean urgent = rs.getBoolean("urgent");
            boolean important = rs.getBoolean("important");
            String tagString = rs.getString("tags");
            List<String> tags = tagString != null ? Arrays.asList(tagString.split(", ")) : new ArrayList<>();
            return new WeeklyTask(id, title, tags, createDate, dueDate, urgent, important);
        }
    }
}

//@Repository
//public class TaskRepository {
//    @Autowired
//    private JdbcTemplate jdbcTemplate;
//
//    @Autowired
//    private TaskCreator taskCreator;
//
//    public List<Task> findAllTasks() {
//        return jdbcTemplate.query(
//                "SELECT task_id, title, description, create_date, due_date, type, state, urgent, important, GROUP_CONCAT(tag.name ORDER BY tag.name) as tags FROM tasks " +
//                        "LEFT JOIN kanban_tasks ON tasks.task_id = kanban_tasks.task_id " +
//                        "LEFT JOIN weekly_tasks ON tasks.task_id = weekly_tasks.task_id " +
//                        "LEFT JOIN task_tags ON tasks.task_id = task_tags.task_id " +
//                        "LEFT JOIN tags ON task_tags.tag_id = tags.tag_id " +
//                        "GROUP BY tasks.task_id",
//                (rs, rowNum) -> {
//                    String type = rs.getString("type");
//                    Long id = rs.getLong("task_id");
//                    String title = rs.getString("title");
//                    String description = rs.getString("description");
//                    Date createDate = rs.getDate("create_date");
//                    Date dueDate = rs.getDate("due_date");
//                    List<String> tags = rs.getString("tags") != null ? Arrays.asList(rs.getString("tags").split(",")) : new ArrayList<>();
//
//                    // Additional properties for each type
//                    if ("kanban".equals(type)) {
//                        String state = rs.getString("state");
//                        return taskCreator.createTask(type, id, title, tags, createDate, dueDate, state);
//                    } else if ("weekly".equals(type)) {
//                        Boolean urgent = rs.getBoolean("urgent");
//                        Boolean important = rs.getBoolean("important");
//                        return taskCreator.createTask(type, id, title, tags, createDate, dueDate, urgent, important);
//                    } else {
//                        throw new IllegalArgumentException("Invalid task type");
//                    }
//                }
//        );
//    }
//}

