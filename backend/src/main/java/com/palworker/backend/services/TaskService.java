package com.palworker.backend.services;

import com.palworker.backend.Repository.TaskRepository;
import com.palworker.backend.models.KanbanTask;
import com.palworker.backend.models.WeeklyTask;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public List<KanbanTask> getAllKanbanTasks() {
        return taskRepository.findAllKanbanTasks();
    }

    public List<WeeklyTask> getAllWeeklyTasks() {
        return taskRepository.findAllWeeklyTasks();
    }
}
