package com.example.demo.serviceImpl;


import com.example.demo.DTO.KanbanTaskDto;
import com.example.demo.DTO.ProjectDto;
import com.example.demo.DTO.ProjectTaskDto;
import com.example.demo.entity.*;
import com.example.demo.repository.*;
import com.example.demo.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class projectServiceImpl implements ProjectService{

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectTaskGroupRepository projectTaskGroupRepository;

    @Autowired
    private TeamTasksAnticipaterRepository teamTasksAnticipaterRepository;

    @Autowired
    private TeamTasksLeaderRepository teamTasksLeaderRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private KanbanTaskRepository kanbanTaskRepository;

    @Autowired
    private TeamMemberRepository teamMemberRepository;

    public List<ProjectDto> findAllByUserId(int userId) {
        List<Project> projects = projectRepository.findAllByUserIdAndCompleted(userId,false);
        List<ProjectDto> projectDtos = new ArrayList<>();
        for (Project project : projects) {
            ProjectDto projectDto = new ProjectDto();
            projectDto.setId(project.getId());
            projectDto.setTitle(project.getTitle());
            projectDto.setTotal(project.getTotal());
            projectDto.setState(project.getState());
            projectDto.setDone(project.getDone());
            projectDto.setTeamProject(false);
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
//        Project project = projectRepository.findByUserIdAndId(userId, projectId);
        Project project = projectRepository.findById(projectId);
        if (project == null) {
            return null;
        }
        ProjectDto projectDto = new ProjectDto();
        projectDto.setId(project.getId());
        projectDto.setTitle(project.getTitle());
        projectDto.setTotal(project.getTotal());
        projectDto.setState(project.getState());
        projectDto.setDone(project.getDone());
        Set<ProjectTaskDto> projectTaskDtos = new HashSet<>();
        Set<ProjectTaskGroup> projectTaskGroups = project.getProjectTaskGroups();
        for (ProjectTaskGroup projectTaskGroup : projectTaskGroups) {
            Task task = projectTaskGroup.getTask();
            int taskId = task.getId();
            KanbanTask kanbanTask = taskRepository.findKanbanTaskById(taskId);
            String state = kanbanTask.getState();
            ProjectTaskDto projectTaskDto = new ProjectTaskDto();
            projectTaskDto.setTask(task);
            projectTaskDto.setState(state);
            projectTaskDtos.add(projectTaskDto);
        }
        projectDto.setProjectsTasks(projectTaskDtos);
        return projectDto;
    }

    @Override
    public List<ProjectDto> findAllByTeamIdAndUserId(int userId) {
        List<TeamMember> teamMembers = teamMemberRepository.findTeamsByUserId(userId);
        List<ProjectDto> projectDtos = new ArrayList<>();
        List<Project> projects = new ArrayList<>();
        for (TeamMember teamMember : teamMembers) {
            int teamId = teamMember.getTeam().getId();
            List<Project> tmp_projects = projectRepository.findAllByTeamIdAndCompleted(teamId,false);
            projects.addAll(tmp_projects);
        }
        for (Project project : projects) {
            ProjectDto projectDto = new ProjectDto();
            projectDto.setId(project.getId());
            projectDto.setTitle(project.getTitle());
            projectDto.setTotal(project.getTotal());
            projectDto.setState(project.getState());
            projectDto.setDone(project.getDone());
            projectDto.setTeamName(project.getTeam().getName());
            projectDto.setTeamProject(true);
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
    public boolean advanceProject(int projectId) {
        Project project = projectRepository.findById(projectId);
        if (project == null) {
            return false;
        }
        String state = project.getState();
        String next_state = alterState(state);
        project.setState(next_state);
        if (next_state.equals("totally completed")) {
            project.setCompleted(true);
        }
        projectRepository.save(project);
        return false;
    }

    private String alterState(String state) {
        if (state.equals("todo")) {
            return "inprogress";
        }
        else if (state.equals("inprogress")) {
            return "review";
        }
        else if (state.equals("review")) {
            return "done";
        }
        return "totally completed";
    }

    @Override
    public ProjectDto createProject(String title, User user, int teamId) {
        Team team = teamRepository.findById(teamId).orElse(null);
        Project project = new Project();
        project.setTitle(title);
        project.setUser(user);
        project.setTeam(team);
        project.setState("todo");
        project.setTotal(0);
        project.setDone(0);
        project.setCompleted(false);
        projectRepository.save(project);
        ProjectDto projectDto = new ProjectDto();
        projectDto.setId(project.getId());
        projectDto.setTitle(project.getTitle());
        projectDto.setTotal(project.getTotal());
        projectDto.setState(project.getState());
        projectDto.setDone(project.getDone());
        projectDto.setTeamProject(team != null);
        projectDto.setTeamName(team != null ? project.getTeam().getName() : null);
        return projectDto;
    }

    @Override
    public KanbanTask addKanbanTask(int projectId, KanbanTaskDto kanbanTaskDto) {
        Project project = projectRepository.findById(projectId);
        if (project == null) {
            return null;
        }
        KanbanTask kanbanTask = new KanbanTask();
        kanbanTask.setTitle(kanbanTaskDto.getTitle());
        kanbanTask.setDescription(kanbanTaskDto.getDescription());
        kanbanTask.setDueDate(LocalDate.parse(kanbanTaskDto.getDueDate()));
        kanbanTask.setCreateDate(LocalDate.parse(kanbanTaskDto.getCreateDate()));
        kanbanTask.setType(kanbanTaskDto.getType());
        kanbanTask.setExpired(kanbanTaskDto.getExpired() == null ? false : kanbanTaskDto.getExpired());
        kanbanTask.setState(kanbanTaskDto.getState());
        kanbanTask.setCompleted(false);
        kanbanTaskRepository.save(kanbanTask);

        Set<ProjectTaskGroup> projectTaskGroups = project.getProjectTaskGroups();
        ProjectTaskGroup projectTaskGroup = new ProjectTaskGroup();
        projectTaskGroup.setProject(project);
        projectTaskGroup.setTask(kanbanTask);

        projectTaskGroupRepository.save(projectTaskGroup);
        projectTaskGroups.add(projectTaskGroup);
        project.setProjectTaskGroups(projectTaskGroups);
        project.setTotal(project.getTotal() + 1);
        projectRepository.save(project);
        return kanbanTask;
    }

    @Override
    public KanbanTask updateKanbanTask(int projectId, KanbanTaskDto kanbanTaskDto) {
        Project project = projectRepository.findById(projectId);
        if (project == null) {
            return null;
        }
        KanbanTask kanbanTask = kanbanTaskRepository.findById(kanbanTaskDto.getTask_id()).orElse(null);
        if (kanbanTask == null) {
            return null;
        }
        kanbanTask.setTitle(kanbanTaskDto.getTitle());
        kanbanTask.setDescription(kanbanTaskDto.getDescription());
        kanbanTask.setDueDate(LocalDate.parse(kanbanTaskDto.getDueDate()));
        kanbanTask.setCreateDate(LocalDate.parse(kanbanTaskDto.getCreateDate()));
        kanbanTask.setType(kanbanTaskDto.getType());
        kanbanTask.setExpired(kanbanTaskDto.getExpired() == null ? false : kanbanTaskDto.getExpired());
        kanbanTask.setState(kanbanTaskDto.getState());
        kanbanTaskRepository.save(kanbanTask);
        return kanbanTask;
    }

    @Override
    public boolean deleteKanbanTask(int projectId, int taskId) {
        Project project = projectRepository.findById(projectId);
        if (project == null) {
            return false;
        }
        KanbanTask kanbanTask = kanbanTaskRepository.findById(taskId).orElse(null);
        if (kanbanTask == null) {
            return false;
        }
        Set<ProjectTaskGroup> projectTaskGroups = project.getProjectTaskGroups();
        ProjectTaskGroup projectTaskGroup = projectTaskGroupRepository.findByProjectAndTask(project, kanbanTask);
        projectTaskGroups.remove(projectTaskGroup);
        project.setProjectTaskGroups(projectTaskGroups);
        project.setTotal(project.getTotal() - 1);
        if (kanbanTask.getState().equals("done")) {
            project.setDone(project.getDone() - 1);
        }
        projectRepository.save(project);
        projectTaskGroupRepository.delete(projectTaskGroup);
        kanbanTaskRepository.delete(kanbanTask);
        return true;
    }
}
