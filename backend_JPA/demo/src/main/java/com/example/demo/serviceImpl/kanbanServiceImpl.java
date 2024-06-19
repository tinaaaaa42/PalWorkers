package com.example.demo.serviceImpl;

import com.example.demo.DTO.KanbanTaskDto;
import com.example.demo.DTO.TaskDto;
import com.example.demo.entity.*;
import com.example.demo.repository.*;
import com.example.demo.service.kanbanTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
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

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    TeamTasksLeaderRepository teamTasksLeaderRepository;

    @Autowired
    TeamTasksAnticipaterRepository teamTasksAnticipaterRepository;

    public List<KanbanTask> findAll(int userId, LocalDate startDate, LocalDate endDate) {
        List<KanbanTask> kanbanTasks = kanbanTaskRepository.findByUserIdAndCreateDateBetween(userId,startDate,endDate);
        List<KanbanTask> result = new ArrayList<>();
        for (KanbanTask kanbanTask : kanbanTasks) {
            if (!kanbanTask.getInProject()) {
                result.remove(kanbanTask);
            }
        }
        return result;
//        return kanbanTaskRepository.findAllByUserId(userId);
    }

//    public KanbanTask addKanbanTask(KanbanTaskDto kanbanTaskDto, User user) {
//        KanbanTask kanbanTask = new KanbanTask();
//        kanbanTask.setState(kanbanTaskDto.getState());
//        kanbanTask.setUser(user);
//
//        // 创建 Task 实例，但不一定需要立即保存
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//        kanbanTask.setDescription(kanbanTaskDto.getTask().getDescription());
//        kanbanTask.setCreateDate(LocalDate.parse(kanbanTaskDto.getTask().getCreateDate(), formatter)); // 这里解析 create_date
//        kanbanTask.setDueDate(LocalDate.parse(kanbanTaskDto.getTask().getDueDate(),formatter));
//        kanbanTask.setTitle(kanbanTaskDto.getTask().getTitle());
//        kanbanTask.setType(kanbanTaskDto.getTask().getType());
//        kanbanTask.setExpired(false);
//
//
//        kanbanTaskRepository.save(kanbanTask);
//
//        List<String> tags = kanbanTaskDto.getTask().getTags();
//        Set<TaskTag> taskTags = new HashSet<>();
//        for (int i = 0; i < tags.size(); i++) {
//            String tag_name = tags.get(i);
//            Tag tag = tagRepository.findByName(tag_name);
//            if (tag == null) {
//                tag = new Tag();
//                tag.setName(tag_name);
//                tagRepository.save(tag);
//            }
//            TaskTag taskTag = new TaskTag();
//            taskTag.setTask(kanbanTask);
//            taskTag.setTag(tag);
//            taskTagRepository.save(taskTag);
//            taskTags.add(taskTag);
//        }
//        kanbanTask.setTaskTags(taskTags);
//
//        return kanbanTaskRepository.save(kanbanTask);
//    }

    @Override
    public List<KanbanTask> findteamTaskByUserId(User user,LocalDate start, LocalDate end) {
        List<KanbanTask> kanbanTasks = new ArrayList<>();
        List<TeamTasksLeader> leader_tasks = teamTasksLeaderRepository.findTasksByLeader(user);
        List<TeamTasksAnticipater> anticipaters_tasks = teamTasksAnticipaterRepository.findTasksByAnticipater(user);
        for (TeamTasksLeader leader_task : leader_tasks) {
            String type = leader_task.getTask().getType();
            LocalDate createDate = leader_task.getTask().getCreateDate();
            if (type.equals("kanban") && createDate.isBefore(end) && createDate.isAfter(start)) {
                int task_id = leader_task.getTask().getId();
                KanbanTask task = taskRepository.findKanbanTaskById(task_id);
                if (task != null && !(task.getInProject())) {
                    kanbanTasks.add(task);
                }
            }
        }
        for (TeamTasksAnticipater anticipater_task : anticipaters_tasks) {
            String type = anticipater_task.getTask().getType();
            LocalDate createDate = anticipater_task.getTask().getCreateDate();
            if (type.equals("kanban") && createDate.isBefore(end) && createDate.isAfter(start)) {
                int task_id = anticipater_task.getTask().getId();
                KanbanTask task = taskRepository.findKanbanTaskById(task_id);
                if (task != null && !task.getInProject()) {
                    kanbanTasks.add(task);
                }
            }
        }
        return kanbanTasks;
    }
}
