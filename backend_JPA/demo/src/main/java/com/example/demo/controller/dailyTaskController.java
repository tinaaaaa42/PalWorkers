package com.example.demo.controller;


import com.example.demo.DTO.DailyTaskDto;
import com.example.demo.entity.DailyTask;
import com.example.demo.repository.DailyTaskRepository;
import com.example.demo.service.dailyTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class dailyTaskController {
    @Autowired
    dailyTaskService dailyTaskService;

    @GetMapping(value = "/api/tasks/daily")
    public List<DailyTask> getDailyTasks() {
        return dailyTaskService.findAll();
    }

    @PostMapping(value = "/api/tasks/daily")
    public DailyTask createDailyTask(@RequestBody DailyTaskDto dailyTaskDto) {
        return dailyTaskService.addDailyTask(dailyTaskDto);
    }
}
