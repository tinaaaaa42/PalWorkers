package com.example.demo.serviceImpl;

import com.example.demo.DTO.DailyTaskDto;
import com.example.demo.entity.DailyTask;
import com.example.demo.entity.Tag;
import com.example.demo.entity.Task;
import com.example.demo.entity.TaskTag;
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
    TaskRepository taskRepository;

    @Autowired
    TagRepository tagRepository;

    @Autowired
    TaskTagRepository taskTagRepository;

    @Override
    public List<DailyTask> findAll() {
        return dailyTaskRepository.findAll();
    }

    @Override
    public DailyTask addDailyTask(DailyTaskDto dailyTaskDto) {
        DailyTask dailyTask = new DailyTask();
        Task task = new Task();
        task.setDescription(dailyTaskDto.getTask().getDescription());
        task.setCreateDate(LocalDate.parse(dailyTaskDto.getTask().getCreateDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        task.setDueDate(LocalDate.parse(dailyTaskDto.getTask().getDueDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        task.setTitle(dailyTaskDto.getTask().getTitle());
        task.setType(dailyTaskDto.getTask().getType());


        // Save the task
        taskRepository.save(task);

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
            taskTag.setTask(task);
            taskTag.setTag(tag);
            taskTagRepository.save(taskTag);
            taskTags.add(taskTag);
        }
        task.setTaskTags(taskTags);

        // Associate the task with the weeklyTask
        dailyTask.setTask(task);

        return dailyTaskRepository.save(dailyTask);
    }
}
