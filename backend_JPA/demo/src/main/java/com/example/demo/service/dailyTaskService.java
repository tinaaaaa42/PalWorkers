package com.example.demo.service;

import com.example.demo.DTO.DailyTaskDto;
import com.example.demo.entity.DailyTask;
import com.example.demo.entity.User;

import java.time.LocalDate;
import java.util.List;

public interface dailyTaskService {
    List<DailyTask> findAll(int userId, LocalDate startDate, LocalDate endDate);

    List<DailyTask> findteamtasksByUser(User user, LocalDate startDate, LocalDate endDate);

//    DailyTask addDailyTask(DailyTaskDto dailyTaskDto, User user);
//
//    DailyTask updateDailyTask(DailyTaskDto dailyTaskDto, User user);
}
