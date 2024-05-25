package com.example.demo.repository;

import com.example.demo.entity.WeeklyTask;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WeeklyTaskRepository extends JpaRepository<WeeklyTask, Integer> {
    List<WeeklyTask> findAllByUserId(int userId);
}