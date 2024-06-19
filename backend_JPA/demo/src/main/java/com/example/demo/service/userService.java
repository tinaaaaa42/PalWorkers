package com.example.demo.service;

import com.example.demo.DTO.RegisterDto;
import com.example.demo.entity.User;

public interface userService {
    User findUserByUsername(String username);

    User findUserById(int id);

    boolean register(RegisterDto registerDto);
}
