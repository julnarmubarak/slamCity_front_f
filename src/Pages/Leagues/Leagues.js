import React, { useEffect } from "react";
import styles from "./Leagues.module.css";
import { useNavigate } from 'react-router-dom';
import { Get } from "../../Api/Unprotected";

const Leagues = () => {
  const [leagues, setLeagues] = React.useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeagues = async () => {
      const result = await Get("leagues");
      setLeagues(result);
    };
    fetchLeagues();
  }, []);

  const moveToTeam = (league_id) => {
    const data = { league_id };
    navigate('/Teams', { state: data });
  };

  return (
    <div
      className={styles.fullScreenBackground}
      style={{ backgroundImage: "url('l1.jpg')" }}
    >
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>Syrian Basketball League</h1>
        <div className={styles.buttonContainer}>
          {leagues.map((le) => (
            <button
              key={le.league_id}
              className={styles.button}
              onClick={() => moveToTeam(le.league_id)}
            >
              {le.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leagues;
