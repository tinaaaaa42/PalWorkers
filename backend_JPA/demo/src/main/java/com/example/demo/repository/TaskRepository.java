package com.example.demo.repository;

import com.example.demo.entity.DailyTask;
import com.example.demo.entity.KanbanTask;
import com.example.demo.entity.Task;
import com.example.demo.entity.WeeklyTask;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Integer> {
    KanbanTask findKanbanTaskById(int id);

    WeeklyTask findWeeklyTaskById(int id);

    DailyTask findDailyTaskById(int id);
}