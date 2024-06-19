package com.example.demo.controller;

import com.example.demo.DTO.*;
import com.example.demo.entity.DailyTask;
import com.example.demo.entity.KanbanTask;
import com.example.demo.entity.Task;
import com.example.demo.entity.User;
import com.example.demo.service.TaskService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.bind.annotation.*;


import java.util.List;


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

    @PostMapping(value = "/api/tasks/kanban/{batch}")
    public List<Task> createBatchDefaultKanbanTasks(@PathVariable int batch) {
        return taskService.createBatchDefaultKanbanTasks(batch);
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

    @DeleteMapping(value = "/api/tasks/{id}")
    public boolean deleteTask(@PathVariable int id) {
        return taskService.deleteTask(id);
    }

    @GetMapping(value = "api/tasks/weekly_statistics")
    public List<WeekStatistics> getWeeklyStatistics(HttpSession session) {
        User user = (User) session.getAttribute("user");
        Integer userId = user.getId();
        if (userId == null) {
            throw new RuntimeException("User not logged in");
        }
        return taskService.getWeeklyStatistics(userId);
    }

    @GetMapping(value = "api/tasks/kanban_statistics")
    public List<MonthStatistics> getKanbanStatistics(HttpSession session) {
        User user = (User) session.getAttribute("user");
        Integer userId = user.getId();
        if (userId == null) {
            throw new RuntimeException("User not logged in");
        }
        return taskService.getMonthlyStatistics(userId);

    }

    @GetMapping(value = "api/tasks/notify")
    public NotifyDto Notify(HttpSession session) {
        User user = (User) session.getAttribute("user");
        Integer userId = user.getId();
        if (userId == null) {
            throw new RuntimeException("User not logged in");
        }
        return taskService.notifyUser(userId);
    }

    @PutMapping(value = "api/tasks/complete")
    public boolean completeTask(HttpSession session, @RequestParam int taskId) {
        User user = (User) session.getAttribute("user");
        Integer userId = user.getId();
        if (userId == null) {
            throw new RuntimeException("User not logged in");
        }
        return taskService.completeTask(user, taskId);
    }

    @PutMapping(value = "api/tasks/alterKanbanState")
    public boolean alterKanbanState(HttpSession session, @RequestParam int taskId) {
        User user = (User) session.getAttribute("user");
        Integer userId = user.getId();
        if (userId == null) {
            throw new RuntimeException("User not logged in");
        }
        return taskService.advanceTask(user, taskId);
    }
}
