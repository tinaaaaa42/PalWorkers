package com.example.demo.service;

import com.example.demo.DTO.WeeklyTaskDto;
import com.example.demo.entity.User;
import com.example.demo.entity.WeeklyTask;

import java.time.LocalDate;
import java.util.List;

public interface weeklyTaskService {
    List<WeeklyTask> findAll(int id, LocalDate startDate, LocalDate endDate);

//    WeeklyTask addWeeklyTask(WeeklyTaskDto weeklyTaskDto, User user);

    List<WeeklyTask> findteamTasksByUser(User user, LocalDate startDate, LocalDate endDate);
}
