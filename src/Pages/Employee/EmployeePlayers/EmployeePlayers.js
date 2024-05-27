import React, { useEffect, useState } from "react";
import styles from "./EmployeePlayers.module.css";
import { Get, Post } from "../../../Api/Protected";
import { toast } from "react-toastify";

const EmployeePlayers = () => {
  const [teamsLeagues, setTeamsLeagues] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState();
  const [selectedTeamLeague, setSelectedTeamLeague] = useState();
  const [Name, setName] = useState("");
  const [Position, setPosition] = useState("");

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
        league_id: selectedLeague,
      });
      setTeamsLeagues(res);
    }
    if (league_id == "") {
      setTeamsLeagues([]);
    }
  };

  useEffect(() => {
    if (selectedLeague) {
      getTeamsOfLeague(selectedLeague);
    }
  }, [selectedLeague]);

  // useEffect(() => {
  //   if (selectedTeamLeague) {
  //     getPlayersOfTeam(selectedTeamLeague)
  //   }
  // }, [selectedTeamLeague]);

  const savePlayer = async () => {
    if (!selectedLeague || !selectedTeamLeague || !Name || !Position) {
      return;
    }

    const player = {
      team_league_id: selectedTeamLeague,
      league_id: selectedLeague,
      name: Name,
      position: Position,
    };

    try {
      const res = await Post("players", player);
      if (res && res.id) {
        setName("");
        setPosition("");

        toast.success("Player has been added!");
      } else {
        toast.error("There was error, please try again later!");
      }
    } catch (error) {
      console.error("Error adding player:", error);
    }
  };

  return (
    <div className={styles.div}>
      <div className={styles.container}>
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
        {teamsLeagues && teamsLeagues.length > 0 ? (
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
        ) : (
          ""
        )}

        <label className={styles.label}>
          Name:
          <input
            className={styles.input}
            type="text"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label className={styles.label}>
          Position:
          <input
            className={styles.input}
            type="text"
            value={Position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </label>
        <button
          className={styles.button}
          type="button"
          onClick={savePlayer}
          disabled={
            !selectedLeague || !selectedTeamLeague || !Name || !Position
          }
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EmployeePlayers;
