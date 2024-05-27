package com.example.demo.DTO;

import lombok.Data;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.demo.entity.WeeklyTask}
 */
//@Value
@Data
public class WeeklyTaskDto extends TaskDto  {
//    TaskDto task;
    Boolean urgent;
    Boolean important;

    public WeeklyTaskDto() {
        this.setType("weekly");
    }
}