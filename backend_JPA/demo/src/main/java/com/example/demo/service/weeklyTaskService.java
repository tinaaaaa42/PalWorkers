package com.example.demo.service;

import com.example.demo.DTO.WeeklyTaskDto;
import com.example.demo.entity.User;
import com.example.demo.entity.WeeklyTask;

import java.util.List;

public interface weeklyTaskService {
    List<WeeklyTask> findAll(long id);

    WeeklyTask addWeeklyTask(WeeklyTaskDto weeklyTaskDto, User user);
}
