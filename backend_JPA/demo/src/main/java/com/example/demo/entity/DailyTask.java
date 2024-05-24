package com.example.demo.entity;
//
//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
//import jakarta.persistence.*;
//import lombok.Getter;
//import lombok.Setter;
//
//@Getter
//@Setter
//@Entity
//@Table(name = "daily_tasks")
//public class DailyTask {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "daily_id", nullable = false)
//    private Long id;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "task_id")
//    @JsonIgnoreProperties("dailyTasks")
//    private Task task;
//
//}
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;


@Entity
@DiscriminatorValue("daily")
@Table(name = "daily_tasks")
public class DailyTask extends Task {

    // No additional fields for now

    // Getters and setters
}
