package com.example.demo.controller;


import com.example.demo.DTO.DailyTaskDto;
import com.example.demo.entity.DailyTask;
import com.example.demo.entity.User;
import com.example.demo.repository.DailyTaskRepository;
import com.example.demo.service.dailyTaskService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class dailyTaskController {
    @Autowired
    dailyTaskService dailyTaskService;

    @GetMapping(value = "/api/tasks/daily")
    public List<DailyTask> getDailyTasks(HttpSession session) {
        User user = (User) session.getAttribute("user");
        Integer userId = user.getId();
        if (userId == null) {
            throw new RuntimeException("User not logged in");
        }
        LocalDate currentDate = LocalDate.now();
        List<DailyTask> dailyTasks = new ArrayList<>();
        dailyTasks.addAll(dailyTaskService.findAll(userId,currentDate));
        dailyTasks.addAll(dailyTaskService.findteamtasksByUser(user,currentDate));
        return dailyTasks;
    }

    @GetMapping(value = "/api/tasks/daily/date={date}")
    public List<DailyTask> getDailyTasks(HttpSession session, @PathVariable String date) {
        User user = (User) session.getAttribute("user");
        Integer userId = user.getId();
        if (userId == null) {
            throw new RuntimeException("User not logged in");
        }
        LocalDate currentDate = LocalDate.parse(date);
        List<DailyTask> dailyTasks = new ArrayList<>();
        dailyTasks.addAll(dailyTaskService.findAll(userId,currentDate));
        dailyTasks.addAll(dailyTaskService.findteamtasksByUser(user,currentDate));
        return dailyTasks;
    }

//    @PostMapping(value = "/api/tasks/daily")
//    public DailyTask createDailyTask(@RequestBody DailyTaskDto dailyTaskDto, HttpSession session) {
//        User user = (User) session.getAttribute("user");
//        Integer userId = user.getId();
//        if (userId == null) {
//            throw new RuntimeException("User not logged in");
//        }
//        return dailyTaskService.addDailyTask(dailyTaskDto, user);
//    }
//
//    @PutMapping(value = "/api/tasks/daily")
//    public DailyTask updateDailyTask(@RequestBody DailyTaskDto dailyTaskDto, HttpSession session) {
//        User user = (User) session.getAttribute("user");
//        Integer userId = user.getId();
//        if (userId == null) {
//            throw new RuntimeException("User not logged in");
//        }
//        return dailyTaskService.updateDailyTask(dailyTaskDto, user);
//
//    }
}
