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

import java.time.LocalDate;
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
    private Long id;

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

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"emailAddr", "notes","avatar"})
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;


    @OneToMany(mappedBy = "task")
    private Set<TeamTasksAnticipater> teamTasksAnticipaters = new LinkedHashSet<>();

    @OneToMany(mappedBy = "task")
    private Set<TeamTasksLeader> teamTasksLeaders = new LinkedHashSet<>();

}
