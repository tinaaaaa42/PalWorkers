package com.example.demo.serviceImpl;

import com.example.demo.DTO.KanbanTaskDto;
import com.example.demo.DTO.TaskDto;
import com.example.demo.entity.KanbanTask;
import com.example.demo.entity.Tag;
import com.example.demo.entity.Task;
import com.example.demo.entity.TaskTag;
import com.example.demo.repository.KanbanTaskRepository;
import com.example.demo.repository.TagRepository;
import com.example.demo.repository.TaskRepository;
import com.example.demo.repository.TaskTagRepository;
import com.example.demo.service.kanbanTaskService;
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
public class kanbanServiceImpl implements kanbanTaskService {
    @Autowired
    private KanbanTaskRepository kanbanTaskRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private TaskTagRepository taskTagRepository;

    public List<KanbanTask> findAll() {
        return kanbanTaskRepository.findAll();
    }

    public void addKanbanTask(KanbanTaskDto kanbanTaskDto) {
        KanbanTask kanbanTask = new KanbanTask();
        kanbanTask.setState(kanbanTaskDto.getState());

        // 创建 Task 实例，但不一定需要立即保存
        Task task = new Task();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        task.setDescription(kanbanTaskDto.getTask().getDescription());
        task.setCreateDate(LocalDate.parse(kanbanTaskDto.getTask().getCreateDate(), formatter)); // 这里解析 create_date
        task.setDueDate(LocalDate.parse(kanbanTaskDto.getTask().getDueDate(),formatter));
        task.setTitle(kanbanTaskDto.getTask().getTitle());
        task.setType(kanbanTaskDto.getTask().getType());

        taskRepository.save(task);

        List<String> tags = kanbanTaskDto.getTask().getTags();
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

        taskRepository.save(task);
        kanbanTask.setTask(task);
        kanbanTaskRepository.save(kanbanTask);
    }

}
