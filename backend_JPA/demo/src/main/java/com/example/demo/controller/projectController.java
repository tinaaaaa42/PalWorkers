package com.example.demo.controller;


import com.example.demo.DTO.KanbanTaskDto;
import com.example.demo.DTO.ProjectDto;
import com.example.demo.entity.KanbanTask;
import com.example.demo.entity.User;
import com.example.demo.service.ProjectService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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
        List<ProjectDto> projectDtos = new ArrayList<>();
        projectDtos.addAll(projectService.findAllByTeamIdAndUserId(userId));
        projectDtos.addAll(projectService.findAllByUserId(userId));
        return projectDtos;
    }

    @GetMapping(value = "api/tasks/project")
    public ProjectDto getProject(HttpSession session, @RequestParam Integer projectId) {
        User user = (User) session.getAttribute("user");
        Integer userId = user.getId();
        if (userId == null) {
            throw new RuntimeException("User not logged in");
        }
        return projectService.findByUserIdAndProjectId(userId,projectId);
    }

    @PutMapping(value = "api/tasks/alterProjectState")
    public boolean alterProjectState(HttpSession session, @RequestParam int projectId) {
        User user = (User) session.getAttribute("user");
        Integer userId = user.getId();
        if (userId == null) {
            throw new RuntimeException("User not logged in");
        }
        return projectService.advanceProject(projectId);
    }

    @PostMapping(value = "api/project/create")
    public ProjectDto createProject(HttpSession session, @RequestParam String title, @RequestParam int teamId) {
        User user = (User) session.getAttribute("user");
        Integer userId = user.getId();
        if (userId == null) {
            throw new RuntimeException("User not logged in");
        }
        return projectService.createProject(title, user, teamId);
    }

    @PostMapping(value = "api/project/task")
    public KanbanTask addKanbanTask(HttpSession session, @RequestParam int projectId, @RequestBody KanbanTaskDto kanbanTaskDto) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            throw new RuntimeException("User not logged in");
        }
        return projectService.addKanbanTask(projectId, kanbanTaskDto);
    }

    @DeleteMapping(value = "api/project/task")
    public boolean deleteKanbanTask(HttpSession session, @RequestParam int projectId, @RequestParam int taskId) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            throw new RuntimeException("User not logged in");
        }
        return projectService.deleteKanbanTask(projectId, taskId);
    }
}
