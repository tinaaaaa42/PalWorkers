package com.example.demo.serviceImpl;

import com.example.demo.DTO.KanbanTaskDto;
import com.example.demo.DTO.TaskDto;
import com.example.demo.entity.*;
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
    private TagRepository tagRepository;

    @Autowired
    private TaskTagRepository taskTagRepository;

    public List<KanbanTask> findAll(int userId) {
        return kanbanTaskRepository.findAllByUserId(userId);
    }

    public KanbanTask addKanbanTask(KanbanTaskDto kanbanTaskDto, User user) {
        KanbanTask kanbanTask = new KanbanTask();
        kanbanTask.setState(kanbanTaskDto.getState());
        kanbanTask.setUser(user);

        // 创建 Task 实例，但不一定需要立即保存
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        kanbanTask.setDescription(kanbanTaskDto.getTask().getDescription());
        kanbanTask.setCreateDate(LocalDate.parse(kanbanTaskDto.getTask().getCreateDate(), formatter)); // 这里解析 create_date
        kanbanTask.setDueDate(LocalDate.parse(kanbanTaskDto.getTask().getDueDate(),formatter));
        kanbanTask.setTitle(kanbanTaskDto.getTask().getTitle());
        kanbanTask.setType(kanbanTaskDto.getTask().getType());
        kanbanTask.setExpired(false);


        kanbanTaskRepository.save(kanbanTask);

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
            taskTag.setTask(kanbanTask);
            taskTag.setTag(tag);
            taskTagRepository.save(taskTag);
            taskTags.add(taskTag);
        }
        kanbanTask.setTaskTags(taskTags);

        return kanbanTaskRepository.save(kanbanTask);
    }

}
