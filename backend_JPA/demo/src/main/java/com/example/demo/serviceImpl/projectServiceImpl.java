package com.example.demo.serviceImpl;


import com.example.demo.DTO.ProjectDto;
import com.example.demo.entity.*;
import com.example.demo.repository.ProjectRepository;
import com.example.demo.repository.TeamMemberRepository;
import com.example.demo.repository.TeamTasksAnticipaterRepository;
import com.example.demo.repository.TeamTasksLeaderRepository;
import com.example.demo.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class projectServiceImpl implements ProjectService{
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private TeamTasksAnticipaterRepository teamTasksAnticipaterRepository;

    @Autowired
    private TeamTasksLeaderRepository teamTasksLeaderRepository;

    @Autowired
    private TeamMemberRepository teamMemberRepository;

    public List<ProjectDto> findAllByUserId(int userId) {
        List<Project> projects = projectRepository.findAllByUserId(userId);
        List<ProjectDto> projectDtos = new ArrayList<>();
        for (Project project : projects) {
            ProjectDto projectDto = new ProjectDto();
            projectDto.setId(project.getId());
            projectDto.setTitle(project.getTitle());
            projectDto.setTotal(project.getTotal());
            projectDto.setState(project.getState());
            projectDto.setDone(project.getDone());
            Set<Task> tasks = new HashSet<>();
            Set<ProjectTaskGroup> projectTaskGroups = project.getProjectTaskGroups();
            for (ProjectTaskGroup projectTaskGroup : projectTaskGroups) {
                Task task = projectTaskGroup.getTask();
                tasks.add(task);
            }
            projectDto.setTasks(tasks);
            projectDtos.add(projectDto);
        }
        return projectDtos;
    }

    @Override
    public ProjectDto findByUserIdAndProjectId(int userId, int projectId) {
        Project project = projectRepository.findByUserIdAndId(userId, projectId);
        if (project == null) {
            return null;
        }
        ProjectDto projectDto = new ProjectDto();
        projectDto.setId(project.getId());
        projectDto.setTitle(project.getTitle());
        projectDto.setTotal(project.getTotal());
        projectDto.setState(project.getState());
        projectDto.setDone(project.getDone());
        Set<Task> tasks = new HashSet<>();
        Set<ProjectTaskGroup> projectTaskGroups = project.getProjectTaskGroups();
        for (ProjectTaskGroup projectTaskGroup : projectTaskGroups) {
            Task task = projectTaskGroup.getTask();
            tasks.add(task);
        }
        projectDto.setTasks(tasks);
        return projectDto;
    }

    @Override
    public List<ProjectDto> findAllByTeamIdAndUserId(int userId) {
        List<TeamMember> teamMembers = teamMemberRepository.findTeamsByUserId(userId);
        List<ProjectDto> projectDtos = new ArrayList<>();
        for (TeamMember teamMember : teamMembers) {
            System.out.println(teamMember.getTeam().getName());
            int teamId = teamMember.getTeam().getId();

        }
        return null;
    }
}
