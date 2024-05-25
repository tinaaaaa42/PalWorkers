package com.example.demo.serviceImpl;

import com.example.demo.entity.Team;
import com.example.demo.entity.TeamMember;
import com.example.demo.repository.TeamMemberRepository;
import com.example.demo.repository.TeamRepository;
import com.example.demo.service.teamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class teamServiceImpl implements teamService {
    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private TeamMemberRepository teamMemberRepository;

    @Override
    public Team findTeamById(int id) {
        return teamRepository.findTeamById(id);
    }

    @Override
    public List<TeamMember> findTeamsByUserId(int userId) {
        return teamMemberRepository.findTeamsByUserId(userId);
    }
}
