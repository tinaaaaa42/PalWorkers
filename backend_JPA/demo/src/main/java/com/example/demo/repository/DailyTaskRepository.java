package com.example.demo.repository;

import com.example.demo.entity.DailyTask;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DailyTaskRepository extends JpaRepository<DailyTask, Integer> {
    List<DailyTask> findAllByUserId(int userId);
}