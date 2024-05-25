package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
@Table(name = "weekly_tasks")
public class WeeklyTask extends Task{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "weekly_id", nullable = false)
    private int id;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "task_id")
//    @JsonIgnoreProperties("weeklyTasks")
//    private Task task;

    @Column(name = "urgent", nullable = false)
    private Boolean urgent = false;

    @Column(name = "important", nullable = false)
    private Boolean important = false;

}