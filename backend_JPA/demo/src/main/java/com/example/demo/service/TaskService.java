package com.example.demo.service;

import com.example.demo.DTO.TaskDto;
import com.example.demo.entity.Task;

public interface TaskService {
    public Task createTask(TaskDto taskDto);
}
