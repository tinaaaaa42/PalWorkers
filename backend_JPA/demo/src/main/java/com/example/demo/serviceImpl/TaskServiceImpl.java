package com.example.demo.serviceImpl;

import com.example.demo.DTO.KanbanTaskDto;
import com.example.demo.DTO.TaskDto;
import com.example.demo.DTO.WeeklyTaskDto;
import com.example.demo.entity.*;
import com.example.demo.repository.*;
import com.example.demo.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Service
public class TaskServiceImpl implements TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TaskTagRepository taskTagRepository;

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private DailyTaskRepository dailyTaskRepository;

    @Autowired
    private WeeklyTaskRepository weeklyTaskRepository;

    @Autowired
    private KanbanTaskRepository kanbanTaskRepository;

    @Override
    public Task createTask(TaskDto taskDto) {
        Task task;
        switch (taskDto.getType().toLowerCase()) {
            case "daily":
                task = new DailyTask();
                break;
            case "weekly":
                task = new WeeklyTask();
                ((WeeklyTask) task).setImportant(((WeeklyTaskDto)taskDto).getImportant());
                ((WeeklyTask) task).setUrgent(((WeeklyTaskDto)taskDto).getUrgent());
                break;
            case "kanban":
                task = new KanbanTask();
                ((KanbanTask) task).setState(((KanbanTaskDto)taskDto).getState());
                break;
            default:
                System.out.println("Invalid task type");
                return null;
        }

        task.setId(taskDto.getTask_id());
        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setCreateDate(LocalDate.parse(taskDto.getCreateDate()));
        task.setDueDate(LocalDate.parse(taskDto.getDueDate()));
        task.setType(taskDto.getType());
        task.setExpired(taskDto.getExpired());

        Set<TaskTag> tags = new LinkedHashSet<>();
        for (String tagName : taskDto.getTags()) {
            Tag tag = tagRepository.findByName(tagName);
            if (tag == null) {
                tag = new Tag();
                tag.setName(tagName);
                tagRepository.save(tag);
            }
            TaskTag taskTag = new TaskTag();
            taskTag.setTag(tag);
            taskTag.setTask(task);
            tags.add(taskTag);
        }
        task.setTaskTags(tags);

        taskRepository.save(task);
        switch (taskDto.getType().toLowerCase()) {
            case "daily":
                assert task instanceof DailyTask;
                dailyTaskRepository.save((DailyTask) task);
                break;
            case "weekly":
                assert task instanceof WeeklyTask;
                weeklyTaskRepository.save((WeeklyTask) task);
                break;
            case "kanban":
                assert task instanceof KanbanTask;
                kanbanTaskRepository.save((KanbanTask) task);
                break;
        }
        return task;
    }
}
