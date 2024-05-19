package com.example.demo.controller;


import com.example.demo.DTO.KanbanTaskDto;
import com.example.demo.DTO.TaskDto;
import com.example.demo.entity.KanbanTask;
import com.example.demo.service.kanbanTaskService;
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
    public List<KanbanTask> getAllKanbanTask() {
        return kanbantaskService.findAll();
    }

    @PostMapping(value = "/api/tasks/kanban")
    public void addKanbanTask(@RequestBody KanbanTaskDto kanbanTaskDto) {
        kanbantaskService.addKanbanTask(kanbanTaskDto);
    }


}
