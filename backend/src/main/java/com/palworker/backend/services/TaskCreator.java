package com.palworker.backend.services;

import com.palworker.backend.models.Task;

public abstract class TaskCreator {
    public abstract Task createTask(String type, Object... args);
}
