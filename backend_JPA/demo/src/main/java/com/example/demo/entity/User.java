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
@Table(name = "users")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // 忽略 Hibernate 代理相关属性
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Integer id;

    @Column(name = "username", nullable = false, length = 30)
    private String username;

    @Column(name = "email_addr", nullable = false, length = 30)
    private String emailAddr;

    @Column(name = "avatar", length = 60)
    private String avatar;

    @Column(name = "notes")
    private String notes;

    @OneToMany(mappedBy = "user")
    @JsonIgnore // 忽略 tasks 属性，避免循环调用
    private Set<Task> tasks = new LinkedHashSet<>();

    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    @JsonIgnoreProperties({"user", "hibernateLazyInitializer", "handler"}) // 忽略 user 属性和 Hibernate 代理属性
    @JsonIgnore
    private UserAuth userAuth;
}
