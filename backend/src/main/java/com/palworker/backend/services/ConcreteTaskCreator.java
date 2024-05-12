package com.palworker.backend.services;

import com.palworker.backend.models.KanbanTask;
import com.palworker.backend.models.Task;
import com.palworker.backend.models.WeeklyTask;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ConcreteTaskCreator extends TaskCreator {
    @Override
    public Task createTask(String type, Object... args) {
        if (type.equals("kanban")) {
            return new KanbanTask((Long) args[0], (String) args[1], (List<String>) args[2], (Date) args[3], (Date) args[4], (String) args[5]);
        } else if (type.equals("weekly")) {
            return new WeeklyTask((Long) args[0], (String) args[1], (List<String>) args[2], (Date) args[3], (Date) args[4], (Boolean) args[5], (Boolean) args[6]);
        } else {
            throw new IllegalArgumentException("Invalid task type");
        }

    }
}
