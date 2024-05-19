package com.example.demo.service;

import com.example.demo.DTO.WeeklyTaskDto;
import com.example.demo.entity.WeeklyTask;

import java.util.List;

public interface weeklyTaskService {
    List<WeeklyTask> findAll();

    WeeklyTask addWeeklyTask(WeeklyTaskDto weeklyTaskDto);
}
