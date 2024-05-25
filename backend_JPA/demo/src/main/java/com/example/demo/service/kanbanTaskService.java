package com.example.demo.service;

import com.example.demo.DTO.KanbanTaskDto;
import com.example.demo.DTO.TaskDto;
import com.example.demo.entity.KanbanTask;
import com.example.demo.entity.User;

import java.util.List;

public interface kanbanTaskService {
    List<KanbanTask> findAll(int userId);

    KanbanTask addKanbanTask(KanbanTaskDto kanbanTaskDto, User user);
}
