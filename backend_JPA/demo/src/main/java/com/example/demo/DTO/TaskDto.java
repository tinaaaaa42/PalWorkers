package com.example.demo.DTO;

import lombok.Value;

import java.io.Serializable;
import java.util.List;

/**
 * DTO for {@link com.example.demo.entity.Task}
 */
@Value
public class TaskDto implements Serializable {
    int task_id;
    String title;
    String description;
    String createDate;
    String dueDate;
    String type;
    Boolean expired;
    List<String> tags;
}