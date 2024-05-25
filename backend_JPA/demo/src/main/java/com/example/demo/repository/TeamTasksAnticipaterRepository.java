package com.example.demo.repository;

import com.example.demo.entity.TeamTasksAnticipater;
import com.example.demo.entity.TeamTasksLeader;
import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeamTasksAnticipaterRepository extends JpaRepository<TeamTasksAnticipater, Integer> {
    List<TeamTasksAnticipater> findTasksByAnticipater(User Anticipater);
}