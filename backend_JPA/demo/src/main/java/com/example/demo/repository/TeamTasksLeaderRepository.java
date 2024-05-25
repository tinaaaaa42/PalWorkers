package com.example.demo.repository;

import com.example.demo.entity.Task;
import com.example.demo.entity.TeamTasksLeader;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeamTasksLeaderRepository extends JpaRepository<TeamTasksLeader, Integer> {
    List<Task> findTasksByUserId(Integer userId);
}