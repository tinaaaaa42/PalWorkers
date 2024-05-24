package com.example.demo.service;

import com.example.demo.DTO.DailyTaskDto;
import com.example.demo.entity.DailyTask;

import java.util.List;

public interface dailyTaskService {
    List<DailyTask> findAll();

    DailyTask addDailyTask(DailyTaskDto dailyTaskDto);
}
