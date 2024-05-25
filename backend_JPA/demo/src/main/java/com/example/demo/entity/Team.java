package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "teams")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // 忽略 Hibernate 代理相关属性
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_id", nullable = false)
    private int id;

    @Column(name = "name", nullable = false, length = 60)
    private String name;

    @Column(name = "invitation_code", length = 6)
    private String invitationCode;

    @OneToMany(mappedBy = "team")
    @JsonIgnore
    private Set<Task> tasks = new LinkedHashSet<>();

    @OneToMany(mappedBy = "team")
//    @JsonIgnore
    @JsonIgnoreProperties("team")
    private Set<TeamMember> teamMembers = new LinkedHashSet<>();

}