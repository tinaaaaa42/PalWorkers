package com.example.demo.observerImpl;

import com.example.demo.observer.Observer;
import com.example.demo.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class TaskExpireChecker implements Observer {
    @Autowired
    TaskRepository taskRepository;

    @Override
    public void update() {
        taskRepository.findAll().forEach(task -> {
            if (task.getDueDate().isBefore(LocalDate.now())) {
                System.out.println("Task " + task.getId() + " has expired");
                task.setExpired(true);
                taskRepository.save(task);
            }
        });
    }
}
