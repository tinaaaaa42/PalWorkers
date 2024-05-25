package com.example.demo.controller;

import com.example.demo.entity.Team;
import com.example.demo.entity.TeamMember;
import com.example.demo.service.teamService;
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

    @GetMapping(value = "api/tasks/team")
    public Team getTeam() {
        int teamId = 1;
        return teamService.findTeamById(teamId);
    }

    @GetMapping(value = "api/tasks/team/test")
    public List<TeamMember> getTeamsByUserId() {
        int userId = 1;
        return teamService.findTeamsByUserId(userId);
    }
}
