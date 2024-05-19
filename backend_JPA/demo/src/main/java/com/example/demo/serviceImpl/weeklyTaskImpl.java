package com.example.demo.serviceImpl;

import com.example.demo.DTO.WeeklyTaskDto;
import com.example.demo.entity.Tag;
import com.example.demo.entity.Task;
import com.example.demo.entity.TaskTag;
import com.example.demo.entity.WeeklyTask;
import com.example.demo.repository.TagRepository;
import com.example.demo.repository.TaskRepository;
import com.example.demo.repository.TaskTagRepository;
import com.example.demo.repository.WeeklyTaskRepository;
import com.example.demo.service.weeklyTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Repository
public class weeklyTaskImpl implements weeklyTaskService {

    @Autowired
    private WeeklyTaskRepository weeklyTaskRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private TaskTagRepository taskTagRepository;

    public List<WeeklyTask> findAll() {
        return weeklyTaskRepository.findAll();
    }

    public WeeklyTask addWeeklyTask(WeeklyTaskDto weeklyTaskDto) {
        WeeklyTask weeklyTask = new WeeklyTask();
        weeklyTask.setImportant(weeklyTaskDto.getImportant());
        weeklyTask.setUrgent(weeklyTaskDto.getUrgent());

        // Assuming TaskDto contains the necessary information for a Task entity
        Task task = new Task();
        task.setDescription(weeklyTaskDto.getTask().getDescription());
        task.setCreateDate(LocalDate.parse(weeklyTaskDto.getTask().getCreateDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        task.setDueDate(LocalDate.parse(weeklyTaskDto.getTask().getDueDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        task.setTitle(weeklyTaskDto.getTask().getTitle());
        task.setType(weeklyTaskDto.getTask().getType());


        // Save the task
        taskRepository.save(task);

        List<String> tags = weeklyTaskDto.getTask().getTags();
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
        weeklyTask.setTask(task);

        // Save the weeklyTask
        return weeklyTaskRepository.save(weeklyTask);
    }
}
