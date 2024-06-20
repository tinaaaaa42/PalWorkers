package com.example.demo.serviceImpl;

import com.example.demo.entity.Team;
import com.example.demo.entity.TeamMember;
import com.example.demo.entity.User;
import com.example.demo.repository.TeamMemberRepository;
import com.example.demo.repository.TeamRepository;
import com.example.demo.service.teamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

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
        List<TeamMember> teamMembers =  teamMemberRepository.findTeamsByUserId(userId);
        List<TeamMember> result = new ArrayList<TeamMember>();
        for (TeamMember teamMember : teamMembers) {
            boolean isLeader = teamMember.getLeader();
            if (isLeader) {
                result.add(teamMember);
            }
        }
        return result;
    }

    @Override
    public String  addTeamByName(String teamName, User user) {
        if (teamRepository.existsByName(teamName)){
            return null;
        }
        Team team = new Team();
        team.setName(teamName);
        teamRepository.save(team);
        TeamMember teamMember = new TeamMember();
        teamMember.setTeam(team);
        teamMember.setUser(user);
        teamMember.setLeader(true);
        teamMemberRepository.save(teamMember);

        String invitationCode;
        do {
            invitationCode = generateInvitationCode();
        } while (teamRepository.existsByInvitationCode(invitationCode));
        team.setInvitationCode(invitationCode);
        teamRepository.save(team);
        return invitationCode;
    }

    @Override
    public Team joinTeam(String invitationCode, User user) {
        Team team = teamRepository.findByInvitationCode(invitationCode);
        if (team == null) {
            return null;
        }
        TeamMember teamMember = new TeamMember();
        teamMember.setTeam(team);
        teamMember.setUser(user);
        teamMember.setLeader(false);
        teamMemberRepository.save(teamMember);
        return team;
    }

    private String generateInvitationCode() {
        return UUID.randomUUID().toString().substring(0, 6).toUpperCase();
    }
}
