package com.example.demo.repository;

import com.example.demo.entity.KanbanTask;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KanbanTaskRepository extends JpaRepository<KanbanTask, Long> {
}