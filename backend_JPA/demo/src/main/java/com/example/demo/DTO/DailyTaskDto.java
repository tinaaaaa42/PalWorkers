package com.example.demo.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.demo.entity.DailyTask}
 */
@Data
@NoArgsConstructor(force = true)
@AllArgsConstructor
@Value
public class DailyTaskDto implements Serializable {
    TaskDto task;

}