package com.example.demo.controller;


import com.example.demo.DTO.KanbanTaskDto;
import com.example.demo.DTO.TaskDto;
import com.example.demo.entity.KanbanTask;
import com.example.demo.entity.User;
import com.example.demo.service.kanbanTaskService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class kanbanTaskController {

    @Autowired
    kanbanTaskService kanbantaskService;

    @GetMapping(value = "/api/tasks/kanban")
    public List<KanbanTask> getAllKanbanTask(HttpSession session) {
        User user = (User) session.getAttribute("user");
        Integer userId = user.getId();
        if (userId == null) {
            throw new RuntimeException("User not logged in");
        }
        return kanbantaskService.findAll(userId);
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
