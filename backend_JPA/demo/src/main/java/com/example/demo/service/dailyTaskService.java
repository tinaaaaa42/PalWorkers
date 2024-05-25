package com.example.demo.service;

import com.example.demo.DTO.DailyTaskDto;
import com.example.demo.entity.DailyTask;
import com.example.demo.entity.User;

import java.util.List;

public interface dailyTaskService {
    List<DailyTask> findAll(int userId);

    DailyTask addDailyTask(DailyTaskDto dailyTaskDto, User user);
}
