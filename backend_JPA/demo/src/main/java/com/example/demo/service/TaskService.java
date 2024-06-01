package com.example.demo.service;

import com.example.demo.DTO.TaskDto;
import com.example.demo.entity.Task;

public interface TaskService {
    Task createTask(TaskDto taskDto);
    Task updateTask(TaskDto taskDto);
}
