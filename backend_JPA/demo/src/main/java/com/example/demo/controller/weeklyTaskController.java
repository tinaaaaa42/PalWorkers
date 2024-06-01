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

import java.time.LocalDate;
import java.util.ArrayList;
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
        LocalDate start = LocalDate.parse("1990-01-01");
        LocalDate end = LocalDate.parse("2040-01-01");
        List<WeeklyTask> weeklyTasks = new ArrayList<>();
        weeklyTasks.addAll(weeklyService.findAll(userId,start,end));
        weeklyTasks.addAll(weeklyService.findteamTasksByUser(user,start,end));
        return weeklyTasks;
    }

    @GetMapping(value = "api/tasks/weekly/start={startDate}/end={endDate}")
    public List<WeeklyTask> getAllWeeklyTask(HttpSession session, @PathVariable String startDate, @PathVariable String endDate) {
        User user = (User) session.getAttribute("user");
        Integer userId = user.getId();
        if (userId == null) {
            throw new RuntimeException("User not logged in");
        }
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        List<WeeklyTask> weeklyTasks = new ArrayList<>();
        weeklyTasks.addAll(weeklyService.findAll(userId,start,end));
        weeklyTasks.addAll(weeklyService.findteamTasksByUser(user,start,end));
        return weeklyTasks;
    }

//    @PostMapping(value = "/api/tasks/weekly")
//    public WeeklyTask addWeeklyTask(@RequestBody WeeklyTaskDto weeklyTaskDto, HttpSession session) {
//        User user = (User) session.getAttribute("user");
//        Integer userId = user.getId();
//        if (userId == null) {
//            throw new RuntimeException("User not logged in");
//        }
//        return weeklyService.addWeeklyTask(weeklyTaskDto, user);
//    }

}
