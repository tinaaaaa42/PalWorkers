package com.example.demo.controller;


import com.example.demo.DTO.KanbanTaskDto;
import com.example.demo.DTO.WeeklyTaskDto;
import com.example.demo.entity.WeeklyTask;
import com.example.demo.service.weeklyTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class weeklyTaskController {
    @Autowired
    private weeklyTaskService weeklyService;

    @GetMapping(value = "api/tasks/weekly")
    public List<WeeklyTask> getAllWeeklyTask() {
        return weeklyService.findAll();
    }

    @PostMapping(value = "/api/tasks/weekly")
    public WeeklyTask addWeeklyTask(@RequestBody WeeklyTaskDto weeklyTaskDto) {
        return weeklyService.addWeeklyTask(weeklyTaskDto);
    }

}
