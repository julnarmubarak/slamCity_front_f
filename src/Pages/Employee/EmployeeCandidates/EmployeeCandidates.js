import React, { useEffect, useState } from "react";
import styles from "./EmployeeCandidates.module.css";
import { Get, Post } from "../../../Api/Unprotected";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeCandidates = () => {
  const [leagues, setLeagues] = useState([]);
  const [teamsLeagues, setTeamsLeagues] = useState([]);
  const [players, setPlayers] = useState([]);

  const [selectedLeague, setSelectedLeague] = useState("");
  const [selectedTeamLeague, setSelectedTeamLeague] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState("");

  useEffect(() => {
    const fetchLeagues = async () => {
      const res = await Get("leagues/");
      setLeagues(res);
    };
    fetchLeagues();
  }, []);

  const getTeamsOfLeague = async (league_id) => {
    if (league_id && league_id > 0) {
      const res = await Post("teams_leagues/getTeamsOfLeague", {
        league_id: league_id,
      });
      setTeamsLeagues(res);
    } else {
      setTeamsLeagues([]);
    }
  };

  const getPlayersOfTeam = async (team_league_id) => {
    if (team_league_id && team_league_id > 0) {
      const res = await Post("players/getPlayersOfTeam", {
        team_league_id: team_league_id,
      });
      setPlayers(res);
    } else {
      setPlayers([]);
    }
  };

  useEffect(() => {
    if (selectedLeague) {
      getTeamsOfLeague(selectedLeague);
    }
  }, [selectedLeague]);

  useEffect(() => {
    if (selectedTeamLeague) {
      getPlayersOfTeam(selectedTeamLeague);
    }
  }, [selectedTeamLeague]);

  const saveCandidate = async () => {
    if (!selectedPlayer) return;

    const res = await Post("candidate/", {
      player_id: selectedPlayer,
    });

    if (res && res.id) {
      setLeagues([]);
      setTeamsLeagues([]);
      setPlayers([]);
      setSelectedLeague("");
      setSelectedTeamLeague("");
      setSelectedPlayer("");

      toast.success("Candidate has been saved successfully!");
    } else {
      toast.error("There was an error, please try again later!");
    }
  };

  return (
    <div className={styles.div}>
      <div className={styles.container}>
        <label className={styles.label}>
          Select League
          <select
            className={styles.select}
            value={selectedLeague}
            onChange={(e) => setSelectedLeague(e.target.value)}
          >
            <option value="">Select League</option>
            {leagues.map((league) => (
              <option key={league.league_id} value={league.league_id}>
                {league.name}
              </option>
            ))}
          </select>
        </label>

        {teamsLeagues && teamsLeagues.length > 0 && (
          <label className={styles.label}>
            Select Team League
            <select
              className={styles.select}
              value={selectedTeamLeague}
              onChange={(e) => setSelectedTeamLeague(e.target.value)}
            >
              <option value="">Select Team League</option>
              {teamsLeagues.map((teamLeague) => (
                <option
                  key={teamLeague.team_league_id}
                  value={teamLeague.team_league_id}
                >
                  {teamLeague.name}
                </option>
              ))}
            </select>
          </label>
        )}

        {players && players.length > 0 && (
          <label className={styles.label}>
            Select Player
            <select
              className={styles.select}
              value={selectedPlayer}
              onChange={(e) => setSelectedPlayer(e.target.value)}
            >
              <option value="">Select Player</option>
              {players.map((player) => (
                <option key={player.p_id} value={player.p_id}>
                  {player.name}
                </option>
              ))}
            </select>
          </label>
        )}

        <button
          className={styles.button}
          onClick={saveCandidate}
          disabled={!selectedPlayer}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EmployeeCandidates;
