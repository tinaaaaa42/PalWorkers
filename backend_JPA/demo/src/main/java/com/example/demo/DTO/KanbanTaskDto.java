package com.example.demo.DTO;

import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.demo.entity.KanbanTask}
 */
@Value
public class KanbanTaskDto implements Serializable {
    TaskDto task;
    String state;
}