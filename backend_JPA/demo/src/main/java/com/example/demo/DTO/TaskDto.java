package com.example.demo.DTO;

import lombok.Data;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

/**
 * DTO for {@link com.example.demo.entity.Task}
 */
//@Value
@Data
public class TaskDto {
    int task_id;
    String title;
    String description;
    String createDate;
    String dueDate;
    String type;
    Boolean expired;
    List<String> tags;
}