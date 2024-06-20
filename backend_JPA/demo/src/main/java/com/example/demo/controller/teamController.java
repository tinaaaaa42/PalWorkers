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

    @GetMapping(value = "api/tasks/all_team")
    public List<TeamMember> getAllTeamsByUserId(HttpSession session) {
        User user = (User) session.getAttribute("user");
        Integer userId = user.getId();
        if (userId == null) {
            throw new RuntimeException("User not logged in");
        }
        return teamService.findAllByUserId(userId);
    }

    @PostMapping(value = "api/tasks/create_team")
    public TeamDto createTeam(@RequestParam String teamName, HttpSession session) {
        User user = (User) session.getAttribute("user");
        Integer userId = user.getId();
        if (userId == null) {
            throw new RuntimeException("User not logged in");
        }
        String cookie = teamService.addTeamByName(teamName,user);
        TeamDto teamDto = new TeamDto();
        teamDto.setCookie(cookie);
        teamDto.setStatus(true);
        if (cookie == null) {
            teamDto.setStatus(false);
        }
        return teamDto;
    }

    @PostMapping(value = "api/tasks/join_team")
    public Team joinTeam(@RequestParam String invitationCode, HttpSession session) {
        User user = (User) session.getAttribute("user");
        Integer userId = user.getId();
        if (userId == null) {
            throw new RuntimeException("User not logged in");
        }
        System.out.println(invitationCode);
        return teamService.joinTeam(invitationCode, user);
    }
}
