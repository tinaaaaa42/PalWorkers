package com.example.demo.serviceImpl;


import com.example.demo.DTO.KanbanTaskDto;
import com.example.demo.DTO.ProjectDto;
import com.example.demo.DTO.ProjectTaskDto;
import com.example.demo.DTO.teamOrPrivateDto;
import com.example.demo.entity.*;
import com.example.demo.repository.*;
import com.example.demo.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

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

    @Autowired
    private TaskTagRepository taskTagRepository;

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private UserRepository userRepository;

    public teamOrPrivateDto getTeamOrPrivateDto(int projectId, int userId) {
        Project project = projectRepository.findById(projectId);
        Team team = project.getTeam();
        String tmp;
        if (team == null) {
            tmp = null;
        }
        else {
            tmp = team.getName();
        }
        teamOrPrivateDto teamOrPrivateDto = new teamOrPrivateDto();
        teamOrPrivateDto.setTeamName(tmp);
        return teamOrPrivateDto;
    }

    @Override
    public boolean getAuthority(int projectId, int userId) {
        Project project = projectRepository.findById(projectId);
        Team team = project.getTeam();
        if (team == null) {
            return true;
        }
        int teamId = team.getId();
        TeamMember teamMember = teamMemberRepository.findByteamIdAndUserId(teamId,userId);
        boolean isLeader = teamMember.getLeader();
        if (isLeader) {
            return true;
        }
        return false;
    }

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
        if (project.getTeam() != null) {
            projectDto.setTeamProject(true);
        }

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

            if (project.getTeam() != null) {
                Team team = project.getTeam();
                int teamId = team.getId();
                TeamMember teamMember = teamMemberRepository.findByteamIdAndUserId(teamId,userId);
                boolean isLeader = teamMember.getLeader();
                if (isLeader) {
                    projectTaskDtos.add(projectTaskDto);
                }
                else {
                    boolean flag = false;
                    List<TeamTasksAnticipater> teamTasksAnticipaters = teamTasksAnticipaterRepository.findByTaskId(taskId);
                    for (TeamTasksAnticipater teamTasksAnticipater : teamTasksAnticipaters) {
                        int cmp_userId = teamTasksAnticipater.getAnticipater().getId();
                        if (cmp_userId == userId) {
                            flag = true;
                            break;
                        }
                    }
                    if (flag) {
                        projectTaskDtos.add(projectTaskDto);
                    }
                }
            }
            else {
                projectTaskDtos.add(projectTaskDto);
            }
//            projectTaskDtos.add(projectTaskDto);
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
        if (team != null) {
            project.setTeam(team);
        } else {
            project.setUser(user);
        }
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
    public KanbanTask addKanbanTask(int projectId, KanbanTaskDto kanbanTaskDto, User user) {
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
        kanbanTask.setInProject(true);

        List<Team> teams = new ArrayList<>();
        for (Integer teamId : kanbanTaskDto.getTeamIds()) {
            Team team = teamRepository.findTeamById(teamId);
            if (team == null) {
                throw new IllegalArgumentException("Team not found");
            }
            teams.add(team);
            kanbanTask.setTeam(team);
        }

        if (kanbanTaskDto.getTeamIds() != null && kanbanTaskDto.getTeamIds().size() == 0) {
            kanbanTask.setUser(user);
        }
        kanbanTaskRepository.save(kanbanTask);
        Set<TeamTasksLeader> teamTasksLeaders = new LinkedHashSet<>();
        for (Team team : teams) {
            TeamTasksLeader teamTasksLeader = new TeamTasksLeader();
            teamTasksLeader.setTask(kanbanTask);
            teamTasksLeader.setLeader(user);
            teamTasksLeaderRepository.save(teamTasksLeader);
            teamTasksLeaders.add(teamTasksLeader);
        }
        kanbanTask.setTeamTasksLeaders(teamTasksLeaders);

        Set<TeamTasksAnticipater> teamTasksAnticipaters = new LinkedHashSet<>();
        for (int userId: kanbanTaskDto.getUserIds()) {
            User anticipater = userRepository.findUserById(userId);
            if (anticipater == null) {
                throw new IllegalArgumentException("User not found");
            }
            TeamTasksAnticipater teamTasksAnticipater = new TeamTasksAnticipater();
            teamTasksAnticipater.setTask(kanbanTask);
            teamTasksAnticipater.setAnticipater(anticipater);
            teamTasksAnticipaterRepository.save(teamTasksAnticipater);
            teamTasksAnticipaters.add(teamTasksAnticipater);
        }
        kanbanTask.setTeamTasksAnticipaters(teamTasksAnticipaters);

        Set<TaskTag> tags = new LinkedHashSet<>();
        if (kanbanTaskDto.getTags() != null) {
            for (String tagName : kanbanTaskDto.getTags()) {
                Tag tag = tagRepository.findByName(tagName);
                if (tag == null) {
                    tag = new Tag();
                    tag.setName(tagName);
                    tagRepository.save(tag);
                }
                TaskTag taskTag = new TaskTag();
                taskTag.setTag(tag);
                taskTag.setTask(kanbanTask);
                tags.add(taskTag);
                taskTagRepository.save(taskTag);
            }
        }

        kanbanTask.setTaskTags(tags);

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

    @Override
    public boolean deleteProject(int projectId) {
        Project project = projectRepository.findById(projectId);
        if (project == null) {
            return false;
        }

        projectRepository.delete(project);
        return true;
    }
}
