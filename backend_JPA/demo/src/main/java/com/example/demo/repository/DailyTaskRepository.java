package com.example.demo.repository;

import com.example.demo.entity.DailyTask;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DailyTaskRepository extends JpaRepository<DailyTask, Integer> {
}