package com.example.demo.repository;

import com.example.demo.entity.TeamMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeamMemberRepository extends JpaRepository<TeamMember, Integer> {
    List<TeamMember> findTeamsByUserId(int userId);

    TeamMember findByteamIdAndUserId(int teamId, int userId);
}