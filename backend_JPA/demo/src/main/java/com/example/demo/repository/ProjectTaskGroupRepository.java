package com.example.demo.repository;

import com.example.demo.entity.KanbanTask;
import com.example.demo.entity.Project;
import com.example.demo.entity.ProjectTaskGroup;
import com.example.demo.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectTaskGroupRepository extends JpaRepository<ProjectTaskGroup, Integer> {
    ProjectTaskGroup findByProjectAndTask(Project project, Task task);

    ProjectTaskGroup findByTaskId(int taskId);
}
