package com.example.demo.controller;


import com.example.demo.DTO.RegisterDto;
import com.example.demo.service.userService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class userController {

    @Autowired
    private userService service;

    @PostMapping(value = "api/user/register")
    public boolean register(@RequestBody RegisterDto registerDto) {
        System.out.println(registerDto);
        return service.register(registerDto);
    }
}
