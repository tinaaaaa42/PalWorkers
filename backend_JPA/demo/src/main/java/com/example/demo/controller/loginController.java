package com.example.demo.controller;

import com.example.demo.DTO.LoginDto;
import com.example.demo.service.userService;
import com.example.demo.util.AuthenticationService;
import com.example.demo.util.SessionUtils;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class loginController {

    @Autowired
    private userService userService;

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/api/login")
    public String login(@RequestBody LoginDto loginRequest) {
        // 2 for successful, 0 for unmatched username && pwd, 1 for banned users
        System.out.println(loginRequest);
        HttpSession session = SessionUtils.getSession();
        int status = authenticationService.login(loginRequest, session);
        if(status == 2) {
            return "{\"status\": \"success\", \"token\": \"your_token_here\"}";
        }
        else if (status == 1){
            return "{\"status\": \"Banned\", \"message\": \"You are not allowed to login\"}";
        }
        return "{\"status\": \"fail\", \"message\": \"Unmatched username or password\"}";
    }

}
