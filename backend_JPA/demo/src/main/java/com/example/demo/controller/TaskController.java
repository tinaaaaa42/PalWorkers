package com.example.demo.controller;

import com.example.demo.DTO.DailyTaskDto;
import com.example.demo.DTO.KanbanTaskDto;
import com.example.demo.DTO.TaskDto;
import com.example.demo.DTO.WeeklyTaskDto;
import com.example.demo.entity.DailyTask;
import com.example.demo.entity.KanbanTask;
import com.example.demo.entity.Task;
import com.example.demo.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @PostMapping(value = "/api/tasks/weekly")
    public Task createTask(@RequestBody WeeklyTaskDto weeklyTaskDto) {
        return taskService.createTask(weeklyTaskDto);
    }

    @PostMapping(value = "/api/tasks/daily")
    public Task createTask(@RequestBody DailyTaskDto dailyTaskDto) {
        return taskService.createTask(dailyTaskDto);
    }

    @PostMapping(value = "/api/tasks/kanban")
    public Task createTask(@RequestBody KanbanTaskDto kanbanTaskDto) {
        return taskService.createTask(kanbanTaskDto);
    }

    @PutMapping(value = "/api/tasks/weekly")
    public Task updateTask(@RequestBody WeeklyTaskDto weeklyTaskDto) {
        return taskService.updateTask(weeklyTaskDto);
    }

    @PutMapping(value = "/api/tasks/daily")
    public Task updateTask(@RequestBody DailyTaskDto dailyTaskDto) {
        return taskService.updateTask(dailyTaskDto);
    }

    @PutMapping(value = "/api/tasks/kanban")
    public Task updateTask(@RequestBody KanbanTaskDto kanbanTaskDto) {
        return taskService.updateTask(kanbanTaskDto);
    }
}
