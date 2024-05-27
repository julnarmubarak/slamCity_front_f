import React, { useEffect, useState } from "react";
import styles from "./Teams.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Post } from "../../Api/Unprotected";

export default function WTeams() {
  const location = useLocation();
  const [league_id, setLeague_id] = useState();

  const [Cards, setCards] = useState([]);

  const navigate = useNavigate();

  const moveToPlayers = (team_league_id) => {
    const data = { team_league_id };
    navigate("/PlayersTable", { state: data });
  };

  const moveToMatches = (team_league_id) => {
    const data = { team_league_id };
    navigate("/Matches", { state: data });
  };

  useEffect(() => {

    if (!location.state || !location.state.league_id) {
      navigate("/Leagues");
      return;
    }
    localStorage.setItem("league_id", location.state.league_id);
    setLeague_id(location.state.league_id);

    const ff = async () => {
      const result = await Post("teams_leagues/getTeamsOfLeague", {
        league_id: location.state.league_id,
      });
      if (!result || !result.length) return;
      setCards(result);
    };
    ff();
  }, []);

  return (
    <div className={styles.body}>
      <section className={styles.section}>
        <div className={styles.container}>
          <h1>League teams</h1>
          <div className={styles.cards}>
            {Cards.map((card, i) => (
              <div key={i} className={styles.card}>
                <h3>{card.name}</h3>
                {/* zbty l style hon iza bdk */}
                <p>Rank: {card.rank}</p>

                <img
                  src={card.photo_path}
                  alt={card.name}
                  className={styles.image}
                />
                <div className={styles.buttonContainer}>
                <button
                  onClick={() => moveToPlayers(card.team_league_id)}
                  className={styles.btn}
                >
                  Players
                </button>
                <button
                  onClick={() => moveToMatches(card.team_league_id)}
                  className={styles.btn}
                >
                  Matches
                </button>
              </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
