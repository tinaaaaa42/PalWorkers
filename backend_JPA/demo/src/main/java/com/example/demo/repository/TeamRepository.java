package com.example.demo.repository;

import com.example.demo.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeamRepository extends JpaRepository<Team, Integer> {
    Team findTeamById(int id);

//
    Team save(Team team);

    Boolean existsByInvitationCode(String invitationCode);

    Boolean existsByName(String name);

    Team findByInvitationCode(String invitationCode);

//    Team addTeamByName(String teamName);
}