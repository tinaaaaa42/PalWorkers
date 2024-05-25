package com.example.demo.serviceImpl;

import com.example.demo.DTO.DailyTaskDto;
import com.example.demo.entity.*;
import com.example.demo.repository.*;
import com.example.demo.service.dailyTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class dailyTaskImpl implements dailyTaskService {
    @Autowired
    DailyTaskRepository dailyTaskRepository;

    @Autowired
    TagRepository tagRepository;

    @Autowired
    TaskTagRepository taskTagRepository;

    @Autowired
    private TeamTasksLeaderRepository teamTasksLeaderRepository;

    @Autowired
    private TeamTasksAnticipaterRepository teamTasksAnticipaterRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public List<DailyTask> findAll(int userId) {
        return dailyTaskRepository.findAllByUserId(userId);
    }

    @Override
    public DailyTask addDailyTask(DailyTaskDto dailyTaskDto, User user) {
        DailyTask dailyTask = new DailyTask();
        dailyTask.setDescription(dailyTaskDto.getTask().getDescription());
        dailyTask.setCreateDate(LocalDate.parse(dailyTaskDto.getTask().getCreateDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        dailyTask.setDueDate(LocalDate.parse(dailyTaskDto.getTask().getDueDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        dailyTask.setTitle(dailyTaskDto.getTask().getTitle());
        dailyTask.setType(dailyTaskDto.getTask().getType());
        dailyTask.setUser(user);
        dailyTask.setExpired(false);

        // Save the task
        dailyTaskRepository.save(dailyTask);

        List<String> tags = dailyTaskDto.getTask().getTags();
        Set<TaskTag> taskTags = new HashSet<>();
        for (int i = 0; i < tags.size(); i++) {
            String tag_name = tags.get(i);
            Tag tag = tagRepository.findByName(tag_name);
            if (tag == null) {
                tag = new Tag();
                tag.setName(tag_name);
                tagRepository.save(tag);
            }
            TaskTag taskTag = new TaskTag();
            taskTag.setTask(dailyTask);
            taskTag.setTag(tag);
            taskTagRepository.save(taskTag);
            taskTags.add(taskTag);
        }
        dailyTask.setTaskTags(taskTags);

        // Associate the task with the weeklyTask

        return dailyTaskRepository.save(dailyTask);
    }

    @Override
    public DailyTask updateDailyTask(DailyTaskDto dailyTaskDto, User user) {
        int task_id = dailyTaskDto.getTask().getTask_id();
        DailyTask dailyTask = dailyTaskRepository.findById(task_id).get();
        dailyTask.setDescription(dailyTaskDto.getTask().getDescription());
        dailyTask.setCreateDate(LocalDate.parse(dailyTaskDto.getTask().getCreateDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        dailyTask.setDueDate(LocalDate.parse(dailyTaskDto.getTask().getDueDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        dailyTask.setTitle(dailyTaskDto.getTask().getTitle());
        dailyTask.setType(dailyTaskDto.getTask().getType());
        dailyTask.setUser(user);
        dailyTask.setExpired(false);

        // Save the task
        dailyTaskRepository.save(dailyTask);

        List<String> tags = dailyTaskDto.getTask().getTags();
        Set<TaskTag> taskTags = new HashSet<>();
        for (int i = 0; i < tags.size(); i++) {
            String tag_name = tags.get(i);
            Tag tag = tagRepository.findByName(tag_name);
            if (tag == null) {
                tag = new Tag();
                tag.setName(tag_name);
                tagRepository.save(tag);
            }
            TaskTag taskTag = new TaskTag();
            taskTag.setTask(dailyTask);
            taskTag.setTag(tag);
            taskTagRepository.save(taskTag);
            taskTags.add(taskTag);
        }
        dailyTask.setTaskTags(taskTags);

        // Associate the task with the weeklyTask

        return dailyTaskRepository.save(dailyTask);
    }

    @Override
    public List<DailyTask> findteamtasksByUser(User user) {
        List<DailyTask> dailyTasks = new ArrayList<>();
        List<TeamTasksLeader> leader_tasks = teamTasksLeaderRepository.findTasksByLeader(user);
        List<TeamTasksAnticipater> anticipaters_tasks = teamTasksAnticipaterRepository.findTasksByAnticipater(user);
        for (TeamTasksLeader leader_task : leader_tasks) {
            String type = leader_task.getTask().getType();
            if (type.equals("daily")) {
                int task_id = leader_task.getTask().getId();
                dailyTasks.add(taskRepository.findDailyTaskById(task_id));
            }
        }
        for (TeamTasksAnticipater anticipater_task : anticipaters_tasks) {
            String type = anticipater_task.getTask().getType();
            if (type.equals("daily")) {
                int task_id = anticipater_task.getTask().getId();
                dailyTasks.add(taskRepository.findDailyTaskById(task_id));
            }
        }
        return dailyTasks;
    }
}
