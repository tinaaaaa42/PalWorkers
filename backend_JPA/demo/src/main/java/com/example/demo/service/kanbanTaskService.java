package com.example.demo.service;

import com.example.demo.DTO.KanbanTaskDto;
import com.example.demo.DTO.TaskDto;
import com.example.demo.entity.KanbanTask;

import java.util.List;

public interface kanbanTaskService {
    List<KanbanTask> findAll();

    void addKanbanTask(KanbanTaskDto kanbanTaskDto);
}
