package com.example.demo.serviceImpl;

import com.example.demo.DTO.DailyTaskDto;
import com.example.demo.entity.*;
import com.example.demo.repository.DailyTaskRepository;
import com.example.demo.repository.TagRepository;
import com.example.demo.repository.TaskRepository;
import com.example.demo.repository.TaskTagRepository;
import com.example.demo.service.dailyTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
}
