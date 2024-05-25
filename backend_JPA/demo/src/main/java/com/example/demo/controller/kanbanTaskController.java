package com.example.demo.controller;


import com.example.demo.DTO.KanbanTaskDto;
import com.example.demo.DTO.TaskDto;
import com.example.demo.entity.KanbanTask;
import com.example.demo.entity.Task;
import com.example.demo.entity.TeamTasksLeader;
import com.example.demo.entity.User;
import com.example.demo.repository.KanbanTaskRepository;
import com.example.demo.repository.TaskRepository;
import com.example.demo.repository.TeamTasksLeaderRepository;
import com.example.demo.service.kanbanTaskService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class kanbanTaskController {

    @Autowired
    kanbanTaskService kanbantaskService;

    @Autowired
    TeamTasksLeaderRepository teamTasksLeaderRepository;

    @Autowired
    KanbanTaskRepository kanbanTaskRepository;

    @Autowired
    TaskRepository taskRepository;

    @GetMapping(value = "/api/tasks/kanban")
    public List<KanbanTask> getAllKanbanTask(HttpSession session) {
        User user = (User) session.getAttribute("user");
        Integer userId = user.getId();
        if (userId == null) {
            throw new RuntimeException("User not logged in");
        }
        List<KanbanTask> kanbanTasks = new ArrayList<>();
        kanbanTasks.addAll(kanbantaskService.findAll(userId));
        List<TeamTasksLeader> leader_tasks = teamTasksLeaderRepository.findTasksByLeader(user);
        for (TeamTasksLeader leader_task : leader_tasks) {
            String type = leader_task.getTask().getType();
            if (type.equals("kanban")) {
                int task_id = leader_task.getTask().getId();
                KanbanTask tmp = taskRepository.findKanbanTaskById(task_id);
                kanbanTasks.add(tmp);
//                KanbanTask tmp = kanbanTaskRepository.findKanbanTaskByTaskId(task_id);
            }
        }
        return kanbanTasks;
    }

    @PostMapping(value = "/api/tasks/kanban")
    public KanbanTask addKanbanTask(@RequestBody KanbanTaskDto kanbanTaskDto, HttpSession session) {
        User user = (User) session.getAttribute("user");
        Integer userId = user.getId();
        if (userId == null) {
            throw new RuntimeException("User not logged in");
        }
        return kanbantaskService.addKanbanTask(kanbanTaskDto, user);
    }


}
