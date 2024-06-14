// TeamSelector.js
import React, { useState } from 'react';

const TeamSelector = ({ onTeamSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState('');
  const teams = ['Team A', 'Team B', 'Team C']; // 示例团队列表

  const toggleSelector = () => {
    setIsOpen(!isOpen);
  };

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
    if (onTeamSelect) {
      onTeamSelect(team);
    }
    setIsOpen(false);
  };

  return (
    <div className="team-selector-container">
      <button className="team-selector-button" onClick={toggleSelector}>
        {selectedTeam || 'Select a Team'}
      </button>
      {isOpen && (
        <div className="team-selector">
          {teams.map((team, index) => (
            <span
              key={index}
              className={`team-option ${selectedTeam === team ? 'selected' : ''}`}
              onClick={() => handleTeamSelect(team)}
              style={{ display: 'inline-block', margin: '0 10px 5px 0' }}
            >
              {team}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamSelector;