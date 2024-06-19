package com.example.demo.serviceImpl;

import com.example.demo.entity.Note;
import com.example.demo.entity.Task;
import com.example.demo.repository.NotesRepository;
import com.example.demo.repository.TaskRepository;
import com.example.demo.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Set;

@Service
@Repository
public class NoteServiceImpl implements NoteService {
    @Autowired
    NotesRepository notesRepository;

    @Autowired
    TaskRepository taskRepository;

    @Override
    public boolean addNoteForTask(int taskId, String note) {
        Task task = taskRepository.findTaskById(taskId);
        if (task == null) {
            System.out.println("Task not found");
            return false;
        }
        Set<Note> notes = task.getNotes();
        Note newNote = new Note();
        newNote.setTask(task);
        newNote.setNote(note);
        newNote.setCreateDate(LocalDate.now());
        notes.add(newNote);
        task.setNotes(notes);
        taskRepository.save(task);
        notesRepository.save(newNote);
        return true;
    }
}
