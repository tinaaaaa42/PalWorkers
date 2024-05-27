package com.example.demo.serviceImpl;

import com.example.demo.DTO.WeeklyTaskDto;
import com.example.demo.entity.*;
import com.example.demo.repository.*;
import com.example.demo.service.weeklyTaskService;
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
public class weeklyTaskImpl implements weeklyTaskService {

    @Autowired
    private WeeklyTaskRepository weeklyTaskRepository;

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private TaskTagRepository taskTagRepository;

    @Autowired
    private TeamTasksLeaderRepository teamTasksLeaderRepository;

    @Autowired
    private TeamTasksAnticipaterRepository teamTasksAnticipaterRepository;

    @Autowired
    private TaskRepository taskRepository;

    public List<WeeklyTask> findAll(int userId) {
        return weeklyTaskRepository.findAllByUserId(userId);
    }

//    public WeeklyTask addWeeklyTask(WeeklyTaskDto weeklyTaskDto, User user) {
//        System.out.println(weeklyTaskDto);
//        WeeklyTask weeklyTask = new WeeklyTask();
//        weeklyTask.setImportant(weeklyTaskDto.getImportant());
//        weeklyTask.setUrgent(weeklyTaskDto.getUrgent());
//        weeklyTask.setUser(user);
//
//        // Assuming TaskDto contains the necessary information for a Task entity
//        weeklyTask.setDescription(weeklyTaskDto.getTask().getDescription());
//        weeklyTask.setCreateDate(LocalDate.parse(weeklyTaskDto.getTask().getCreateDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd")));
//        weeklyTask.setDueDate(LocalDate.parse(weeklyTaskDto.getTask().getDueDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd")));
//        weeklyTask.setTitle(weeklyTaskDto.getTask().getTitle());
//        weeklyTask.setType(weeklyTaskDto.getTask().getType());
////        weeklyTask.setExpired(weeklyTaskDto.getTask().getExpired());
//        weeklyTask.setExpired(false);
//
//        weeklyTaskRepository.save(weeklyTask);
//        List<String> tags = weeklyTaskDto.getTask().getTags();
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
//            taskTag.setTask(weeklyTask);
//            taskTag.setTag(tag);
//            taskTagRepository.save(taskTag);
//            taskTags.add(taskTag);
//        }
//        weeklyTask.setTaskTags(taskTags);
//
//        return weeklyTaskRepository.save(weeklyTask);
//    }

    @Override
    public List<WeeklyTask> findteamTasksByUser(User user) {
        List<WeeklyTask> weeklyTasks = new ArrayList<>();
        List<TeamTasksLeader> leader_tasks = teamTasksLeaderRepository.findTasksByLeader(user);
        List<TeamTasksAnticipater> anticipaters_tasks = teamTasksAnticipaterRepository.findTasksByAnticipater(user);
        for (TeamTasksLeader leader_task : leader_tasks) {
            String type = leader_task.getTask().getType();
            if (type.equals("weekly")) {
                int task_id = leader_task.getTask().getId();
                weeklyTasks.add(taskRepository.findWeeklyTaskById(task_id));
            }
        }
        for (TeamTasksAnticipater anticipater_task : anticipaters_tasks) {
            String type = anticipater_task.getTask().getType();
            if (type.equals("weekly")) {
                int task_id = anticipater_task.getTask().getId();
                weeklyTasks.add(taskRepository.findWeeklyTaskById(task_id));
            }
        }
        return weeklyTasks;
    }
}
