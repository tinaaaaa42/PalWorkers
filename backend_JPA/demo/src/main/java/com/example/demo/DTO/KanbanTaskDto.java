package com.example.demo.DTO;

import lombok.Data;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.demo.entity.KanbanTask}
 */
//@Value
@Data
public class KanbanTaskDto extends TaskDto {
//    TaskDto task;
    String state;

    public KanbanTaskDto() {
        this.setType("kanban");
    }
}