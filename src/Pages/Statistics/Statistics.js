import React, { useState, useEffect } from "react";
import styles from "./Statistics.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Get, Post } from "../../Api/Unprotected";

const Statistics = () => {
  const [statistics, setStatistics] = useState([]);
  const [match_id, setMatch_id] = useState([]);
  const [st_types, setStTypes] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state || !location.state.m_id) {
      navigate("/Leagues");
      return;
    }
    localStorage.setItem("m_id", location.state.m_id);
    setMatch_id(location.state.m_id);

    const ff = async () => {
      const result = await Post("player_statistics/getMatchStatistics", {
        match_id: location.state.m_id,
      });
      if (!result || !result.length) return;

      const st_types = await Get("statistics_type");
      if (!st_types || !st_types.length) return;
      setStTypes(st_types);

      const players = [];
      result.forEach((ele) =>
        !players.find((e) => e.id == ele.p_id)
          ? players.push({
              id: ele.p_id,
              name: ele.name,
              position: ele.position,
              number: ele.number,
            })
          : {}
      );
      players.forEach((player) => {
        st_types.forEach((st) => {
          player[st.st_name] = result.find(
            (r) => r.p_id == player.id && r.st_id == st.st_id
          )
            ? result.find((r) => r.p_id == player.id && r.st_id == st.st_id)
                .value
            : "";
        });
      });

      console.log("players: ", players);
      setStatistics(players);
    };
    ff();
  }, []);

  return (
    <div>
      <h1> Players Statistics</h1>
      <table className={styles.table}>
        <thead className={styles.tableTh} >
          <tr  className={styles.tableTr}>
            <th className={styles.tableTh}>No</th>
            <th className={styles.tableTh}>Name</th>
            <th className={styles.tableTh}>Position</th>
            {st_types.map((ele, idx) => (
              <th className={styles.tableTh} key={idx}>{ele.st_name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {statistics.map((statistic, index) => (
            <tr className={styles.tableTr} key={index}>
              <td className={styles.tableTd}>{statistic.number}</td>
              <td className={styles.tableTd}>{statistic.name}</td>
              <td className={styles.tableTd}>{statistic.position}</td>
              {st_types.map((ele, idx) => (
                <td className={styles.tableTd} key={idx}>
                  {statistic[ele.st_name] ? statistic[ele.st_name] : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
