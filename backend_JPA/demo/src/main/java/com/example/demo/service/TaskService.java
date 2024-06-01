package com.example.demo.service;

import com.example.demo.DTO.MonthStatistics;
import com.example.demo.DTO.NotifyDto;
import com.example.demo.DTO.TaskDto;
import com.example.demo.DTO.WeekStatistics;
import com.example.demo.entity.Task;
import com.example.demo.entity.User;

import java.util.List;

public interface TaskService {
    Task createTask(TaskDto taskDto);
    Task updateTask(TaskDto taskDto);

    List<WeekStatistics> getWeeklyStatistics(int userId);

    List<MonthStatistics> getMonthlyStatistics(int userId);

    NotifyDto notifyUser(int userId);

    boolean completeTask(User user, int taskId);

    boolean advanceTask(User user, int taskId);
}
