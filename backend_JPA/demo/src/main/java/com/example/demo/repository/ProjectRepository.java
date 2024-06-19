package com.example.demo.repository;

import com.example.demo.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.sound.sampled.Port;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Integer> {
    List<Project> findAllByUserId(int UserId);

    Project findByUserIdAndId(int UserId,int ProjectId);

    List<Project> findAllByTeamId(int TeamId);

//    List<Project
    List<Project> findAllByUserIdAndCompleted(int UserId,boolean Completed);

    List<Project> findAllByTeamIdAndCompleted(int TeamId,boolean Completed);
    Project findById(int Id);
}