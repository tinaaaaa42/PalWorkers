package com.example.demo.service;

import com.example.demo.entity.Team;
import com.example.demo.entity.TeamMember;
import com.example.demo.entity.User;

import java.util.List;

public interface teamService {
    Team findTeamById(int id);

    List<TeamMember> findTeamsByUserId(int userId);

    String addTeamByName(String teamName, User user);
}
