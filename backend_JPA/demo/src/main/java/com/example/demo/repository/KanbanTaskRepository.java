package com.example.demo.repository;

import com.example.demo.entity.KanbanTask;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface KanbanTaskRepository extends JpaRepository<KanbanTask, Integer> {
    List<KanbanTask> findAllByUserId(int userId);


    List<KanbanTask> findByUserIdAndCreateDateBetween(int userId, LocalDate startDate, LocalDate endDate);
//    KanbanTask findKanbanTaskByTaskId(int taskId);
}