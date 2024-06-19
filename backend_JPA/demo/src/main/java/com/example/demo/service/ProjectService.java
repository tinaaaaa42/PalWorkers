package com.example.demo.service;


import com.example.demo.DTO.KanbanTaskDto;
import com.example.demo.DTO.ProjectDto;
import com.example.demo.entity.KanbanTask;
import com.example.demo.entity.Team;
import com.example.demo.entity.User;

import java.util.List;

public interface ProjectService {
    List<ProjectDto> findAllByUserId(int userId);

    List<ProjectDto> findAllByTeamIdAndUserId(int userId);

    ProjectDto findByUserIdAndProjectId(int userId, int projectId);

    boolean advanceProject(int projectId);

    ProjectDto createProject(String title, User user, int teamId);

    KanbanTask addKanbanTask(int projectId, KanbanTaskDto kanbanTaskDto);

}
