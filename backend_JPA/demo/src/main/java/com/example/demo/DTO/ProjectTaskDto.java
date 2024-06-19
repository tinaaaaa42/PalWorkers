package com.example.demo.DTO;


import com.example.demo.entity.Task;
import lombok.Data;

@Data
public class ProjectTaskDto {
    Task task;
    String state;
}
