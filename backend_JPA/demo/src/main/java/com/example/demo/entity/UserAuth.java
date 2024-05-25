package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "user_auth")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // 忽略 Hibernate 代理相关属性
public class UserAuth {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "auth_id", nullable = false)
    private Integer id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
//    @JsonIgnoreProperties({"userAuth", "hibernateLazyInitializer", "handler"}) // 忽略 userAuth 属性和 Hibernate 代理属性
    private User user;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;
}
