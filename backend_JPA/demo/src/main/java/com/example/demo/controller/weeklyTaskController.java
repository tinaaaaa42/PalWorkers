package com.example.demo.controller;


import com.example.demo.DTO.KanbanTaskDto;
import com.example.demo.DTO.WeeklyTaskDto;
import com.example.demo.entity.User;
import com.example.demo.entity.WeeklyTask;
import com.example.demo.repository.WeeklyTaskRepository;
import com.example.demo.service.weeklyTaskService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class weeklyTaskController {
    @Autowired
    private weeklyTaskService weeklyService;

    @Autowired
    private WeeklyTaskRepository weeklyTaskRepository;

    @GetMapping(value = "api/tasks/weekly")
    public List<WeeklyTask> getAllWeeklyTask(HttpSession session) {
        User user = (User) session.getAttribute("user");
        Integer userId = user.getId();
        if (userId == null) {
            throw new RuntimeException("User not logged in");
        }
        return weeklyService.findAll(userId);
    }
//    public List<WeeklyTask> getAllWeeklyTask() {
//        return weeklyTaskRepository.findAll();
//    }

    @PostMapping(value = "/api/tasks/weekly")
    public WeeklyTask addWeeklyTask(@RequestBody WeeklyTaskDto weeklyTaskDto, HttpSession session) {
        User user = (User) session.getAttribute("user");
        Integer userId = user.getId();
        if (userId == null) {
            throw new RuntimeException("User not logged in");
        }
        return weeklyService.addWeeklyTask(weeklyTaskDto, user);
    }

}
