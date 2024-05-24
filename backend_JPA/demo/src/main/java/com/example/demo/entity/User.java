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
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Integer id;

    @Column(name = "username", nullable = false, length = 30)
    private String username;

    @Column(name = "email_addr", nullable = false, length = 30)
    private String emailAddr;

    @Column(name = "avatar", nullable = false, length = 60)
    private String avatar;

    @Column(name = "notes", nullable = false)
    private String notes;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private Set<Task> tasks = new LinkedHashSet<>();

    @OneToMany(mappedBy = "user")
//    @JsonIgnore
    private Set<UserAuth> userAuths = new LinkedHashSet<>();

}