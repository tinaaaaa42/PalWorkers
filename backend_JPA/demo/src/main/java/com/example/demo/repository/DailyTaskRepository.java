package com.example.demo.repository;

import com.example.demo.entity.DailyTask;
import com.example.demo.entity.KanbanTask;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface DailyTaskRepository extends JpaRepository<DailyTask, Integer> {
    List<DailyTask> findAllByUserId(int userId);

    List<DailyTask> findByUserIdAndCreateDateEquals(int userId, LocalDate createDate);

}