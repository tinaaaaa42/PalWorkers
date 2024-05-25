package com.example.demo.repository;

import com.example.demo.entity.KanbanTask;
import com.example.demo.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Integer> {
    KanbanTask findKanbanTaskById(int id);
}