package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
@Table(name = "kanban_tasks")
public class KanbanTask extends Task{

//    @ManyToOne(fetch = FetchType.LAZY, optional = false)
//    @JoinColumn(name = "task_id", nullable = false)
//    @JsonIgnoreProperties("kanbanTasks")
//    private Task task;

    @Column(name = "state", nullable = false)
    private String state;


    @ColumnDefault("0")
    @Column(name = "in_project", nullable = false)
    private Boolean inProject = false;

}