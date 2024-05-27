package com.example.demo.observerImpl;

import com.example.demo.observer.Observer;
import com.example.demo.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;

@Component
public class TaskExpireChecker implements Observer {
    @Autowired
    TaskRepository taskRepository;

    @Override
    public void update() {
        taskRepository.findAll().forEach(task -> {
            if ((task.getDueDate() != null && task.getDueDate().isBefore(LocalDate.now())) || (task.getDueDate() != null && task.getDueDate().isEqual(LocalDate.now()) && task.getDueTime() != null && task.getDueTime().isBefore(LocalTime.now()))) {
                System.out.println("Task " + task.getId() + " has expired");
                task.setExpired(true);
                taskRepository.save(task);
            }
        });
    }
}
