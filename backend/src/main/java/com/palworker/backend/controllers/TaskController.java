package com.palworker.backend.controllers;

import com.palworker.backend.models.KanbanTask;
import com.palworker.backend.models.Task;
import com.palworker.backend.models.WeeklyTask;
import com.palworker.backend.services.ConcreteTaskCreator;
import com.palworker.backend.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/kanban")
    public ResponseEntity<List<KanbanTask>> getKanbanTasks() {
        List<KanbanTask> tasks = taskService.getAllKanbanTasks();
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/weekly")
    public ResponseEntity<List<WeeklyTask>> getWeeklyTasks() {
        List<WeeklyTask> tasks = taskService.getAllWeeklyTasks();
        return ResponseEntity.ok(tasks);
    }
}
