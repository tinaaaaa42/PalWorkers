package com.example.demo.service;


import com.example.demo.DTO.ProjectDto;
import com.example.demo.entity.User;

import java.util.List;

public interface ProjectService {
    List<ProjectDto> findAllByUserId(int userId);

    List<ProjectDto> findAllByTeamIdAndUserId(int userId);

    ProjectDto findByUserIdAndProjectId(int userId, int projectId);
}
