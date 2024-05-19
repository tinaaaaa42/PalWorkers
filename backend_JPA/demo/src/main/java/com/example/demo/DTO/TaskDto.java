package com.example.demo.DTO;

import lombok.Value;

import java.io.Serializable;
import java.util.List;

/**
 * DTO for {@link com.example.demo.entity.Task}
 */
@Value
public class TaskDto implements Serializable {
    String title;
    String description;
    String createDate;
    String dueDate;
    String type;
    List<String> tags;
}