package com.example.demo.controller;


import com.example.demo.DTO.ProjectDto;
import com.example.demo.entity.User;
import com.example.demo.service.ProjectService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class projectController {

    @Autowired
    ProjectService projectService;

    @GetMapping(value = "api/tasks/all_project")
    public List<ProjectDto> getAllProjects(HttpSession session) {
        User user = (User) session.getAttribute("user");
        Integer userId = user.getId();
        if (userId == null) {
            throw new RuntimeException("User not logged in");
        }
        projectService.findAllByTeamIdAndUserId(userId);
        return projectService.findAllByUserId(userId);
    }

    @GetMapping(value = "api/tasks/project")
    public ProjectDto getProject(HttpSession session, @RequestParam Integer projectId) {
        User user = (User) session.getAttribute("user");
        Integer userId = user.getId();
        if (userId == null) {
            throw new RuntimeException("User not logged in");
        }
        projectService.findAllByTeamIdAndUserId(userId);
        return projectService.findByUserIdAndProjectId(userId,projectId);
    }
}
