package com.example.demo.repository;

import com.example.demo.entity.WeeklyTask;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WeeklyTaskRepository extends JpaRepository<WeeklyTask, Long> {
}