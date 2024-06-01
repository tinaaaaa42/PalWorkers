package com.example.demo.serviceImpl;

import com.example.demo.DTO.KanbanTaskDto;
import com.example.demo.DTO.TaskDto;
import com.example.demo.DTO.WeeklyTaskDto;
import com.example.demo.entity.*;
import com.example.demo.repository.*;
import com.example.demo.service.TaskService;
import com.example.demo.util.SessionUtils;
import jakarta.servlet.http.HttpSession;
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
        int task_id = taskDto.getTask_id();
        String title = taskDto.getTitle();
        String description = taskDto.getDescription();
        String createDate = taskDto.getCreateDate();
        String dueDate = taskDto.getDueDate();
        String type = taskDto.getType();
        Boolean expired = taskDto.getExpired();

        if (title == null) {
            throw new IllegalArgumentException("Title cannot be null");
        }
        if (createDate == null) {
            throw new IllegalArgumentException("Create date cannot be null");
        }
        if (type == null) {
            throw new IllegalArgumentException("Type cannot be null");
        }
        if (expired == null) {
            expired = false;
        }

        switch (type.toLowerCase()) {
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
                throw new IllegalArgumentException("Invalid task type");
        }

        HttpSession session = SessionUtils.getSession();
        User user = (User) session.getAttribute("user");

        task.setUser(user);
        task.setId(task_id);
        task.setTitle(title);
        task.setDescription(description);
        task.setCreateDate(LocalDate.parse(createDate));
        task.setDueDate(LocalDate.parse(dueDate));
        task.setType(type);
        task.setExpired(expired);
        task.setCompleted(false);

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
        switch (type.toLowerCase()) {
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

