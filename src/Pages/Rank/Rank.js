import React, { useState, useEffect } from "react";
import styles from "./Rank.module.css";
import { Get, PUT, Post } from "../../Api/Unprotected";

function RankPage() {
  const [teams, setTeams] = useState([]);
  const [league_id, setLeague_id] = useState();
  const [leagues, setLeagues] = useState([]);
  const [viewgrid, setViewGrid] = useState(false);

  const fetchLeagues = async () =>
    new Promise(async (resolve, reject) => {
      const res = await Get("leagues/");
      setLeagues(res);
      resolve();
    });

  const getMatches = () => new Promise(async(resolve,reject) =>  {
    const response = await Post("match_details/getPlayedMatchesOfLeague", {
      league_id: league_id,
    });
    if (!response || !response.length) return;
    resolve(response);
  })
  const updateResultInMatchDetails = async (matchDetails) => {
    for (const match of matchDetails) {
      //1 if team 1 won, 0 if team 2 won
      let result;
      if (match.team1_score > match.team2_score) {
        result = 1;
      } else {
        result = 0;
      }

      await PUT(`match_details/${match.match_id}`, {
        result,
      });
    }
  };

  const getLeagueTeams = async () =>
    new Promise(async (res, rej) => {
      const teams = await Post("teams_leagues/getTeamsOfLeague", { league_id });
      res(teams);
    });

  const updateTeamRanks = async (matchDetails) => {
    const teams = await getLeagueTeams();

    teams.forEach((team) => {
      //iza rbh 1, iza 5ser 0 => team.points: kam mara hl fry2 rbh
      team.points = matchDetails.filter(
        (match) =>
          (match.team1 == team.tl_id && match.result == 1) ||
          (match.team2 == team.tl_id && match.result == 0)
      ).length;
    });
    teams.sort((a, b) => b.points - a.points);

    for (let i = 0; i < teams.length; i++) {
      teams[i].rank = i + 1;
      await PUT(`teams_leagues/${teams[i].team_league_id}`, {
        rank: teams[i].rank,
        score: teams[i].points,
      });
    }
  };

  useEffect(() => {
    fetchLeagues();
  }, []);

  const getRank = async () => {
    setViewGrid(false);
    const matches = await getMatches();
    if (!matches) return;

    await updateResultInMatchDetails(matches);
    await updateTeamRanks(matches);


    const teams = await getLeagueTeams();
    setTeams(teams);
    setViewGrid(true);
  };

  return (
    <div>
      <h1>Team Rankings</h1>
      <label className={styles.label}>
        League:
        <select
          className={styles.select}
          value={league_id}
          onChange={(e) => setLeague_id(e.target.value)}
        >
          <option value="">Select League</option>
          {leagues.map((league) => (
            <option key={league.league_id} value={league.league_id}>
              {league.name}
            </option>
          ))}
        </select>
      </label>
      <button onClick={getRank}> View rank</button>
      {viewgrid ? (
        <table className={styles.table}>
          <thead className={styles.tableTh}>
            <tr className={styles.tableTh}>
              <th className={styles.tableTh}>Rank</th>
              <th className={styles.tableTh}>Team Name</th>
              <th className={styles.tableTh}>Score</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr className={styles.tableTr} key={team.id}>
                <td className={styles.tableTd}>{team.rank}</td>
                <td className={styles.tableTd}>{team.name}</td>
                <td className={styles.tableTd}>{team.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        ""
      )}
    </div>
  );
}

export default RankPage;
