package com.example.demo.service;


import com.example.demo.DTO.ProjectDto;

import java.util.List;

public interface ProjectService {
    List<ProjectDto> findAllByUserId(int userId);

    ProjectDto findByUserIdAndProjectId(int userId, int projectId);
}
