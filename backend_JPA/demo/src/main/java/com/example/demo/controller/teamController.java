package com.example.demo.controller;

import com.example.demo.DTO.TeamDto;
import com.example.demo.entity.Team;
import com.example.demo.entity.TeamMember;
import com.example.demo.entity.User;
import com.example.demo.service.teamService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping(value = "api/tasks/create_team")
    public TeamDto createTeam(@RequestBody String teamName, HttpSession session) {
        User user = (User) session.getAttribute("user");
        Integer userId = user.getId();
        if (userId == null) {
            throw new RuntimeException("User not logged in");
        }
        String cookie = teamService.addTeamByName(teamName,user);
        TeamDto teamDto = new TeamDto();
        teamDto.setCookie(cookie);
        return teamDto;
    }

    @PostMapping(value = "api/tasks/join_team")
    public Team joinTeam(@RequestBody String invitationCode, HttpSession session) {
        User user = (User) session.getAttribute("user");
        Integer userId = user.getId();
        if (userId == null) {
            throw new RuntimeException("User not logged in");
        }
        return teamService.joinTeam(invitationCode, user);
    }
}
