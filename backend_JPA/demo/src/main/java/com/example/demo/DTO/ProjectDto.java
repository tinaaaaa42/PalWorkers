package com.example.demo.DTO;


import com.example.demo.entity.Task;
import lombok.Data;

import java.util.List;
import java.util.Set;


@Data
public class ProjectDto {
    int id;
    String title;
    int total;
    int done;
    boolean isTeamProject;
    String state;
    Set<Task> Tasks;
}
