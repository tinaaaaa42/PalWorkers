package com.example.demo.DTO;

import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.demo.entity.WeeklyTask}
 */
@Value
public class WeeklyTaskDto implements Serializable {
    TaskDto task;
    Boolean urgent;
    Boolean important;
}