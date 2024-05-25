package com.example.demo.repository;

import com.example.demo.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeamRepository extends JpaRepository<Team, Integer> {
    Team findTeamById(int id);
}