import React, { useEffect, useState } from "react";
import styles from "./EmployeeStatistics.module.css";
import { Get, Post } from "../../../Api/Unprotected";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeStatistics = () => {
  const [statisticsTypes, setStatisticsTypes] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [teamsLeagues, setTeamsLeagues] = useState([]);
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);

  const [selectedStatisticsType, setSelectedStatisticsType] = useState();
  const [selectedLeague, setSelectedLeague] = useState();
  const [selectedTeamLeague, setSelectedTeamLeague] = useState();
  const [selectedPlayer, setSelectedPlayer] = useState();
  const [selectedMatch, setSelectedMatch] = useState();
  const [statisticValue, setStatisticValue] = useState();

  useEffect(() => {
    const fetchStatisticsTypes = async () => {
      const res = await Get("statistics_type/");
      setStatisticsTypes(res);
    };

    const fetchLeagues = async () => {
      const res = await Get("leagues/");
      setLeagues(res);
    };

    fetchStatisticsTypes();
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

  const getPlayersOfTeam = async (team_league_id) => {
    if (team_league_id && team_league_id > 0) {
      const res = await Post("players/getPlayersOfTeam", {
        team_league_id: team_league_id,
      });
      setPlayers(res);
    }
    if (team_league_id == "") {
      setPlayers([]);
    }
  };
  const getMatchesOfTeam = async (team_league_id) => {
    if (team_league_id && team_league_id > 0) {
      const res = await Post("match_details/getPlayedMatchesOfTeam", {
        team_league_id: team_league_id,
      });
      setMatches(res);
    }
    if (team_league_id == "") {
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
      getMatchesOfTeam(selectedTeamLeague);
    }
  }, [selectedTeamLeague]);

  useEffect(
    () => console.log("selectedStatisticsType:  ", selectedStatisticsType),
    [selectedStatisticsType]
  );

  const saveStatistic = async () => {
    if (
      !selectedLeague ||
      !selectedTeamLeague ||
      !selectedPlayer ||
      !selectedStatisticsType ||
      !statisticValue
    )
      return;

    const res = await Post("player_statistics/", {
      match_id: selectedMatch,
      player_id: selectedPlayer,
      statistics_type_id: selectedStatisticsType,
      value: statisticValue,
    });
    console.log("res: ", res);
    if (res && res.id) {
      setLeagues([]);
      setTeamsLeagues([]);
      setPlayers([]);
      setMatches([]);

      setSelectedStatisticsType();
      setSelectedLeague();
      setSelectedTeamLeague();
      setSelectedPlayer();
      setSelectedMatch();
      setStatisticValue();

      toast.success("Statistic of the player submitted successfully!");
    } else {
      toast.error("There was error, please try again later!");

    }

    console.log(res);
  };

  const convertDate = (dt) => {
    const date = new Date(dt);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
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

        {matches && matches.length > 0 ? (
          <select
            className={styles.select}
            value={selectedMatch}
            onChange={(e) => setSelectedMatch(e.target.value)}
          >
            <option value="">Select Match</option>
            {matches.map((m) => (
              <option key={m.match_id} value={m.match_id}>
                {m.team_1_name} vs {m.team_2_name} at {convertDate(m.date)}:
                {m.time}
              </option>
            ))}
          </select>
        ) : (
          ""
        )}

        {players && players.length > 0 ? (
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
        ) : (
          ""
        )}

        <div className={styles.statisticsDiv}>
          <select
            className={styles.select}
            value={selectedStatisticsType}
            onChange={(e) => setSelectedStatisticsType(e.target.value)}
          >
            <option value="">Select Statistics Type</option>
            {statisticsTypes.map((statistics_type) => (
              <option
                key={statistics_type.statistics_type_id}
                value={statistics_type.statistics_type_id}
              >
                {statistics_type.st_name}
              </option>
            ))}
          </select>

          <label className={styles.label}>
            Statistic Value:
            <input
              className={styles.input}
              type="number"
              value={statisticValue}
              onChange={(e) => setStatisticValue(e.target.value)}
              required
            />
          </label>
        </div>
        <button
          className={styles.button}
          onClick={saveStatistic}
          disabled={
            !selectedLeague ||
            !selectedTeamLeague ||
            !selectedPlayer ||
            !selectedStatisticsType ||
            !statisticValue
          }
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EmployeeStatistics;
