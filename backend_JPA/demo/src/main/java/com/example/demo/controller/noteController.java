package com.example.demo.controller;

import com.example.demo.DTO.NoteDTO;
import com.example.demo.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/note")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class noteController {
    @Autowired
    NoteService noteService;

    @PostMapping(value = "/add")
    public boolean addNoteForTask(@RequestBody NoteDTO noteDTO) {
        int taskId = noteDTO.getTask_id();
        String note = noteDTO.getNote();
        return noteService.addNoteForTask(taskId, note);
    }
}
