package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id", nullable = false)
    private Integer id;

    @Column(name = "title", length = 100)
    private String title;

    @Column(name = "total")
    private Integer total;

    @Column(name = "state", length = 100)
    private String state;

    @OneToMany(mappedBy = "project")
    private Set<ProjectTaskGroup> projectTaskGroups = new LinkedHashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @Column(name = "done")
    private Integer done;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

}