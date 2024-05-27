import React, { useState, useEffect } from "react";
import styles from "./PlayersTable.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { Post } from "../../Api/Unprotected";

const PlayersTable = () => {
  const [players, setPlayers] = useState([]);
  const [team_league_id, setTeamLeagueId] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state || !location.state.team_league_id) {
      navigate("/Leagues");
      return;
    }
    localStorage.setItem("team_league_id", location.state.team_league_id);
    setTeamLeagueId(location.state.team_league_id);

    const ff = async () => {
      const result = await Post("players/getPlayersOfTeam", {
        team_league_id: location.state.team_league_id,
      });
      console.log("result: ", result);
      setPlayers(result);
    };
    ff();
  }, []);


  const handleButtonClick = () => {
    const data = { team_league_id: team_league_id };
    navigate('/Matches', { state: data });
  };

  return (
    <div>
      <h1>Basketball Team Players</h1>
      <table className={styles.table}>
        <thead className={styles.tableTh}>
          <tr className={styles.tableTr}>
            <th className={styles.tableTh}>Name</th>
            <th className={styles.tableTh}>Number</th>
            <th className={styles.tableTh}>Position</th>
            {/* <th className={styles.tableTh}>View statistics</th> */}
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr className={styles.tableTr} key={index}>
              <td className={styles.tableTd}>{player.name}</td>
              <td className={styles.tableTd}>{player.number}</td>
              <td className={styles.tableTd}>{player.position}</td>
              {/* <td
                className={styles.tableTd + " " + styles.eyeIcon}
                onClick={() => openPlayerStatistics(player.p_id)}
              >
                <FaEye />{" "}
              </td>
               */}
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
  );
};

export default PlayersTable;
