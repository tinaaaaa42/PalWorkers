package com.example.demo.repository;

import com.example.demo.entity.KanbanTask;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface KanbanTaskRepository extends JpaRepository<KanbanTask, Integer> {
    List<KanbanTask> findAllByUserId(int userId);
}