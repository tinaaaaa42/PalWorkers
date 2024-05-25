package com.example.demo.controller;

import com.example.demo.entity.Team;
import com.example.demo.entity.TeamMember;
import com.example.demo.entity.User;
import com.example.demo.service.teamService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class teamController {
    @Autowired
    private teamService teamService;

    @GetMapping(value = "api/tasks/team/test")
    public Team getTeamById(@RequestBody int teamId) {
        return teamService.findTeamById(teamId);
    }

    @GetMapping(value = "api/tasks/team")
    public List<TeamMember> getTeamsByUserId(HttpSession session) {
        User user = (User) session.getAttribute("user");
        Integer userId = user.getId();
        if (userId == null) {
            throw new RuntimeException("User not logged in");
        }
        return teamService.findTeamsByUserId(userId);
    }
}
