package com.example.demo.serviceImpl;

import com.example.demo.DTO.RegisterDto;
import com.example.demo.entity.User;
import com.example.demo.entity.UserAuth;
import com.example.demo.repository.UserAuthRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.userService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class userServiceImpl implements userService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserAuthRepository userAuthRepository;

    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User findUserById(int id) {
        return userRepository.findUserById(id);
    }

    @Override
    public boolean register(RegisterDto registerDto) {
        if (userRepository.existsByUsername(registerDto.getUsername())) {
            return false;
        }
        User user = new User();
        user.setUsername(registerDto.getUsername());
        user.setEmailAddr(registerDto.getEmail());
        UserAuth userAuth = new UserAuth();

        userAuth.setPasswordHash(registerDto.getPassword());

        userAuth.setUser(user);

        user.setUserAuth(userAuth);
        userRepository.save(user);
        return true;
    }
}
