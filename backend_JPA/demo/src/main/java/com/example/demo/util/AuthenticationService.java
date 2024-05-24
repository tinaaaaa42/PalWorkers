package com.example.demo.util;

import com.example.demo.DTO.LoginDto;
import com.example.demo.entity.User;
import com.example.demo.entity.UserAuth;
import com.example.demo.service.userService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    @Autowired
    private userService userService;

    public boolean authenticate(String username, String password) {
        // 这里应该添加用户名和密码的校验逻辑，比如查询数据库
        // 假设用户名是 "admin"，密码是 "password"
        return "admin".equals(username) && "password".equals(password);
    }

    public int login(LoginDto loginRequest, HttpSession session) {
        // 2 for successful, 0 for unmatched username && pwd, 1 for banned users
        User user = userService.findUserByUsername(loginRequest.getUsername());
        if (user != null) {
            UserAuth userAuth = user.getUserAuths().stream()
                    .filter(ua -> ua.getUser().equals(user)) // 找到与当前user关联的UserAuth实例
                    .findFirst()
                    .orElse(null);
            if (userAuth != null && userAuth.getPasswordHash().equals(loginRequest.getPassword())) {
                session.setAttribute("user", user);
                return 2;
            }
        }
        System.out.println("fail");
        return 0;
    }
}

