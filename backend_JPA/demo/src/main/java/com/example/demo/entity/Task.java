package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id", nullable = false)
    private int id;

    @Column(name = "title", nullable = false)
    private String title;

    @Lob
    @Column(name = "description")
    private String description;

    @Column(name = "create_date", nullable = false)
    private LocalDate createDate;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Lob
    @Column(name = "type", nullable = false)
    private String type;

//    @OneToMany(mappedBy = "task", fetch = FetchType.LAZY, cascade = CascadeType.ALL , orphanRemoval = true)
//    private Set<KanbanTask> kanbanTasks = new LinkedHashSet<>();

    @OneToMany(mappedBy = "task")
    @JsonIgnoreProperties("task")
    private Set<TaskTag> taskTags = new LinkedHashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"emailAddr", "notes","avatar"})
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;


    @OneToMany(mappedBy = "task")
    private Set<TeamTasksAnticipater> teamTasksAnticipaters = new LinkedHashSet<>();

    @OneToMany(mappedBy = "task")
    private Set<TeamTasksLeader> teamTasksLeaders = new LinkedHashSet<>();

    @ColumnDefault("0")
    @Column(name = "expired", nullable = false)
    private Boolean expired;

    @ColumnDefault("0")
    @Column(name = "completed", nullable = false)
    private Boolean completed;

    @Column(name = "due_time")
    private LocalTime dueTime;

    public Task(Task task) {
        this.id = task.getId();
        this.title = task.getTitle();
        this.description = task.getDescription();
        this.createDate = task.getCreateDate();
        this.dueDate = task.getDueDate();
        this.type = task.getType();
        this.taskTags = task.getTaskTags();
        this.user = task.getUser();
        this.team = task.getTeam();
        this.teamTasksAnticipaters = task.getTeamTasksAnticipaters();
        this.teamTasksLeaders = task.getTeamTasksLeaders();
        this.expired = task.getExpired();
        this.dueTime = task.getDueTime();
    }

}
